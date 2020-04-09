import React from "react";
import Peer from "simple-peer";

function gotMedia(stream) {
  var peer1 = new Peer({ initiator: true, stream: stream });
  var peer2 = new Peer();

  peer1.on("signal", (data) => {
    console.log("data", data);
    peer2.signal(data);
  });

  peer2.on("signal", (data) => {
    peer1.signal(data);
  });

  peer2.on("stream", (stream) => {
    var videoNode = document.querySelector("video");
    if ("srcObject" in videoNode) {
      videoNode.srcObject = stream;
    } else {
      videoNode.src = window.URL.createObjectURL(stream);
    }
    videoNode.play();
  });
}

class Rtc extends React.Component {
  state = {
    errMsg: null,
  };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(gotMedia)
      .catch(() => {});
  }

  render() {
    return <video />;
  }
}

export default Rtc;
