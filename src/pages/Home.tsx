import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";
import { Link } from "react-router-dom";
import { Wish, Message, Milestone, getItemsByBucket } from "../lib/storage";
import { useBucket } from "../hooks/useBucket";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Countdown } from "../components/ui/Countdown";

const LOVE_DAY = new Date("2025-10-21T00:00:00");

const featureHighlights = [
  {
    title: "Wish List",
    blurb: "Plan surprises, track gifting status, and sprinkle reactions.",
    to: "/wishes",
    accent: "from-[#ff9a9e] to-[#fad0c4]",
  },
  {
    title: "Messages",
    blurb: "Time-locked notes + voice whispers for future you.",
    to: "/messages",
    accent: "from-[#f6d365] to-[#fda085]",
  },
  {
    title: "Milestones",
    blurb: "Countdowns, confetti, and celebratory rituals.",
    to: "/milestones",
    accent: "from-[#84fab0] to-[#8fd3f4]",
  },
  {
    title: "Reasons",
    blurb: "Browse the reasons you make my heart race.",
    to: "/reasons",
    accent: "from-[#fbc2eb] to-[#a6c1ee]",
  },
  {
    title: "Gallery",
    blurb: "Flip through our cutest portraits and snapshots.",
    to: "/zalia",
    accent: "from-[#fddb92] to-[#d1fdff]",
  },
  {
    title: "Her Cravings",
    blurb: "All the cheeses, boba, and little cravings she loves.",
    to: "/likes",
    accent: "from-[#cfd9df] to-[#e2ebf0]",
  },
];

const foreverPromise = {
  title: "Marry",
  description:
    "Stay together through every up and down, holding hands through every sunrise.",
  note: "No matter the storms, we choose us. Always.",
};

type LoveDuration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const padTime = (value: number) => value.toString().padStart(2, "0");

const calculateLoveDuration = (): LoveDuration => {
  const diffMs = Date.now() - LOVE_DAY.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, sunshine";
  if (hour < 18) return "Good afternoon, daydreamer";
  if (hour < 22) return "Good evening, stargazer";
  return "Past-your-bedtime cuddles";
}

export function Home() {
  const [bucketId] = useBucket();
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const [loveDuration, setLoveDuration] = useState<LoveDuration>(() =>
    calculateLoveDuration()
  );
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const handleReplayLoveGate = () => {
    localStorage.removeItem("acknowledged");
    window.location.reload();
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoveDuration(calculateLoveDuration());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!bucketId) return;
    setWishes(getItemsByBucket<Wish>("wishes", bucketId));
    setMessages(getItemsByBucket<Message>("messages", bucketId));
    setMilestones(getItemsByBucket<Milestone>("milestones", bucketId));
  }, [bucketId]);

  const unlockedMessages = useMemo(
    () =>
      messages.filter((message) => {
        if (!message.unlockAt) return true;
        return new Date(message.unlockAt).getTime() <= Date.now();
      }),
    [messages]
  );
  const loveNoteCount = unlockedMessages.length || 1;

  const nextMilestone = useMemo(() => {
    if (!milestones.length) return null;
    const future = milestones
      .map((m) => ({ ...m, dateValue: new Date(m.date).getTime() }))
      .filter((m) => m.dateValue >= Date.now())
      .sort((a, b) => a.dateValue - b.dateValue);
    return future[0] ?? null;
  }, [milestones]);

  const featuredWish = [...wishes].sort((a, b) => a.priority - b.priority)[0];

  const applyHeroTilt = (clientX: number, clientY: number) => {
    if (prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 12;
    setHeroTilt({ x, y });
  };

  const handleHeroMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    applyHeroTilt(event.clientX, event.clientY);
  };

  const handleHeroTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!event.touches[0]) return;
    applyHeroTilt(event.touches[0].clientX, event.touches[0].clientY);
  };

  const resetHeroTilt = () => setHeroTilt({ x: 0, y: 0 });

  const loveEnergy = Math.min(100, wishes.length * 8 + 20);

  return (
    <div className="relative z-10 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <section
        ref={heroRef}
        className="glass-panel relative overflow-hidden rounded-[36px] border-white/15 bg-white/10 p-6 text-white shadow-2xl sm:p-10"
        style={{
          transform: `rotateX(${-heroTilt.y}deg) rotateY(${heroTilt.x}deg)`,
          transition: prefersReducedMotion ? "none" : "transform 400ms ease",
        }}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={resetHeroTilt}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={resetHeroTilt}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7)_0%,_transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="pill w-max text-xs text-white/70">{getGreeting()}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Hi Zalia, welcome back to our{" "}
            <span className="handwritten text-5xl text-secondary">
              love garden
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            This is a private constellation of memories, letters, and little
            quests just for us.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-widest text-white/70">
                Since 21 Oct 2025
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {loveDuration.days} days
              </p>
              <p className="mt-1 text-sm text-white/70">
                {padTime(loveDuration.hours)}h:{padTime(loveDuration.minutes)}m:
                {padTime(loveDuration.seconds)}s
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-widest text-white/70">
                Surprises plotted
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {wishes.length}
              </p>
              <p className="mt-1 text-sm text-white/70">
                active wishes in queue
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-inner">
              <p className="text-xs uppercase tracking-widest text-white/70">
                Love notes waiting
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {loveNoteCount}
              </p>
              <p className="mt-1 text-sm text-white/70">
                ready to read any time
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReplayLoveGate}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
          >
            Replay the LoveGate entrance
            <span aria-hidden="true">↺</span>
          </button>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-lg">
              <div className="flex items-center justify-between text-white">
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">
                  Love energy
                </p>
                <span className="handwritten text-xl text-secondary">
                  {loveEnergy}%
                </span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                  style={{ width: `${loveEnergy}%` }}
                />
              </div>
              <p className="mt-4 text-sm text-white/70">
                The more wishes or milestones we add (plus every note we
                whisper), the brighter this bar glows.
              </p>
            </div>

            {nextMilestone ? (
              <div className="flex-1 rounded-3xl bg-gradient-to-br from-primary/80 to-secondary/80 p-6 text-white shadow-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                  Next milestone
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  {nextMilestone.title}
                </h3>
                <p className="text-sm text-white/80">
                  {new Date(nextMilestone.date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="mt-4 rounded-2xl bg-white/20 p-4 text-center font-semibold">
                  <Countdown date={nextMilestone.date} />
                </div>
                <Link
                  to="/milestones"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
                >
                  Celebrate plan →
                </Link>
              </div>
            ) : (
              <div className="flex-1 rounded-3xl border border-dashed border-white/30 p-6 text-white/70">
                <p className="text-base font-semibold">No countdowns yet.</p>
                <p className="mt-2 text-sm">
                  Add one inside Milestones to trigger confetti here.
                </p>
                <Link
                  to="/milestones"
                  className="mt-6 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
                >
                  Create a milestone
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                Promise board
              </p>
              <h2 className="text-2xl font-semibold">
                Tonight&apos;s spotlight
              </h2>
            </div>
            <Link to="/wishes" className="text-sm font-semibold text-secondary">
              View all →
            </Link>
          </div>
          <div className="mt-6 rounded-3xl border border-secondary/30 bg-secondary/10 p-6 shadow-inner">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Our vow
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-white">
              {foreverPromise.title}
            </h3>
            <p className="mt-2 text-white/80">{foreverPromise.description}</p>
            <p className="mt-4 text-sm text-white/70">{foreverPromise.note}</p>
          </div>
          {featuredWish && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                Next surprise
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {featuredWish.title}
              </h3>
              {featuredWish.description && (
                <p className="mt-2 text-white/80">{featuredWish.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                <span className="rounded-full bg-white/20 px-3 py-1 capitalize shadow-sm">
                  {featuredWish.status}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1">
                  Priority {featuredWish.priority}
                </span>
                {featuredWish.price && (
                  <span className="rounded-full bg-white/20 px-3 py-1">
                    Est.{" "}
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "USD",
                    }).format(featuredWish.price)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Love note
          </p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 shadow-inner">
            <p className="text-lg italic text-white/90">
              “No flowers would be as pretty as the flower that is reading this,
              I love you Zalia.”
            </p>
            <p className="mt-4 text-sm font-semibold text-secondary/90">
              — Harif
            </p>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-white/40">
            You are loved, always.
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Explore next
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featureHighlights.map((feature) => (
              <Link
                key={feature.to}
                to={feature.to}
                className={`rounded-3xl bg-gradient-to-br ${feature.accent} p-4 text-slate-900 shadow-lg transition hover:-translate-y-1`}
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-800">{feature.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
