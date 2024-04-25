import { useRef } from "react";

let localStream;

const App = () => {
  const localVidRef = useRef(null);
  const remoteVidRef = useRef(null);

  const titleRef = useRef(null);

  const handleCallStart = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localVidRef.current.srcObject = localStream;
  };

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
