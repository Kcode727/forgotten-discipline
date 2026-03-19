import { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useParams, useNavigate } from 'react-router-dom';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

function calculateAngle(
  a: poseDetection.Keypoint,
  b: poseDetection.Keypoint,
  c: poseDetection.Keypoint
) {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * (180.0 / Math.PI));
  if (angle > 180.0) angle = 360 - angle;
  return angle;
}

const CONNECTIONS: [string, string][] = [
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
];

export default function Practice() {
  const { pose } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const [model, setModel] = useState<poseDetection.PoseDetector | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('Stand in frame to begin.');
  const [holdTime, setHoldTime] = useState(0);
  const [isPerfect, setIsPerfect] = useState(false);

  // Read mode live from localStorage every frame so Settings changes take effect instantly
  const getMode = () => localStorage.getItem('mode') || 'fresher';

  const synthRef = useRef(window.speechSynthesis);
  const lastSpokenRef = useRef<number>(0);
  const perfectStartRef = useRef<number | null>(null);

  // ── Model Loading ──────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      await tf.ready();
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
      );
      setModel(detector);
      setLoading(false);
    })();
  }, []);

  // ── Voice ──────────────────────────────────────────────────────────
  const speak = useCallback((text: string, force = false) => {
    const now = Date.now();
    const cooldown = getMode() === 'fresher' ? 3000 : 5000;
    if (!force && now - lastSpokenRef.current < cooldown) return;

    // Cancel and restart avoids the "speaking" guard from starving us
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes('Google') || v.lang.startsWith('en')
    );
    if (preferred) utterance.voice = preferred;
    utterance.rate = 0.9;
    utterance.pitch = 0.95;
    synthRef.current.speak(utterance);
    lastSpokenRef.current = now;
  }, []);

  // ── Pose Analysis ──────────────────────────────────────────────────
  const analyzePose = useCallback(
    (poseData: poseDetection.Pose) => {
      if (!poseData.keypoints) return;

      const kp: Record<string, poseDetection.Keypoint> = {};
      for (const point of poseData.keypoints) {
        if (point.name && point.score && point.score > 0.25) {
          kp[point.name] = point;
        }
      }

      // If ankles/shoulders not visible → step back
      if (
        !kp.left_ankle ||
        !kp.right_ankle ||
        !kp.left_shoulder ||
        !kp.right_shoulder
      ) {
        const msg = 'Step back so I can see your full body.';
        setFeedback(msg);
        speak(msg);
        setIsPerfect(false);
        perfectStartRef.current = null;
        return;
      }

      let msg = '';

      // --- General checks (all poses) ---
      if (kp.left_shoulder && kp.right_shoulder) {
        const diff = Math.abs(kp.left_shoulder.y - kp.right_shoulder.y);
        if (diff > 25) {
          msg =
            kp.left_shoulder.y > kp.right_shoulder.y
              ? 'Drop your right shoulder.'
              : 'Drop your left shoulder.';
        }
      }

      if (!msg && kp.left_shoulder && kp.left_hip) {
        const xDiff = Math.abs(kp.left_shoulder.x - kp.left_hip.x);
        if (xDiff > 40) {
          msg = 'Straighten your spine.';
        }
      }

      // --- Pose-specific checks ---
      if (pose === 'warrior-ii') {
        if (
          kp.left_shoulder &&
          kp.left_elbow &&
          kp.left_wrist &&
          kp.right_shoulder &&
          kp.right_elbow &&
          kp.right_wrist
        ) {
          const la = calculateAngle(kp.left_shoulder, kp.left_elbow, kp.left_wrist);
          const ra = calculateAngle(kp.right_shoulder, kp.right_elbow, kp.right_wrist);
          if (la < 160 || ra < 160) {
            msg = 'Keep both arms straight, parallel to the floor.';
          } else if (Math.abs(kp.left_wrist.y - kp.left_shoulder.y) > 45) {
            msg = 'Raise your left arm to shoulder level.';
          } else if (Math.abs(kp.right_wrist.y - kp.right_shoulder.y) > 45) {
            msg = 'Raise your right arm to shoulder level.';
          }
        }
        if (!msg && kp.left_knee && kp.left_hip && kp.left_ankle) {
          const knee = calculateAngle(kp.left_hip, kp.left_knee, kp.left_ankle);
          if (knee > 110) msg = 'Bend your front knee to ninety degrees.';
        }
      } else if (pose === 'tree-pose') {
        if (
          kp.left_knee &&
          kp.left_hip &&
          kp.left_ankle &&
          kp.right_knee &&
          kp.right_hip &&
          kp.right_ankle
        ) {
          const leftUp = kp.left_knee.y < kp.right_knee.y - 60;
          const rightUp = kp.right_knee.y < kp.left_knee.y - 60;
          if (!leftUp && !rightUp) {
            msg = 'Lift one foot and place it on your inner thigh.';
          } else if (Math.abs(kp.left_hip.x - kp.right_hip.x) > 55) {
            msg = 'Square your hips. Avoid leaning to the side.';
          }
        }
        if (!msg && kp.left_shoulder && kp.left_elbow && kp.left_wrist) {
          const armAngle = calculateAngle(kp.left_shoulder, kp.left_elbow, kp.left_wrist);
          if (armAngle < 150) msg = 'Raise your arms and press palms together above your head.';
        }
      } else if (pose === 'downward-dog') {
        if (kp.left_shoulder && kp.left_hip && kp.left_knee) {
          const back = calculateAngle(kp.left_shoulder, kp.left_hip, kp.left_knee);
          if (back < 150) msg = 'Straighten your back. Push hips toward the ceiling.';
        }
        if (!msg && kp.left_hip && kp.left_knee && kp.left_ankle) {
          const leg = calculateAngle(kp.left_hip, kp.left_knee, kp.left_ankle);
          if (leg < 160) msg = 'Try to straighten your legs and press heels down.';
        }
      }

      if (!msg) {
        // Perfect!
        if (!perfectStartRef.current) perfectStartRef.current = Date.now();
        const held = Math.floor((Date.now() - perfectStartRef.current) / 1000);
        setHoldTime(held);
        setIsPerfect(true);

        const perfectMsg =
          held < 3
            ? 'Perfect. Hold it.'
            : held < 10
            ? `Good. Hold for ${10 - held} more seconds.`
            : 'Excellent hold. Keep breathing steadily.';
        setFeedback(perfectMsg);

        if (held === 3) speak('Perfect alignment. Hold it.', true);
        if (held === 10) speak('Excellent. Keep breathing steadily.', true);
        if (held === 30) speak('Remarkable discipline. You may rest.', true);
      } else {
        perfectStartRef.current = null;
        setIsPerfect(false);
        setFeedback(msg);

        const mode = getMode();
        if (mode === 'practitioner') {
          speak(msg);
        } else if (mode === 'fresher') {
          speak(`Adjust. ${msg}`);
        } else if (mode === 'healing') {
          speak(`Gently, ${msg.toLowerCase()}`);
        }
      }
    },
    [speak, pose]
  );

  // ── Skeleton Drawing ───────────────────────────────────────────────
  const drawSkeleton = useCallback(
    (poseData: poseDetection.Pose, ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      // Mirror transform to match webcam mirror
      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);

      const kpMap: Record<string, poseDetection.Keypoint> = {};
      poseData.keypoints.forEach((k) => {
        if (k.name && k.score && k.score > 0.25) kpMap[k.name] = k;
      });

      // Draw connections first (behind dots)
      ctx.lineCap = 'round';
      ctx.lineWidth = 4;
      CONNECTIONS.forEach(([p1, p2]) => {
        const a = kpMap[p1];
        const b = kpMap[p2];
        if (!a || !b) return;

        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        if (isPerfect) {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.9)');
          gradient.addColorStop(1, 'rgba(52, 211, 153, 0.9)');
        } else {
          gradient.addColorStop(0, 'rgba(45, 212, 191, 0.85)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.85)');
        }
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Draw keypoint dots
      poseData.keypoints.forEach((keypoint) => {
        if (!keypoint.score || keypoint.score <= 0.25) return;
        const { x, y } = keypoint;

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = isPerfect
          ? 'rgba(16, 185, 129, 0.2)'
          : 'rgba(45, 212, 191, 0.2)';
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = isPerfect ? '#10b981' : '#2dd4bf';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.restore();
    },
    [isPerfect]
  );

  // ── Detection Loop ─────────────────────────────────────────────────
  const detect = useCallback(async () => {
    const webcam = webcamRef.current;
    const canvas = canvasRef.current;
    if (!webcam || !canvas || !model) {
      animFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    const video = webcam.video;
    if (!video || video.readyState !== 4) {
      animFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    canvas.width = vw;
    canvas.height = vh;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    try {
      const poses = await model.estimatePoses(video);
      if (poses.length > 0) {
        analyzePose(poses[0]);
        drawSkeleton(poses[0], ctx, vw, vh);
      } else {
        ctx.clearRect(0, 0, vw, vh);
        setFeedback('I cannot see you. Make sure the camera has a clear view.');
      }
    } catch (err) {
      console.error('Detection error:', err);
    }

    animFrameRef.current = requestAnimationFrame(detect);
  }, [model, analyzePose, drawSkeleton]);

  useEffect(() => {
    if (!loading) {
      animFrameRef.current = requestAnimationFrame(detect);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [loading, detect]);

  // ── End Session ────────────────────────────────────────────────────
  const endSession = async () => {
    synthRef.current.cancel();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    try {
      await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: localStorage.getItem('user') || 'Demo User',
          poseId: pose || 'Free Practice',
          durationSeconds: holdTime,
          accuracyScore: isPerfect ? 95 : 70,
          mode: getMode(),
        }),
      });
    } catch (e) {
      console.error(e);
    }
    navigate('/sessions');
  };

  // ── Pose Selector ─────────────────────────────────────────────────
  if (!pose) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-serif font-light text-neutral-900 dark:text-white mb-4">
          Select Practice
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-10 font-light">
          Mode: <span className="capitalize text-brand-600 dark:text-brand-400 font-medium">{getMode()}</span>
          {' · '}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate('/settings')}
          >
            Change in Settings
          </span>
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Warrior II', slug: 'warrior-ii', hint: 'Arms extended, legs wide.' },
            { name: 'Tree Pose', slug: 'tree-pose', hint: 'One-legged balance, arms raised.' },
            { name: 'Downward Dog', slug: 'downward-dog', hint: 'Inverted V — hips high.' },
          ].map((p) => (
            <div
              key={p.slug}
              onClick={() => navigate(`/practice/${p.slug}`)}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                {p.name}
              </h3>
              <p className="text-neutral-500 font-light text-sm mb-6">{p.hint}</p>
              <div className="w-full text-center py-3 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-medium rounded-xl group-hover:bg-brand-500 group-hover:text-white transition-colors">
                Start Practice
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Active Practice ────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-neutral-950 text-white relative">
      {/* Top Bar */}
      <div className="absolute top-0 w-full z-20 flex justify-between items-center p-6 bg-gradient-to-b from-black/70 to-transparent">
        <div>
          <h2 className="text-2xl font-serif font-light capitalize">
            {pose.replace(/-/g, ' ')}
          </h2>
          <p className="text-white/60 font-light text-sm">
            Mode:{' '}
            <span className="capitalize text-brand-300 font-medium">
              {getMode()}
            </span>
          </p>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="text-center px-6 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-0.5">Hold</p>
            <p className="font-mono text-xl">{holdTime}s</p>
          </div>
          <button
            onClick={endSession}
            className="px-6 py-3 bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white rounded-xl transition-colors font-medium backdrop-blur-md"
          >
            End Session
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-16 h-16 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
          <p className="text-lg font-light animate-pulse text-white/80">
            Awakening Bodhi…
          </p>
        </div>
      ) : (
        <div className="flex-1 relative overflow-hidden bg-neutral-900 flex items-center justify-center">
          {/* Video feed */}
          <Webcam
            ref={webcamRef}
            mirrored={true}
            className="absolute inset-0 w-full h-full object-cover"
            videoConstraints={{ facingMode: 'user' }}
          />
          {/* Skeleton canvas — NOT CSS-mirrored; we mirror in draw code */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Feedback Overlay */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-10">
            <div
              className={`backdrop-blur-xl rounded-3xl p-6 md:p-8 text-center transition-all duration-500 shadow-2xl border
                ${
                  isPerfect
                    ? 'bg-emerald-900/70 border-emerald-500/40 text-emerald-50 scale-105'
                    : 'bg-black/70 border-white/10 text-white'
                }`}
            >
              <p className="text-2xl md:text-3xl font-serif font-light tracking-wide leading-snug">
                {feedback}
              </p>
              {isPerfect && (
                <p className="mt-2 text-sm text-emerald-300 tracking-widest uppercase font-medium">
                  ✦ Bodhi alignment
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
