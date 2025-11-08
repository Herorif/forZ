import { useMemo, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";
import { HeartField } from "../components/animations/HeartField";
import { CityScene } from "../components/animations/CityScene";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface LoveGateProps {
  onAcknowledge: () => void;
}

const pleaMessages = [
  "Please say yes",
  "I baked digital cookies for you!",
  "Pretty please with boba on top?",
  "Tap the pink one!",
];

export function LoveGate({ onAcknowledge }: LoveGateProps) {
  const [stage, setStage] = useState<"question" | "journey">("question");
  const [noButtonStyle, setNoButtonStyle] = useState({
    left: "55%",
    top: "60%",
  });
  const [pleaIndex, setPleaIndex] = useState(0);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const loveFacts = useMemo(
    () => [
      { label: "Days crushing on you", value: "∞" },
      { label: "Reasons to love you", value: "∞" },
      { label: "Denied requests", value: "0 allowed" },
    ],
    []
  );

  const scatterNoButton = () => {
    setPleaIndex((prev) => (prev + 1) % pleaMessages.length);
    setNoButtonStyle({
      left: `${20 + Math.random() * 60}%`,
      top: `${35 + Math.random() * 45}%`,
    });
  };

  const handlePointerMove = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const point = "touches" in event ? event.touches[0] : event;
    const x = ((point.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((point.clientY - rect.top) / rect.height - 0.5) * 20;
    setCardTilt({ x, y });
  };

  const resetTilt = () => setCardTilt({ x: 0, y: 0 });

  if (stage === "journey") {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <CityScene />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Will you take on a life journey with me together?
          </h1>
          <button
            onClick={onAcknowledge}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-primary px-12 py-4 text-lg font-semibold text-white shadow-2xl shadow-primary/40 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Yes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell flex items-center justify-center px-4 py-12 sm:px-6">
      <div className="absolute inset-0">
        <div className="aurora-layer" />
        <HeartField density={36} className="opacity-80" />
        <div className="sparkle-overlay" />
      </div>

      <div
        className="relative z-10 w-full max-w-3xl perspective-[1800px]"
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        onTouchMove={handlePointerMove}
        onTouchEnd={resetTilt}
      >
        <div
          ref={cardRef}
          className="glass-panel rounded-[32px] border border-white/20 bg-gradient-to-bl from-white/15 to-white/5 p-8 text-center shadow-2xl"
          style={{
            transform: `rotateX(${-cardTilt.y}deg) rotateY(${cardTilt.x}deg)`,
            transition: prefersReducedMotion ? "none" : "transform 300ms ease",
          }}
        >
          <p className="pill mx-auto w-max text-xs text-text/70">
            Secret Entrance
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-text md:text-5xl">
            Do you know how much{" "}
            <span className="handwritten text-5xl text-primary">
              I love you?
            </span>
          </h1>
          <p className="mt-4 text-base text-text/80">
            Answer me this, Will you
            be mine forever?
          </p>

          <p className="mt-6 text-lg text-text">
            Your answer is :
            <span className="font-semibold text-primary"></span>
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {loveFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl bg-white/15 p-4 shadow-inner"
              >
                <p className="text-xs uppercase tracking-widest text-text/50">
                  {fact.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-text">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-10 flex flex-col items-center">
            <div className="handwritten text-2xl text-primary/90">
              {pleaMessages[pleaIndex]}
            </div>
            <div className="relative mt-6 flex w-full min-h-[180px] flex-col items-center gap-4 sm:min-h-[120px] sm:flex-row sm:justify-center sm:gap-6">
              <button
                onClick={() => setStage("journey")}
                className="relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/40 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                YES
                <span
                  className="absolute -right-3 -top-3 inline-flex h-6 w-6 animate-ping bg-white/60"
                  aria-hidden="true"
                />
              </button>
              <button
                onMouseEnter={scatterNoButton}
                onMouseMove={scatterNoButton}
                onClick={scatterNoButton}
                onFocus={scatterNoButton}
                style={{
                  position: "absolute",
                  left: noButtonStyle.left,
                  top: noButtonStyle.top,
                  transform: "translate(-50%, -50%)",
                }}
                className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 shadow-sm backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Um... maybe no?
              </button>
            </div>
            <p className="mt-16 text-xs uppercase tracking-[0.6em] text-text/40">
              Spoiler: saying no is impossible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
