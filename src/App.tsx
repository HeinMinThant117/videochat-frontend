import { useEffect, useRef } from "react";

let localStream: MediaStream;
let pc: RTCPeerConnection;

const signalling = new BroadcastChannel("webrtc");

const App = () => {
  // const [signalling, setSignalling] = useState<BroadcastChannel | null>(null);

  const localVidRef = useRef(null);
  const remoteVidRef = useRef(null);

  const titleRef = useRef(null);

  useEffect(() => {
    const listenSignalling = (e) => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }

      switch (e.data.type) {
        case "offer":
          console.log("Offer this is.");
          handleOffer(e.data);
          break;
        case "answer":
          handleAnswer(e.data);
          break;
        case "candidate":
          handleCandidate(e.data);
          break;
        case "ready":
          if (pc) {
            console.log(pc);
            console.log("already in call, ignoring");
            return;
          }
          makeCall();
          break;
        case "bye":
          break;
        default:
          console.log("unhandled", e);
          break;
      }
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

    localVidRef.current.srcObject = localStream;

    signalling?.postMessage({ type: "ready" });
  };

  function createPeerConnection() {
    pc = new RTCPeerConnection();
    pc.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        candidate: null,
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      signalling?.postMessage(message);
    };

    pc.ontrack = (e) => {
      console.log(e);
      remoteVidRef.current.srcObject = e.streams[0];
    };
    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  }

  async function makeCall() {
    createPeerConnection();

    const offer = await pc.createOffer();
    console.log("Offer : ", offer);
    signalling?.postMessage({ type: "mog" });
    signalling?.postMessage({ type: "offer", sdp: offer.sdp });
    await pc.setLocalDescription(offer);
  }

  async function handleOffer(offer) {
    if (pc) {
      console.error("existing peer connection");
      return;
    }

    createPeerConnection();
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    signalling?.postMessage({ type: "answer", sdp: answer.sdp });
    await pc.setLocalDescription(answer);
  }

  async function handleAnswer(answer) {
    if (!pc) {
      console.error("no peer connection");
      return;
    }

    await pc.setRemoteDescription(answer);
  }

  async function handleCandidate(candidate) {
    if (!pc) {
      console.error("no peer connection");
      return;
    }

    if (!candidate.candidate) {
      await pc.addIceCandidate(null);
    } else {
      await pc.addIceCandidate(candidate);
    }
  }

  return (
    <div>
      <h1 ref={titleRef} className="font-bold text-4xl my-6">
        This is a video chat app
      </h1>
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
          onClick={handleCallStart}
          className="border px-4 py-2 text-white bg-blue-500"
        >
          Start Call
        </button>
        <button className="border px-4 py-2 text-white bg-red-500">
          Hangup
        </button>
      </div>
    </div>
  );
};

export default App;
