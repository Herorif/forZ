const comfortCravings = [
  "Cheese everything (extra ooze please)",
  "Strawberries",
  "Oreo crumbs on soft-serve",
  "Llaollao swirls",
  "Dunkin donuts during cozy mornings",
  "Tealive Thai milk tea boba",
  "Mochi cream cheese (suka sangattt)",
  "Samyang cheese",
  "Sosej",
  "Chickeng chop",
  "Burnt cheesecake ",
  "Japanese cheesecake ",
  "Cheesekut ",
  "Tiramisu ",
  "Pisang goreng cheese ",
  "Seafood + salmon love",
  "Cheese tart",
  "Harif",
  "Chili's",
  "Corndogs",
  "Indonesian murtabak",
  "Chicken tenders",
  "Wingstop",
  "Ayam McD ",
  "Grapes ",
  "Ayam warna putih from Chicken Rice Shop",
  "Hershey’s Cookies & Cream bars",
  "Cream puff sangat sangat",
];

const toTrySoon = ["Mochi cheesecake"];

const gentleNos = [
  "Seaweed",
  "Churros",
  "Taugeh",
  "Green tea anything",
  "Crepes",
  "Telur",
];

const sections = [
  {
    title: "",
    emoji: "",
    items: comfortCravings.slice(0, 9),
    gradient: ["rgba(253, 219, 146, 0.45)", "rgba(209, 253, 255, 0.55)"],
  },
  {
    title: "",
    emoji: "",
    items: comfortCravings.slice(9, 18),
    gradient: ["rgba(251, 194, 235, 0.5)", "rgba(166, 193, 238, 0.55)"],
  },
  {
    title: "",
    emoji: "",
    items: comfortCravings.slice(18),
    gradient: ["rgba(207, 217, 223, 0.5)", "rgba(226, 235, 240, 0.55)"],
  },
];

export function Likes() {
  return (
    <div className="relative z-10 px-4 py-10 text-text sm:px-6 lg:px-10">
      <section className="glass-panel rounded-[32px] border border-white/20 bg-white/5 p-6 shadow-2xl lg:p-10">
        <p className="pill mx-auto w-max text-xs text-text/70">
          Her cravings map
        </p>
        <h1 className="mt-4 text-center text-4xl font-semibold leading-tight sm:text-5xl">
          Everything that makes her eyes sparkle.{" "}
          <span className="handwritten text-secondary">Take notes 💌</span>
        </h1>
        <p className="mt-4 text-center text-base text-text/80">
          The quickest path to her heart? A plate loaded with cheesy comfort,
          boba in the cup holder, and zero taugeh in sight.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[28px] border border-white/15 p-6 text-left shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${section.gradient[0]}, ${section.gradient[1]})`,
              }}
            >
              <div className="flex items-center gap-3 text-lg font-semibold text-text/90">
                <span className="text-2xl" aria-hidden="true">
                  {section.emoji}
                </span>
                {section.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-text/80">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2"
                  >
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/15 bg-white/5 p-6 shadow-lg">
            <div className="flex items-center gap-3 text-lg font-semibold text-text">
              <span className="text-2xl" aria-hidden="true">
                ✨
              </span>
              On the to-try list
            </div>
            <p className="mt-2 text-sm text-text/70">
              Surprise her with any of these and collect extra hugs.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {toTrySoon.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-secondary/60 px-4 py-2 text-sm font-semibold text-secondary/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/5 p-6 shadow-lg">
            <div className="flex items-center gap-3 text-lg font-semibold text-text">
              <span className="text-2xl" aria-hidden="true">
                🚫
              </span>
              Her no-nos
            </div>
            <p className="mt-2 text-sm text-text/70">
              Avoid these dia tak sukaaa.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {gentleNos.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-text/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
