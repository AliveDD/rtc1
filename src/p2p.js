import React, {
  useRef,
  useReducer,
  useState,
  useCallback,
  useEffect,
} from "react";
import Peer from "peerjs";

import "./styles.css";

const initialState = {
  names: {},
};

const myVideo = document.querySelector(".myVideo");

function reducer(state, action) {
  switch (action.type) {
    case "name update":
      return {
        ...state,
        names: { ...state.names, [action.payload.peerId]: action.payload.name },
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const peer = useRef(new Peer());
  const connections = useRef([]);

  const [myPeerId, setMyPeerId] = useState(null);
  const [connectTo, setConnectTo] = useState("");
  const [peers, setPeers] = useState([]);

  const connectedPeers = useCallback(
    () => connections.current.map(({ peer }) => peer).concat(myPeerId),
    [myPeerId]
  );

  const addToSwarm = useCallback((conn) => {
    connections.current.push(conn);
    setPeers(connections.current.map(({ peer }) => peer));
  }, []);

  const removeFromSwarm = useCallback((conn) => {
    connections.current.splice(
      connections.current.findIndex(({ peer }) => peer === conn.peer),
      1
    );
    setPeers(connections.current.map(({ peer }) => peer));
  }, []);

  const connect = useCallback(
    (peerId, handler) => {
      if (connectedPeers().includes(peerId)) {
        console.log(`Already connected to ${peerId}. Aborting.`);
        return;
      }

      const outgoingConnection = peer.current.connect(peerId, {
        metadata: { peers: connectedPeers() },
      });

      const onOpen = () => {
        handler(outgoingConnection);
        outgoingConnection.off("open", onOpen);
      };
      const onClose = () => {
        removeFromSwarm(outgoingConnection);
        outgoingConnection.off("close", onClose);
      };

      outgoingConnection.on("open", onOpen);
      outgoingConnection.on("close", onClose);
      outgoingConnection.on("error", (err) => console.error(err.message));
    },
    [connectedPeers, removeFromSwarm]
  );

  const broadcast = useCallback((msg) => {
    connections.current.map((conn) => conn.send(msg));
  }, []);

  const handleOutgoingConnection = useCallback(
    (conn) => {
      addToSwarm(conn);

      conn.on("data", (data) => {
        if (data) {
          if ("srcObject" in myVideo) {
            myVideo.srcObject = data;
          } else {
            myVideo.src = window.URL.createObjectURL(data);
          }
          myVideo.play();
        }

        if (data.type === "peer discovery") {
          data.payload.peers
            .filter((peerId) => !connectedPeers().includes(peerId))
            .map((peerId) => connect(peerId, handleOutgoingConnection));
        } else {
          dispatch(data);
        }
      });
    },
    [connectedPeers, addToSwarm, connect]
  );

  const handleIncomingConnection = useCallback(
    (conn) => {
      if (connectedPeers().includes(conn.peer)) {
        console.log(`Already connected to ${conn.peer}. Closing connection.`);
        return conn.close();
      }

      addToSwarm(conn);

      conn.on("data", (data) => {
        if (data.type !== "peer discovery") {
          dispatch(data);
        }
      });

      const newConnectionPeers = (conn.metadata || {}).peers || [];
      newConnectionPeers
        .filter((peerId) => !connectedPeers().includes(peerId))
        .map((peerId) => connect(peerId, handleOutgoingConnection));

      broadcast("try to start a stream");
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          console.log("stream", stream);
          broadcast(stream);
        })
        .catch(() => {});

      const myUniquePeers = connectedPeers().filter(
        (peerId) => !newConnectionPeers.includes(peerId) && peerId !== myPeerId
      );
      if (myUniquePeers.length > 0) {
        conn.send({
          type: "peer discovery",
          payload: { peers: myUniquePeers },
        });
      }
    },
    [
      connectedPeers,
      addToSwarm,
      broadcast,
      connect,
      handleOutgoingConnection,
      myPeerId,
    ]
  );

  const onIncoming = useCallback(
    (incomingConnection) => {
      const onOpen = () => {
        handleIncomingConnection(incomingConnection);
        incomingConnection.off("open", onOpen);
      };
      const onClose = () => {
        removeFromSwarm(incomingConnection);
        incomingConnection.off("close", onClose);
      };
      incomingConnection.on("open", onOpen);
      incomingConnection.on("close", onClose);
      incomingConnection.on("error", (err) => console.error(err.message));
    },
    [handleIncomingConnection, removeFromSwarm]
  );

  const init = useCallback(() => {
    peer.current.on("open", (id) => {
      setMyPeerId(id);
    });
    peer.current.on("connection", onIncoming);
  }, [onIncoming]);

  const cleanup = useCallback(() => {
    peer.current.off("open", setMyPeerId);
    peer.current.off("connection", onIncoming);
  }, [onIncoming]);

  useEffect(() => {
    init();
    return cleanup;
  }, [init, cleanup]);

  const handleConnectSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setConnectTo("");
      connect(connectTo, handleOutgoingConnection);
    },
    [connectTo, connect, handleOutgoingConnection]
  );

  const canSubmit =
    !!connectTo &&
    connectTo !== myPeerId &&
    !peers.find((peerId) => peerId === connectTo);

  if (!myPeerId) return null;

  return (
    <main>
      <form onSubmit={handleConnectSubmit}>
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          onChange={(e) => setConnectTo(e.target.value)}
          value={connectTo}
          id="connectTo"
          placeholder="Enter known peer id"
        />
        <button type="submit" disabled={!canSubmit}>
          {connectTo === myPeerId
            ? "That is your ID"
            : peers.find((peerId) => peerId === connectTo)
            ? "Already connected to that peer"
            : "Connect"}
        </button>
      </form>

      <h2>Your connections</h2>
      <ul>
        <li key={myPeerId}>{myPeerId} (you)</li>
        {peers.map((item, i) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
