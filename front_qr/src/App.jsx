import React, { useState, useEffect, useRef, useCallback } from "react";

/**
//  * Mock API Layer (Simulates src/api.js)
//  * Implements realistic network latency, return shapes, and optional simulated failures.
 */
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const MOCK_EVENTS = {
//   abc123: {
//     coupleNames: "Sarah & James",
//     date: "October 24, 2026",
//     venue: "The Grand Pavilion",
//   },
//   "wedding-2026": {
//     coupleNames: "Elena & Lucas",
//     date: "June 18, 2026",
//     venue: "Château de Bellevue",
//   },
//   demo: {
//     coupleNames: "Sophia & Alexander",
//     date: "September 12, 2026",
//     venue: "Villa Rose Gardens",
//   },
// };

// export async function validateEvent(eventId) {
//   await delay(800);
//   if (!eventId || (!MOCK_EVENTS[eventId] && eventId !== "valid-demo")) {
//     return {
//       valid: false,
//       message: "This QR code isn't valid or has expired.",
//     };
//   }

//   const details = MOCK_EVENTS[eventId] || {
//     coupleNames: "Sarah & James",
//     date: "October 24, 2026",
//     venue: "The Grand Meadow",
//   };

//   return {
//     valid: true,
//     event: { id: eventId, ...details },
//   };
// }
// mmmmm
// export async function uploadRecording(
//   eventId,
//   blob,
//   shouldSimulateError = false
// ) {
//   // Simulate progressive upload delay
//   await delay(1500);

//   if (shouldSimulateError) {
//     return {
//       success: false,
//       message: "Server connection timed out during upload.",
//     };
//   }

//   return {
//     success: true,
//     message: "Video sent successfully!",
//     id: `rec_${Math.random().toString(36).substr(2, 9)}`,
//   };
// }


// above is for the moc app

      const API_BASE_URL = "https://weddingcode-q3e5.onrender.com/api"; // change this later to your real deployed backend URL

      export async function validateEvent(eventId) {
        try {
          const response = await fetch(`${API_BASE_URL}/event/${eventId}`);
          const data = await response.json();

          if (!response.ok || !data.valid) {
            return {
              valid: false,
              message:
                data.message || "This QR code isn't valid or has expired.",
            };
          }

          return {
            valid: true,
            event: {
              id: eventId,
              coupleNames: data.coupleNames || "The Happy Couple",
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
              message: data.message || "Failed to upload recording.",
            };
          }

          return { success: true, message: data.message || "Video sent!" };
        } catch (err) {
          console.error("uploadRecording error:", err);
          return {
            success: false,
            message: "Network error during upload. Please try again.",
          };
        }
      }



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
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
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
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconPause = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
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
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
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
  // Application State Machine
  const [screen, setScreen] = useState(SCREEN.LOADING);
  const [eventId, setEventId] = useState("");
  const [eventData, setEventData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Recorder Configurations & Controls
  const [mode, setMode] = useState("video"); // 'video' | 'audio'
  const [facingMode, setFacingMode] = useState("user"); // 'user' | 'environment'
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [mimeType, setMimeType] = useState("");
  const [permissionError, setPermissionError] = useState(false);

  // Demo / Testing Controls Toggle
  const [simulateUploadError, setSimulateUploadError] = useState(false);
  const [showDemoTools, setShowDemoTools] = useState(false);

  // Playback Review State
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // Hardware Media References
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const chunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // DOM Elements
  const liveVideoRef = useRef(null);
  const reviewVideoRef = useRef(null);
  const reviewAudioRef = useRef(null);
  const waveformCanvasRef = useRef(null);

  useEffect(() => {
    // 1. Read event parameter from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    let eventParam = urlParams.get("event");

    // Fallback default if no param provided in browser preview context
    if (!eventParam) {
      eventParam = "wedding-2026";
    }

    setEventId(eventParam);
    checkEventValidity(eventParam);
  }, []);

  const checkEventValidity = async (id) => {
    setScreen(SCREEN.LOADING);
    setErrorMessage("");

    try {
      const response = await validateEvent(id);
      if (response.valid) {
        setEventData(response.event);
        setScreen(SCREEN.CAMERA_RECORDING);
      } else {
        setErrorMessage(response.message || "This wedding QR code is invalid.");
        setScreen(SCREEN.INVALID_EVENT);
      }
    } catch (err) {
      setErrorMessage("Could not connect to validate event code.");
      setScreen(SCREEN.INVALID_EVENT);
    }
  };

  const stopMediaTracks = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  const initMediaStream = useCallback(async () => {
    stopMediaTracks();
    setPermissionError(false);
    setScreen(SCREEN.PERMISSION_REQUEST);

    const isAudioOnly = mode === "audio";
    const constraints = {
      audio: { echoCancellation: true, noiseSuppression: true },
      video: isAudioOnly
        ? false
        : {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;

      setScreen(SCREEN.CAMERA_RECORDING);

      if (!isAudioOnly && liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        liveVideoRef.current.play().catch(() => {});
      }

      // Initialize audio analyzer for visualizer (works for both audio and video modes)
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyserRef.current = analyser;
          drawWaveform();
        }
      } catch (e) {
        console.warn("Web Audio visualizer unavailable", e);
      }
    } catch (err) {
      console.error("Camera/Mic access error:", err);
      setPermissionError(true);
      setScreen(SCREEN.CAMERA_RECORDING);
    }
  }, [mode, facingMode, stopMediaTracks]);

  // Trigger stream re-initialization on camera/mode changes
  useEffect(() => {
    if (
      screen === SCREEN.CAMERA_RECORDING ||
      screen === SCREEN.PERMISSION_REQUEST
    ) {
      initMediaStream();
    }
    return () => {
      stopMediaTracks();
    };
  }, [mode, facingMode]);

  const drawWaveform = () => {
    if (!waveformCanvasRef.current || !analyserRef.current) return;
    const canvas = waveformCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        // Luxury gold/blush warm gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, "#D4AF37"); // Champagne Gold
        gradient.addColorStop(1, "#F43F5E"); // Rose Tint

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    render();
  };

  const startRecording = () => {
    if (!mediaStreamRef.current) return;

    chunksRef.current = [];
    const isAudioOnly = mode === "audio";

    // Determine suitable supported MIME type
    let preferredMime = isAudioOnly ? "audio/webm" : "video/webm";
    if (!MediaRecorder.isTypeSupported(preferredMime)) {
      if (isAudioOnly) {
        preferredMime = MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      } else {
        preferredMime = MediaRecorder.isTypeSupported("video/mp4")
          ? "video/mp4"
          : "";
      }
    }

    try {
      const options = preferredMime ? { mimeType: preferredMime } : undefined;
      const mediaRecorder = new MediaRecorder(mediaStreamRef.current, options);
      mediaRecorderRef.current = mediaRecorder;
      setMimeType(mediaRecorder.mimeType || preferredMime);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type:
            mediaRecorder.mimeType ||
            (isAudioOnly ? "audio/webm" : "video/webm"),
        });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setRecordedUrl(url);

        // Transition away from live stream & stop hardware lights
        stopMediaTracks();
        setScreen(SCREEN.REVIEW);
      };

      mediaRecorder.start(200); // Collect chunk every 200ms
      setIsRecording(true);
      setElapsedSeconds(0);

      // Start 60-second limit timer
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= MAX_RECORDING_SECONDS - 1) {
            stopRecording();
            return MAX_RECORDING_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (e) {
      console.error("Failed to start MediaRecorder", e);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const togglePlayback = () => {
    const el =
      mode === "audio" ? reviewAudioRef.current : reviewVideoRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const el =
      mode === "audio" ? reviewAudioRef.current : reviewVideoRef.current;
    if (el && el.duration) {
      setPlaybackProgress((el.currentTime / el.duration) * 100);
    }
  };

  const handleRetry = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedBlob(null);
    setRecordedUrl(null);
    setElapsedSeconds(0);
    setPlaybackProgress(0);
    setIsPlaying(true);
    initMediaStream();
  };

  const handleDismiss = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedBlob(null);
    setRecordedUrl(null);
    stopMediaTracks();
    setScreen(SCREEN.SUCCESS); // Clear neutral state or completion
  };

  const handleSend = async () => {
    if (!recordedBlob) return;
    setScreen(SCREEN.SENDING);

    try {
      const response = await uploadRecording(
        eventId,
        recordedBlob,
        simulateUploadError
      );
      if (response.success) {
        setScreen(SCREEN.SUCCESS);
      } else {
        setErrorMessage(response.message || "Failed to upload recording.");
        setScreen(SCREEN.ERROR);
      }
    } catch (err) {
      setErrorMessage(
        "Network loss during upload. Please check your signal and retry."
      );
      setScreen(SCREEN.ERROR);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (screen === SCREEN.LOADING) {
    return (
      <div className="min-h-screen bg-neutral-900 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-amber-200/20 border-t-amber-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-amber-300">
            <IconRing className="w-8 h-8 animate-pulse" />
          </div>
        </div>
        <h2 className="font-serif text-2xl tracking-wide text-amber-100 mb-2">
          Sarah & James
        </h2>
        <p className="text-stone-400 text-sm font-light tracking-wide">
          Validating your invitation link...
        </p>
      </div>
    );
  }

  if (screen === SCREEN.INVALID_EVENT) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-950/40 border border-rose-800/40 flex items-center justify-center mb-6 text-rose-400">
          <IconAlert className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl text-amber-100 mb-3">
          Invitation Not Found
        </h1>
        <p className="text-stone-300 text-base max-w-xs mb-8 leading-relaxed font-light">
          {errorMessage ||
            "This QR code isn't valid or has expired. Please verify with the wedding hosts."}
        </p>

        {/* Quick test buttons for interactive previewing */}
        <div className="space-y-3 w-full max-w-xs">
          <button
            onClick={() => checkEventValidity("wedding-2026")}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-amber-50 font-medium text-sm tracking-wider uppercase shadow-lg hover:from-amber-500 hover:to-amber-600 transition"
          >
            Load Demo Wedding QR
          </button>
        </div>
      </div>
    );
  }

  if (screen === SCREEN.SENDING) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <IconSend className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        <h2 className="font-serif text-2xl text-amber-100 mb-2">
          Sending your message...
        </h2>
        <p className="text-stone-400 text-sm font-light mb-8">
          Delivering your wedding wish to the happy couple
        </p>

        <div className="w-64 bg-stone-800 h-1.5 rounded-full overflow-hidden mb-2 border border-stone-700">
          <div className="bg-gradient-to-r from-amber-400 to-rose-400 h-full w-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (screen === SCREEN.SUCCESS) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-between p-6 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs tracking-wider uppercase">
            <span>💍</span> {eventData?.coupleNames || "Sarah & James"}
          </div>
        </div>

        <div className="flex flex-col items-center my-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 mb-6 shadow-xl shadow-rose-950/50">
            <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-amber-300">
              <IconHeart className="w-12 h-12 text-rose-400 animate-pulse" />
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-3 tracking-wide">
            Message Sent!
          </h1>
          <p className="text-stone-300 text-base max-w-xs font-light leading-relaxed mb-2">
            Thank you for leaving your heartfelt message for{" "}
            {eventData?.coupleNames || "the newlyweds"}.
          </p>
          <span className="text-xs text-amber-200/60 tracking-widest uppercase">
            Saved to the guestbook 💌
          </span>
        </div>

        <div className="w-full max-w-xs pb-6 space-y-4">
          <button
            onClick={() => {
              setRecordedBlob(null);
              setRecordedUrl(null);
              setScreen(SCREEN.CAMERA_RECORDING);
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-stone-950 font-semibold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition"
          >
            Record Another Message
          </button>
        </div>
      </div>
    );
  }

  if (screen === SCREEN.ERROR) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-950/60 border border-rose-500/40 flex items-center justify-center mb-6 text-rose-400 shadow-lg">
          <IconAlert className="w-10 h-10" />
        </div>

        <h2 className="font-serif text-2xl text-amber-100 mb-2">
          Upload Failed
        </h2>
        <p className="text-stone-300 text-sm font-light max-w-xs mb-8 leading-relaxed">
          {errorMessage ||
            "Something went wrong sending your message. Don't worry, your recording is safe!"}
        </p>

        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={handleSend}
            className="w-full py-4 rounded-full bg-amber-500 text-stone-950 font-semibold text-sm tracking-wider uppercase shadow-lg hover:bg-amber-400 active:scale-95 transition"
          >
            Try Again
          </button>
          <button
            onClick={handleRetry}
            className="w-full py-3.5 rounded-full border border-stone-700 text-stone-300 font-medium text-sm tracking-wider uppercase hover:bg-stone-900 active:scale-95 transition"
          >
            Discard & Re-record
          </button>
        </div>
      </div>
    );
  }

  if (screen === SCREEN.REVIEW) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between relative overflow-hidden">
        {/* Top Header */}
        <div className="z-20 p-4 pt-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-amber-200">
            <span>💍</span>
            <span className="font-serif font-medium">
              {eventData?.coupleNames || "Sarah & James"}
            </span>
          </div>
          <span className="text-xs uppercase tracking-widest text-stone-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
            Review {mode === "audio" ? "Voice" : "Video"}
          </span>
        </div>

        {/* Media Preview Area */}
        <div className="relative flex-1 flex items-center justify-center p-4">
          {mode === "video" ? (
            <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl flex items-center justify-center">
              <video
                ref={reviewVideoRef}
                src={recordedUrl}
                playsInline
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
                onClick={togglePlayback}
              />
              {!isPlaying && (
                <button
                  onClick={togglePlayback}
                  className="absolute w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center pl-1 shadow-2xl"
                >
                  <IconPlay className="w-8 h-8" />
                </button>
              )}
            </div>
          ) : (
            <div className="w-full max-w-sm p-8 rounded-3xl bg-stone-900/90 border border-amber-500/20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
              <audio
                ref={reviewAudioRef}
                src={recordedUrl}
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-400/30 flex items-center justify-center mb-6 text-amber-300">
                <IconMic className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl text-amber-100 mb-1">
                Audio Recording
              </h3>
              <p className="text-xs text-stone-400 mb-6 tracking-wide">
                Ready to send to the couple
              </p>

              <button
                onClick={togglePlayback}
                className="w-14 h-14 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg hover:bg-amber-400 active:scale-95 transition mb-6"
              >
                {isPlaying ? (
                  <IconPause className="w-6 h-6" />
                ) : (
                  <IconPlay className="w-6 h-6 pl-0.5" />
                )}
              </button>

              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden border border-stone-700">
                <div
                  className="bg-amber-400 h-full transition-all duration-100"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="z-20 p-6 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {/* Retry Button */}
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-full border border-stone-700 bg-stone-900/80 text-stone-200 text-sm font-medium hover:bg-stone-800 active:scale-95 transition"
            >
              <IconRetry className="w-4 h-4 text-amber-400" />
              <span>Retry</span>
            </button>

            {/* Send Button (Primary Action) */}
            <button
              onClick={handleSend}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-stone-950 font-semibold text-sm tracking-wide shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-95 transition"
            >
              <IconSend className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="text-stone-400 hover:text-stone-200 text-xs font-light tracking-wider py-1 uppercase"
          >
            No thanks, discard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Floating Demo Testing Panel (Top-Right Badge) */}
      <div className="fixed top-3 right-3 z-50">
        <button
          onClick={() => setShowDemoTools(!showDemoTools)}
          className="px-2.5 py-1 rounded-full bg-stone-900/90 border border-stone-700 text-[10px] text-amber-300 backdrop-blur-md shadow-lg"
        >
          ⚙️ Demo Controls
        </button>

        {showDemoTools && (
          <div className="mt-2 p-3 rounded-2xl bg-stone-900/95 border border-stone-700 text-xs w-56 text-stone-300 shadow-2xl backdrop-blur-xl space-y-2">
            <div className="font-semibold text-amber-200 border-b border-stone-800 pb-1">
              Tester Controls
            </div>
            <label className="flex items-center justify-between gap-2 cursor-pointer pt-1">
              <span>Simulate Upload Failure</span>
              <input
                type="checkbox"
                checked={simulateUploadError}
                onChange={(e) => setSimulateUploadError(e.target.checked)}
                className="rounded accent-amber-500"
              />
            </label>
            <button
              onClick={() => checkEventValidity("invalid_code_xyz")}
              className="w-full text-left py-1 text-rose-400 hover:text-rose-300"
            >
              Test Invalid Event Screen
            </button>
          </div>
        )}
      </div>

      {/* Header Overlay */}
      <div className="z-20 p-4 pt-6 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-amber-100">
          <span>💍</span>
          <span className="font-serif tracking-wide">
            {eventData?.coupleNames || "Sarah & James"}
          </span>
        </div>

        {/* Mode Switcher Pill */}
        {!isRecording && (
          <div className="flex bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button
              onClick={() => setMode("video")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                mode === "video"
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <IconVideo className="w-3.5 h-3.5" />
              <span>Video</span>
            </button>
            <button
              onClick={() => setMode("audio")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition ${
                mode === "audio"
                  ? "bg-amber-500 text-stone-950 font-semibold"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <IconMic className="w-3.5 h-3.5" />
              <span>Audio</span>
            </button>
          </div>
        )}

        {/* Elapsed Timer when recording */}
        {isRecording && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-mono font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{formatTime(elapsedSeconds)} / 1:00</span>
          </div>
        )}
      </div>

      {/* Live Viewport Area */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-stone-950">
        {/* Permission Requesting Overlay */}
        {screen === SCREEN.PERMISSION_REQUEST && (
          <div className="z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin mb-4" />
            <h3 className="font-serif text-xl text-amber-100 mb-1">
              Requesting Access
            </h3>
            <p className="text-xs text-stone-400 max-w-xs">
              Please allow camera and microphone permissions in your browser
              when prompted.
            </p>
          </div>
        )}

        {/* Permission Error Screen */}
        {permissionError && (
          <div className="z-30 flex flex-col items-center justify-center p-6 text-center max-w-xs">
            <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-700/50 text-rose-400 flex items-center justify-center mb-4">
              <IconAlert className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">
              Camera Access Required
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed mb-6">
              Camera/microphone access is needed to record a message for the
              couple. Please allow access in your browser settings and tap
              retry.
            </p>
            <button
              onClick={initMediaStream}
              className="px-6 py-3 rounded-full bg-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase"
            >
              Try Granting Access
            </button>
          </div>
        )}

        {/* Video Mode Preview */}
        {mode === "video" && !permissionError && (
          <video
            ref={liveVideoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
        )}

        {/* Audio Mode Screen or Overlay Waveform */}
        {mode === "audio" && !permissionError && (
          <div className="flex flex-col items-center justify-center p-6 text-center w-full max-w-sm">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-400/30 flex items-center justify-center mb-8 shadow-2xl relative">
              {isRecording && (
                <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping" />
              )}
              <IconMic className="w-12 h-12 text-amber-300" />
            </div>
            <h2 className="font-serif text-2xl text-amber-100 mb-1">
              Audio Message
            </h2>
            <p className="text-xs text-stone-400 tracking-wide mb-8">
              {isRecording
                ? "Recording your message..."
                : "Tap the button below to start speaking"}
            </p>

            {/* Live Waveform Canvas */}
            <canvas
              ref={waveformCanvasRef}
              width={260}
              height={60}
              className="w-full max-w-[260px] h-[60px] bg-stone-900/60 rounded-2xl border border-stone-800 backdrop-blur-md"
            />
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="z-20 p-6 pb-8 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between">
        {/* Rear/Front Camera Flip Button (Only enabled in video mode when not recording) */}
        {mode === "video" && !isRecording ? (
          <button
            onClick={() =>
              setFacingMode((prev) =>
                prev === "user" ? "environment" : "user"
              )
            }
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-amber-200 flex items-center justify-center hover:bg-black/70 active:scale-95 transition"
            title="Flip camera"
          >
            <IconFlip className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-12 h-12" />
        )}

        {/* Center Record Button with Progress Ring */}
        <div className="relative flex items-center justify-center">
          {/* Progress ring svg counting down to 60s */}
          <svg className="w-24 h-24 transform -rotate-90 pointer-events-none">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgba(255,255,255,0.15)"
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
              strokeDasharray={251.2}
              strokeDashoffset={
                251.2 - (251.2 * elapsedSeconds) / MAX_RECORDING_SECONDS
              }
              className="transition-all duration-100 ease-linear"
            />
          </svg>

          {/* Record Button trigger */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={permissionError || screen === SCREEN.PERMISSION_REQUEST}
            className={`absolute w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
              isRecording
                ? "bg-stone-900 border-2 border-amber-400 scale-95"
                : "bg-rose-600 border-4 border-white hover:bg-rose-500 active:scale-95"
            }`}
          >
            {isRecording ? (
              <div className="w-7 h-7 rounded-sm bg-rose-500 animate-pulse" />
            ) : (
              <div className="w-full h-full rounded-full bg-rose-600 border-2 border-amber-300/40" />
            )}
          </button>
        </div>

        {/* Placeholder spacer */}
        <div className="w-12 h-12" />
      </div>
    </div>
  );
}
