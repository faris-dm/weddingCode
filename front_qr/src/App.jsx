import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
| Keep your existing backend API behavior.
*/

const API_BASE_URL =
  "https://weddingcode-q3e5.onrender.com/api";

export async function validateEvent(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/event/${eventId}`);
    const data = await response.json();

    if (!response.ok || !data.valid) {
      return {
        valid: false,
        message:
          data.message ||
          "This QR code isn't valid or has expired.",
      };
    }

    return {
      valid: true,
      event: {
        id: eventId,
        coupleNames:
          data.coupleNames || "The Happy Couple",
        date: data.date || "",
        venue: data.venue || "",
      },
    };
  } catch (err) {
    console.error("validateEvent error:", err);

    return {
      valid: false,
      message:
        "Could not connect to the server. Please check your connection.",
    };
  }
}

export async function uploadRecording(eventId, blob) {
  try {
    const formData = new FormData();

    formData.append("eventId", eventId);
    formData.append("video", blob, "recording.webm");

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message:
          data.message || "Failed to upload recording.",
      };
    }

    return {
      success: true,
      message: data.message || "Video sent!",
    };
  } catch (err) {
    console.error("uploadRecording error:", err);

    return {
      success: false,
      message:
        "Network error during upload. Please try again.",
    };
  }
}

/*
|--------------------------------------------------------------------------
| Icons
|--------------------------------------------------------------------------
*/

const IconVideo = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const IconMic = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const IconFlip = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const IconPlay = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconPause = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const IconRetry = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const IconSend = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const IconHeart = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const IconAlert = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const IconClose = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const IconRing = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>
);

/*
|--------------------------------------------------------------------------
| Screen State
|--------------------------------------------------------------------------
*/

const SCREEN = {
  LOADING: "LOADING",
  INVALID_EVENT: "INVALID_EVENT",
  PERMISSION_REQUEST: "PERMISSION_REQUEST",
  CAMERA_RECORDING: "CAMERA_RECORDING",
  REVIEW: "REVIEW",
  SENDING: "SENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const MAX_RECORDING_SECONDS = 60;

export default function App() {
  /*
  |--------------------------------------------------------------------------
  | Application State
  |--------------------------------------------------------------------------
  */

  const [screen, setScreen] = useState(SCREEN.LOADING);

  const [eventId, setEventId] = useState("");
  const [eventData, setEventData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Recorder State
  |--------------------------------------------------------------------------
  */

  const [mode, setMode] = useState("video");

  const [facingMode, setFacingMode] =
    useState("user");

  const [isRecording, setIsRecording] =
    useState(false);

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  const [recordedBlob, setRecordedBlob] =
    useState(null);

  const [recordedUrl, setRecordedUrl] =
    useState(null);

  const [permissionError, setPermissionError] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Playback State
  |--------------------------------------------------------------------------
  */

  const [isPlaying, setIsPlaying] =
    useState(true);

  const [playbackProgress, setPlaybackProgress] =
    useState(0);

  /*
  |--------------------------------------------------------------------------
  | Refs
  |--------------------------------------------------------------------------
  */

  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  const chunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  const liveVideoRef = useRef(null);
  const reviewVideoRef = useRef(null);
  const reviewAudioRef = useRef(null);
  const waveformCanvasRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Read Event ID + Validate Event
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let eventParam =
      new URLSearchParams(
        window.location.search
      ).get("event");

    // Keep the development fallback.
    if (!eventParam) {
      eventParam = "wedding-2026";
    }

    setEventId(eventParam);

    checkEventValidity(eventParam);

    return () => {
      stopMediaTracks();
    };
  }, []);

  const checkEventValidity = async (id) => {
    setScreen(SCREEN.LOADING);
    setErrorMessage("");

    try {
      const response = await validateEvent(id);

      if (response.valid) {
        setEventData(response.event || null);

        /*
         * IMPORTANT:
         * Immediately request BOTH camera and microphone.
         *
         * We do this ONCE after event validation.
         * Switching Video <-> Audio later will NOT
         * request permission again.
         */
        await requestMediaAccess("video", facingMode);
      } else {
        setErrorMessage(
          response.message ||
            "This QR code isn't valid or has expired."
        );

        setScreen(SCREEN.INVALID_EVENT);
      }
    } catch (err) {
      console.error(err);

      setErrorMessage(
        "Could not connect to validate event code."
      );

      setScreen(SCREEN.INVALID_EVENT);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Stop Media
  |--------------------------------------------------------------------------
  */

  const stopMediaTracks = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      mediaStreamRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(
        animationFrameRef.current
      );

      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current
        .close()
        .catch(() => {});

      audioContextRef.current = null;
    }

    analyserRef.current = null;
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Request Camera + Microphone
  |--------------------------------------------------------------------------
  |
  | THIS IS THE IMPORTANT FIX.
  |
  | We always request BOTH camera and microphone
  | once.
  |
  | Changing the UI mode does NOT call getUserMedia.
  |
  */

  const requestMediaAccess = async (
    requestedFacingMode = "user"
  ) => {
    setPermissionError(false);
    setScreen(SCREEN.PERMISSION_REQUEST);

    /*
     * Always request both.
     *
     * This means the browser asks for camera + microphone
     * when the recorder opens.
     */
    const constraints = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },

      video: {
        facingMode: requestedFacingMode,
        width: {
          ideal: 1280,
        },
        height: {
          ideal: 720,
        },
      },
    };

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia(
          constraints
        );

      mediaStreamRef.current = stream;

      setScreen(SCREEN.CAMERA_RECORDING);

      /*
       * Attach video stream if video mode is visible.
       */
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject =
          stream;

        liveVideoRef.current
          .play()
          .catch(() => {});
      }

      initializeAudioVisualizer(stream);
    } catch (err) {
      console.error(
        "Camera/Mic access error:",
        err
      );

      setPermissionError(true);
      setScreen(SCREEN.CAMERA_RECORDING);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Audio Visualizer
  |--------------------------------------------------------------------------
  */

  const initializeAudioVisualizer = (
    stream
  ) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();

      audioContextRef.current = audioCtx;

      const source =
        audioCtx.createMediaStreamSource(
          stream
        );

      const analyser =
        audioCtx.createAnalyser();

      analyser.fftSize = 64;

      source.connect(analyser);

      analyserRef.current = analyser;

      drawWaveform();
    } catch (err) {
      console.warn(
        "Audio visualizer unavailable",
        err
      );
    }
  };

  const drawWaveform = () => {
    if (
      !waveformCanvasRef.current ||
      !analyserRef.current
    ) {
      return;
    }

    const canvas =
      waveformCanvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const analyser =
      analyserRef.current;

    const bufferLength =
      analyser.frequencyBinCount;

    const dataArray =
      new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current =
        requestAnimationFrame(render);

      analyser.getByteFrequencyData(
        dataArray
      );

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const barWidth =
        (canvas.width / bufferLength) * 1.5;

      let x = 0;

      for (
        let i = 0;
        i < bufferLength;
        i++
      ) {
        const barHeight =
          (dataArray[i] / 255) *
          canvas.height *
          0.8;

        const gradient =
          ctx.createLinearGradient(
            0,
            canvas.height,
            0,
            0
          );

        gradient.addColorStop(
          0,
          "#D4AF37"
        );

        gradient.addColorStop(
          1,
          "#F43F5E"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
          x,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        );

        x += barWidth;
      }
    };

    render();
  };

  /*
  |--------------------------------------------------------------------------
  | Change Mode
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | No getUserMedia here.
  |
  | No permission request here.
  |
  | No stream restart here.
  |
  */

  const changeMode = (newMode) => {
    if (isRecording) return;

    setMode(newMode);

    /*
     * Keep the existing camera + microphone stream.
     *
     * If audio mode:
     * camera stays available but is simply hidden.
     *
     * If video mode:
     * camera becomes visible again.
     */
    if (
      newMode === "video" &&
      mediaStreamRef.current &&
      liveVideoRef.current
    ) {
      liveVideoRef.current.srcObject =
        mediaStreamRef.current;

      liveVideoRef.current
        .play()
        .catch(() => {});
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Flip Camera
  |--------------------------------------------------------------------------
  */

  const flipCamera = async () => {
    if (isRecording) return;

    const nextFacingMode =
      facingMode === "user"
        ? "environment"
        : "user";

    setFacingMode(nextFacingMode);

    /*
     * Camera flip genuinely needs a new video
     * device stream, but we already have permission.
     *
     * Keep microphone enabled.
     */

    if (!mediaStreamRef.current) {
      await requestMediaAccess(
        nextFacingMode
      );

      return;
    }

    try {
      const oldVideoTracks =
        mediaStreamRef.current.getVideoTracks();

      oldVideoTracks.forEach((track) =>
        track.stop()
      );

      const newVideoStream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              facingMode: nextFacingMode,
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
            },
          }
        );

      const newVideoTrack =
        newVideoStream.getVideoTracks()[0];

      if (!newVideoTrack) return;

      const audioTracks =
        mediaStreamRef.current.getAudioTracks();

      const combinedStream =
        new MediaStream([
          ...audioTracks,
          newVideoTrack,
        ]);

      mediaStreamRef.current =
        combinedStream;

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject =
          combinedStream;

        liveVideoRef.current
          .play()
          .catch(() => {});
      }
    } catch (err) {
      console.error(
        "Unable to flip camera:",
        err
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Start Recording
  |--------------------------------------------------------------------------
  */

  const startRecording = () => {
    if (
      !mediaStreamRef.current ||
      permissionError
    ) {
      return;
    }

    chunksRef.current = [];

    const isAudioOnly =
      mode === "audio";

    let preferredMime = isAudioOnly
      ? "audio/webm"
      : "video/webm";

    if (
      !MediaRecorder.isTypeSupported(
        preferredMime
      )
    ) {
      if (isAudioOnly) {
        preferredMime =
          MediaRecorder.isTypeSupported(
            "audio/mp4"
          )
            ? "audio/mp4"
            : "";
      } else {
        preferredMime =
          MediaRecorder.isTypeSupported(
            "video/mp4"
          )
            ? "video/mp4"
            : "";
      }
    }

    try {
      const options = preferredMime
        ? {
            mimeType: preferredMime,
          }
        : undefined;

      /*
       * For audio mode, create a recorder
       * using only audio tracks.
       *
       * For video mode, use the full stream.
       */
      let recordingStream =
        mediaStreamRef.current;

      if (isAudioOnly) {
        recordingStream = new MediaStream(
          mediaStreamRef.current.getAudioTracks()
        );
      }

      const mediaRecorder =
        new MediaRecorder(
          recordingStream,
          options
        );

      mediaRecorderRef.current =
        mediaRecorder;

      mediaRecorder.ondataavailable =
        (event) => {
          if (
            event.data &&
            event.data.size > 0
          ) {
            chunksRef.current.push(
              event.data
            );
          }
        };

      mediaRecorder.onstop = () => {
        const blob = new Blob(
          chunksRef.current,
          {
            type:
              mediaRecorder.mimeType ||
              (isAudioOnly
                ? "audio/webm"
                : "video/webm"),
          }
        );

        const url =
          URL.createObjectURL(blob);

        setRecordedBlob(blob);
        setRecordedUrl(url);

        stopMediaTracks();

        setIsRecording(false);
        setScreen(SCREEN.REVIEW);
      };

      mediaRecorder.start(200);

      setIsRecording(true);
      setElapsedSeconds(0);

      timerIntervalRef.current =
        setInterval(() => {
          setElapsedSeconds((prev) => {
            if (
              prev >=
              MAX_RECORDING_SECONDS - 1
            ) {
              stopRecording();

              return MAX_RECORDING_SECONDS;
            }

            return prev + 1;
          });
        }, 1000);
    } catch (err) {
      console.error(
        "Failed to start MediaRecorder:",
        err
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Stop Recording
  |--------------------------------------------------------------------------
  */

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(
        timerIntervalRef.current
      );

      timerIntervalRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !==
        "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Playback
  |--------------------------------------------------------------------------
  */

  const togglePlayback = () => {
    const element =
      mode === "audio"
        ? reviewAudioRef.current
        : reviewVideoRef.current;

    if (!element) return;

    if (isPlaying) {
      element.pause();
      setIsPlaying(false);
    } else {
      element
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    const element =
      mode === "audio"
        ? reviewAudioRef.current
        : reviewVideoRef.current;

    if (
      element &&
      element.duration
    ) {
      setPlaybackProgress(
        (element.currentTime /
          element.duration) *
          100
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Retry
  |--------------------------------------------------------------------------
  */

  const handleRetry = async () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }

    setRecordedBlob(null);
    setRecordedUrl(null);
    setElapsedSeconds(0);
    setPlaybackProgress(0);
    setIsPlaying(true);

    /*
     * Request access again only if the stream
     * was completely stopped.
     *
     * This is a real retry, not a mode switch.
     */
    await requestMediaAccess(
      facingMode
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Dismiss
  |--------------------------------------------------------------------------
  */

  const handleDismiss = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }

    setRecordedBlob(null);
    setRecordedUrl(null);

    stopMediaTracks();

    setScreen(SCREEN.SUCCESS);
  };

  /*
  |--------------------------------------------------------------------------
  | Send
  |--------------------------------------------------------------------------
  */

  const handleSend = async () => {
    if (!recordedBlob) return;

    setScreen(SCREEN.SENDING);

    /*
     * Camera is no longer needed.
     */
    stopMediaTracks();

    try {
      const response =
        await uploadRecording(
          eventId,
          recordedBlob
        );

      if (response.success) {
        setScreen(SCREEN.SUCCESS);
      } else {
        setErrorMessage(
          response.message ||
            "Something went wrong sending your message."
        );

        setScreen(SCREEN.ERROR);
      }
    } catch (err) {
      setErrorMessage(
        "Something went wrong sending your message."
      );

      setScreen(SCREEN.ERROR);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Format Time
  |--------------------------------------------------------------------------
  */

  const formatTime = (seconds) => {
    const minutes = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (screen === SCREEN.LOADING) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-full border-2 border-amber-200/20 border-t-amber-400 animate-spin" />

          <div className="absolute inset-0 flex items-center justify-center text-amber-300">
            <IconRing className="w-7 h-7 animate-pulse" />
          </div>
        </div>

        <h1 className="font-serif text-2xl text-amber-100 mb-2">
          Preparing your message
        </h1>

        <p className="text-stone-400 text-sm">
          Checking your wedding invitation...
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | INVALID EVENT
  |--------------------------------------------------------------------------
  */

  if (
    screen === SCREEN.INVALID_EVENT
  ) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-950/40 border border-rose-800/40 flex items-center justify-center mb-6 text-rose-400">
          <IconAlert className="w-9 h-9" />
        </div>

        <h1 className="font-serif text-3xl text-amber-100 mb-3">
          Invitation Not Found
        </h1>

        <p className="text-stone-300 text-sm leading-relaxed max-w-xs">
          {errorMessage ||
            "This QR code isn't valid or has expired."}
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PERMISSION REQUEST
  |--------------------------------------------------------------------------
  */

  if (
    screen ===
    SCREEN.PERMISSION_REQUEST
  ) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-5" />

        <h2 className="font-serif text-2xl text-amber-100 mb-2">
          One moment
        </h2>

        <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
          Please allow camera and microphone
          access so you can leave a message.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SENDING
  |--------------------------------------------------------------------------
  */

  if (screen === SCREEN.SENDING) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative w-20 h-20 mb-7">
          <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" />

          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <IconSend className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        <h2 className="font-serif text-2xl text-amber-100 mb-2">
          Sending your message...
        </h2>

        <p className="text-stone-400 text-sm mb-7">
          Sending your wedding wish
        </p>

        <div className="w-52 h-1.5 bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-amber-400 to-rose-400 animate-pulse" />
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SUCCESS
  |--------------------------------------------------------------------------
  */

  if (screen === SCREEN.SUCCESS) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl" />

          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 mb-6">
            <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center">
              <IconHeart className="w-11 h-11 text-rose-400 animate-pulse" />
            </div>
          </div>

          <h1 className="font-serif text-3xl text-amber-100 mb-3">
            Message Sent!
          </h1>

          <p className="text-stone-300 text-base max-w-xs leading-relaxed">
            Thank you for leaving your heartfelt
            message for{" "}
            {eventData?.coupleNames ||
              "the newlyweds"}.
          </p>

          <button
            onClick={async () => {
              setRecordedBlob(null);
              setRecordedUrl(null);
              setElapsedSeconds(0);
              setPlaybackProgress(0);
              setIsPlaying(true);

              await requestMediaAccess(
                facingMode
              );
            }}
            className="mt-8 min-h-12 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-stone-950 font-semibold text-sm shadow-xl active:scale-95 transition"
          >
            Record Another Message
          </button>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UPLOAD ERROR
  |--------------------------------------------------------------------------
  */

  if (screen === SCREEN.ERROR) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-950/60 border border-rose-500/40 flex items-center justify-center mb-6 text-rose-400">
          <IconAlert className="w-9 h-9" />
        </div>

        <h2 className="font-serif text-2xl text-amber-100 mb-2">
          Something went wrong
        </h2>

        <p className="text-stone-300 text-sm max-w-xs leading-relaxed mb-7">
          {errorMessage ||
            "Something went wrong sending your message. Your recording is still safe."}
        </p>

        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={handleSend}
            className="w-full min-h-12 rounded-full bg-amber-500 text-stone-950 font-semibold text-sm shadow-lg active:scale-95 transition"
          >
            Try Again
          </button>

          <button
            onClick={handleRetry}
            className="w-full min-h-12 rounded-full border border-stone-700 text-stone-300 font-medium text-sm active:scale-95 transition"
          >
            Discard & Re-record
          </button>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | REVIEW
  |--------------------------------------------------------------------------
  */

  if (screen === SCREEN.REVIEW) {
    return (
      <main className="fixed inset-0 bg-stone-950 text-stone-100 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="relative z-20 shrink-0 px-4 pt-[max(16px,env(safe-area-inset-top))] pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex items-center gap-2">
              <span className="text-lg">
                💍
              </span>

              <span className="font-serif text-sm text-amber-100 truncate">
                {eventData?.coupleNames ||
                  "The Happy Couple"}
              </span>
            </div>

            <span className="shrink-0 text-[10px] uppercase tracking-widest text-stone-400">
              Review
            </span>
          </div>
        </header>

        {/* Media */}
        <section className="relative flex-1 min-h-0 flex items-center justify-center px-3">
          {mode === "video" ? (
            <div className="relative w-full h-full max-h-full overflow-hidden rounded-2xl bg-black">
              <video
                ref={reviewVideoRef}
                src={recordedUrl}
                playsInline
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() =>
                  setIsPlaying(false)
                }
                className="w-full h-full object-contain"
                onClick={togglePlayback}
              />

              {!isPlaying && (
                <button
                  onClick={togglePlayback}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center"
                >
                  <IconPlay className="w-8 h-8 ml-1" />
                </button>
              )}
            </div>
          ) : (
            <div className="w-full max-w-md rounded-3xl bg-stone-900/90 border border-amber-500/20 p-7 flex flex-col items-center text-center">
              <audio
                ref={reviewAudioRef}
                src={recordedUrl}
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() =>
                  setIsPlaying(false)
                }
                className="hidden"
              />

              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-400/30 flex items-center justify-center mb-5">
                <IconMic className="w-10 h-10 text-amber-300" />
              </div>

              <h3 className="font-serif text-xl text-amber-100 mb-1">
                Audio Message
              </h3>

              <p className="text-xs text-stone-400 mb-6">
                Your message is ready
              </p>

              <button
                onClick={togglePlayback}
                className="w-14 h-14 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg active:scale-95 transition mb-6"
              >
                {isPlaying ? (
                  <IconPause className="w-6 h-6" />
                ) : (
                  <IconPlay className="w-6 h-6 ml-1" />
                )}
              </button>

              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400"
                  style={{
                    width: `${playbackProgress}%`,
                  }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Actions */}
        <footer className="relative z-20 shrink-0 px-4 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <button
              onClick={handleRetry}
              className="min-h-12 rounded-full border border-stone-700 bg-stone-900 text-stone-200 text-sm font-medium flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <IconRetry className="w-4 h-4 text-amber-400" />
              Retry
            </button>

            <button
              onClick={handleSend}
              className="min-h-12 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-stone-950 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
            >
              <IconSend className="w-4 h-4" />
              Send
            </button>
          </div>

          <button
            onClick={handleDismiss}
            className="block mx-auto mt-3 py-2 px-4 text-stone-500 text-xs"
          >
            No thanks
          </button>
        </footer>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | CAMERA / RECORDING
  |--------------------------------------------------------------------------
  */

  return (
    <main className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-stone-950 text-stone-100 select-none">
      {/* Camera Background */}
      {mode === "video" &&
        !permissionError && (
          <video
            ref={liveVideoRef}
            playsInline
            muted
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

      {/* Dark overlay for readability */}
      {mode === "video" &&
        !permissionError && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70 pointer-events-none" />
        )}

      {/* Audio background */}
      {mode === "audio" &&
        !permissionError && (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-rose-950/30" />
        )}

      {/* Permission error */}
      {permissionError && (
        <div className="absolute inset-0 z-30 bg-stone-950 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-700/50 text-rose-400 flex items-center justify-center mb-5">
            <IconAlert className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl text-amber-100 mb-2">
            Camera & microphone needed
          </h2>

          <p className="text-stone-300 text-sm leading-relaxed max-w-xs mb-6">
            Please allow camera and microphone
            access in your browser settings,
            then try again.
          </p>

          <button
            onClick={() =>
              requestMediaAccess(
                facingMode
              )
            }
            className="min-h-12 px-6 py-3 rounded-full bg-amber-500 text-stone-950 font-semibold text-sm active:scale-95 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Top controls */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-3">
          {/* Wedding name */}
          <div className="min-w-0 max-w-[55%]">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                💍
              </span>

              <span className="font-serif text-sm text-amber-100 truncate">
                {eventData?.coupleNames ||
                  "The Happy Couple"}
              </span>
            </div>

            <p className="ml-7 text-[10px] text-white/65">
              Leave a message
            </p>
          </div>

          {/* Mode toggle */}
          {!isRecording && (
            <div className="flex shrink-0 bg-black/55 backdrop-blur-md p-1 rounded-full border border-white/10">
              <button
                onClick={() =>
                  changeMode("video")
                }
                className={`min-h-10 px-3 rounded-full flex items-center gap-1.5 text-xs transition ${
                  mode === "video"
                    ? "bg-amber-500 text-stone-950 font-semibold"
                    : "text-stone-300"
                }`}
              >
                <IconVideo className="w-4 h-4" />
                Video
              </button>

              <button
                onClick={() =>
                  changeMode("audio")
                }
                className={`min-h-10 px-3 rounded-full flex items-center gap-1.5 text-xs transition ${
                  mode === "audio"
                    ? "bg-amber-500 text-stone-950 font-semibold"
                    : "text-stone-300"
                }`}
              >
                <IconMic className="w-4 h-4" />
                Audio
              </button>
            </div>
          )}

          {/* Recording timer */}
          {isRecording && (
            <div className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-rose-400/40 text-rose-100 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />

              {formatTime(
                elapsedSeconds
              )}
              <span className="text-white/40">
                /
              </span>
              1:00
            </div>
          )}
        </div>
      </header>

      {/* Audio interface */}
      {mode === "audio" &&
        !permissionError && (
          <section className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-28">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-400/30 flex items-center justify-center mb-7">
              {isRecording && (
                <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping" />
              )}

              <IconMic className="w-12 h-12 text-amber-300" />
            </div>

            <h2 className="font-serif text-2xl text-amber-100 mb-2">
              Audio Message
            </h2>

            <p className="text-sm text-stone-400 text-center mb-6">
              {isRecording
                ? "Recording your message..."
                : "Tap the button to start speaking"}
            </p>

            <canvas
              ref={waveformCanvasRef}
              width={320}
              height={70}
              className="w-full max-w-[320px] h-[70px] rounded-2xl bg-black/20"
            />
          </section>
        )}

      {/* Camera flip */}
      {mode === "video" &&
        !isRecording &&
        !permissionError && (
          <button
            onClick={flipCamera}
            aria-label="Flip camera"
            className="absolute right-4 bottom-28 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-amber-200 flex items-center justify-center active:scale-95 transition"
          >
            <IconFlip className="w-5 h-5" />
          </button>
        )}

      {/* Bottom controls */}
      <footer className="absolute left-0 right-0 bottom-0 z-20 pb-[max(20px,env(safe-area-inset-bottom))] pt-12 px-6 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
        <div className="flex items-center justify-center">
          {/* Record button */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 96 96"
            >
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="4"
                fill="transparent"
              />

              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#D4AF37"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={
                  251.2 -
                  (251.2 *
                    elapsedSeconds) /
                    MAX_RECORDING_SECONDS
                }
                className="transition-all duration-100"
              />
            </svg>

            <button
              onClick={
                isRecording
                  ? stopRecording
                  : startRecording
              }
              disabled={
                permissionError ||
                screen ===
                  SCREEN.PERMISSION_REQUEST
              }
              aria-label={
                isRecording
                  ? "Stop recording"
                  : "Start recording"
              }
              className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-95 ${
                isRecording
                  ? "bg-stone-900 border-2 border-amber-400"
                  : "bg-rose-600 border-4 border-white"
              }`}
            >
              {isRecording ? (
                <div className="w-7 h-7 rounded-md bg-rose-500" />
              ) : (
                <div className="w-full h-full rounded-full bg-rose-600 border-2 border-amber-300/30" />
              )}
            </button>
          </div>
        </div>

        {!isRecording && (
          <p className="text-center text-white/55 text-[11px] mt-3">
            Up to 60 seconds
          </p>
        )}
      </footer>
    </main>
  );
}