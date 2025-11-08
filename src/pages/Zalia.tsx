import { useState } from "react";
import clsx from "clsx";
import { galleryMedia } from "../content/galleryMedia";

type Filter = "all" | "image" | "video";

export function Zalia() {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredMedia =
    filter === "all"
      ? galleryMedia
      : galleryMedia.filter((item) => item.type === filter);

  return (
    <div className="relative z-10 px-4 py-10 text-text sm:px-6 lg:px-10">
      <section className="glass-panel rounded-[32px] border border-white/20 bg-white/5 p-6 shadow-2xl lg:p-10">
        <p className="pill mx-auto w-max text-xs text-text/70">
          Our private gallery
        </p>
        <h1 className="mt-4 text-center text-4xl font-semibold leading-tight sm:text-5xl">
          Every angle of you is art.
        </h1>
        <p className="mt-4 text-center text-base text-text/80">
          Photos, reels, giggles from our shared stash so I never forget a
          single smile.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {(["all", "image", "video"] as Filter[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={clsx(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                filter === option
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                  : "border border-white/30 text-text/70 hover:border-white/60"
              )}
            >
              {option === "all"
                ? "Everything"
                : option === "image"
                ? "Photos"
                : "Videos"}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMedia.map((item) => (
            <figure
              key={item.src}
              className="group rounded-[24px] border border-white/15 bg-white/5 p-3 shadow-lg transition hover:-translate-y-1"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="h-64 w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                )}
              </div>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
