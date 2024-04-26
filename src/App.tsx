import { MutableRefObject, useEffect, useRef, useState } from "react";
import { socket } from "./socket";

let localStream: MediaStream | null = null;
let pc: RTCPeerConnection | null = null;

const signalling = new BroadcastChannel("webrtc");

const App = () => {
  const [startDisabled, setStartDisabled] = useState(false);
  const [hangupDisabled, setHangupDisabled] = useState(true);

  const localVidRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const remoteVidRef: MutableRefObject<HTMLVideoElement | null> = useRef(null);

  useEffect(() => {
    socket.on("offer", (e) => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }
      handleOffer(e);
    });

    socket.on("answer", (e) => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }
      handleAnswer(e);
    });

    socket.on("candidate", (e) => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }
      handleCandidate(e);
    });

    socket.on("ready", () => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }
      if (pc) {
        console.log(pc);
        console.log("already in call, ignoring");
        return;
      }
      makeCall();
    });

    socket.on("bye", () => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }
      if (pc) {
        hangup();
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("candidate");
      socket.off("ready");
      socket.off("bye");
    };
  }, []);

  useEffect(() => {
    const listenSignalling = () => {
      // if (!localStream) {
      //   console.log("not ready yet");
      //   return;
      // }
      // switch (e.data.type) {
      //   // case "offer":
      //   //   console.log("Offer this is.");
      //   //   handleOffer(e.data);
      //   //   break;
      //   case "answer":
      //     handleAnswer(e.data);
      //     break;
      //   case "candidate":
      //     handleCandidate(e.data);
      //     break;
      //   case "ready":
      //     if (pc) {
      //       console.log(pc);
      //       console.log("already in call, ignoring");
      //       return;
      //     }
      //     makeCall();
      //     break;
      //   case "bye":
      //     if (pc) {
      //       hangup();
      //     }
      //     break;
      //   default:
      //     console.log("unhandled", e);
      //     break;
      // }
    };

    signalling.addEventListener("message", listenSignalling);

    return () => {
      signalling.removeEventListener("message", listenSignalling);
    };
  }, []);

  const handleCallStart = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVidRef.current) {
      localVidRef.current.srcObject = localStream;
    }

    // signalling?.postMessage({ type: "ready" });
    socket.emit("ready");
    setStartDisabled(true);
    setHangupDisabled(false);
  };

  const handleHangup = async () => {
    hangup();
    // signalling.postMessage({ type: "bye" });
    socket.emit("bye");
  };

  async function hangup() {
    if (pc) {
      pc.close();
      pc = null;
    }
    localStream?.getTracks().forEach((track) => track.stop());
    localStream = null;

    setStartDisabled(false);
    setHangupDisabled(true);
  }

  function createPeerConnection(): RTCPeerConnection {
    pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      const message: {
        type: string;
        candidate: string | null;
        sdpMid: string | null;
        sdpMLineIndex: number | null;
      } = {
        type: "candidate",
        candidate: null,
        sdpMid: null,
        sdpMLineIndex: null,
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("candidate", message);
      // signalling?.postMessage(message);
    };

    pc.ontrack = (e) => {
      if (remoteVidRef.current) {
        remoteVidRef.current.srcObject = e.streams[0];
      }
    };

    localStream?.getTracks().forEach((track) => {
      if (localStream) {
        pc?.addTrack(track, localStream);
      }
    });

    return pc;
  }

  async function makeCall() {
    createPeerConnection();

    const offer = await pc?.createOffer();
    if (offer) {
      // signalling?.postMessage({ type: "offer", sdp: offer.sdp });
      socket.emit("offer", { type: "offer", sdp: offer.sdp });
      await pc?.setLocalDescription(offer);
    }
  }

  async function handleOffer(offer: RTCSessionDescriptionInit) {
    console.log(offer);
    if (pc) {
      console.error("existing peer connection");
      return;
    }

    pc = createPeerConnection();
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    // signalling?.postMessage({ type: "answer", sdp: answer.sdp });
    socket.emit("answer", { type: "answer", sdp: answer.sdp });
    await pc?.setLocalDescription(answer);
  }

  async function handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!pc) {
      console.error("no peer connection");
      return;
    }

    await pc.setRemoteDescription(answer);
  }

  async function handleCandidate(candidate: RTCIceCandidateInit | undefined) {
    if (!pc) {
      console.error("no peer connection");
      return;
    }

    if (!candidate?.candidate) {
      await pc.addIceCandidate(undefined);
    } else {
      await pc.addIceCandidate(candidate);
    }
  }

  return (
    <div>
      <h1 className="font-bold text-4xl my-6">This is a video chat app</h1>
      <div className="flex gap-x-4">
        <video
          autoPlay
          muted
          ref={localVidRef}
          className="w-[45%] border"
          src=""
        ></video>
        <video
          autoPlay
          muted
          ref={remoteVidRef}
          className="w-[45%] border"
          src=""
        ></video>
      </div>

      <div className="flex gap-x-2 mt-4 font-bold">
        <button
          disabled={startDisabled}
          onClick={handleCallStart}
          className={`border px-4 py-2 text-white bg-blue-500 ${startDisabled ? "opacity-50" : "opacity-100"}`}
        >
          Start Call
        </button>
        <button
          disabled={hangupDisabled}
          onClick={handleHangup}
          className={`border px-4 py-2 text-white bg-red-500 ${hangupDisabled ? "opacity-50" : "opacity-100"}`}
        >
          Hangup
        </button>
      </div>
    </div>
  );
};

export default App;
