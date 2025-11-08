const reasons = [
  "I love your sharp soft eyes",
  "I love your cute smile",
  "I love your pixie's nose",
  "I love your pretty lips",
  "I love your loud excited laugh",
  "I love your soft giggles",
  "I love your sweetness",
  "I love the way you call me sayang",
  "I love the way you're excited about food",
  "I love the way you want to talk and talk when we call",
  "I love the way you care for me",
  "I love your big hugs",
  "I love your kisses",
  "I love your soft cuddles",
  "I love your warmth",
  "I love your name",
  "I love your adorable voice",
  "I love your flowery scent",
  "I love your caring hands",
  "I love your style",
  "I love your clinginess",
  "I love your compliments",
  "I love your manja with me",
  "I love your honesty",
  "I love you leaning on me",
  "I love the way you tell me everything",
  "I love the way you look at me",
  "I love the way you trust me",
  "I love your happy self",
  "I love your soft and vulnerable heart",
  "I love your insecurities that make you human",
  "I love your flaws that you think are ugly but are actually beautiful",
  "I love the way you make me feel special",
  "I love the way you ignore my flaws and love me anyway",
  "I love the way you ignore others for me",
  "I love you calling me at night just to hear my voice",
  "I love you wanting to be shushed to sleep",
  "I love you wanting to fall asleep in my arms",
  "I love the way you look when you wake up",
  "I love the way you call me baby",
  "I love the way you say I love you",
  "I love the way you motivate me to be better",
  "I love the way you comfort me when I'm down",
  "I love being with you",
  "I love making memories with you",
  "I love dreaming about our future together",
  "I love planning our trips together",
  "I love the way you try to not make me upset",
  "I love the way you push me to be my best self",
  "I love your smarts",
  "I love your humor",
  "I love your loving nature",
  "I love when you talk to me about your day",
  "I love when you share your thoughts with me",
  "I love when you ask for my opinion",
  "I love when you tell me where you hurt",
  "I love when you let me take care of you",
  "I love when are excited about the flowers I give you",
  "I love when you took alot of pictures of that flower bouquet I gave you",
  "I love the way you appreciate the little things I do for you",
  "I love the way you become soft around me",
  "I love the way you love your cat",
  "I love the way you take care of kiki",
  "I love the way you take care of comot",
  "I love the way you take care of oren",
  "I love when you share your screen with me",
  "I love when you suddenly sing a song when you're happy",
  "I love when you do your make up for me",
  "I love when you feel youre pretty",
  "I love when you ask me random questions",
  "I love when you get excited about our future",
  "I love when you plan our future together",
  "I love when you send me cute voice notes",
  "I love when you call me out of the blue",
  "I love when you text me good morning",
  "I love when you tell me about the shows you're watching",
  "I love the way you say thank you",
  "I love your random baby you tau tak",
  "I love that you are my girlfriend",
  "I love that you are my best friend",
  "I love that you are my confidant",
  "I love that you are my everything",
  "I love you for being you",
  "I love you for loving me",
  "I love you for choosing me",
  "I love you for staying with me",
  "I love you for being my rock",
  "I love you for being my safe place",
  "I love you for being my home",
  "I love you unconditionally",
  "I love you more than words can express",
  "I love you more than anything in this world",
  "I love you to the moon and back",
  "I love you forever and always",
  "I love you with all my heart",
  "I love you more each day",
  "I love you for all that you are",
  "I love you for all that you do",
  "I love you for all that you will be",
  "I love you simply because I do",
  "I love you Raja Zalia Nisha binti Raja Khairulnizam",
  "I love you more than life itself",
  "I love planning candlelight dinners by the river with you",
  "I love the way your excitement lights up whole cities",
  "I love that your brave heart keeps choosing us",
  'I love how you whisper "let\'s build a life" in between laughs',
  "I love that our playlists already sound like wedding vows",
  "I love dreaming about the family we'll raise someday",
  "I love how you make forever feel gentle",
  "I love that every today with you is my favorite day",
  "I really do",
];

const sectionMeta = [
  {
    title: "",
    emoji: "",
    colors: ["rgba(255, 173, 214, 0.25)", "rgba(255, 226, 191, 0.35)"],
  },
  {
    title: "",
    emoji: "",
    colors: ["rgba(205, 214, 255, 0.25)", "rgba(186, 230, 253, 0.35)"],
  },
  {
    title: "",
    emoji: "",
    colors: ["rgba(255, 230, 169, 0.25)", "rgba(255, 194, 203, 0.35)"],
  },
  {
    title: "",
    emoji: "",
    colors: ["rgba(199, 210, 254, 0.25)", "rgba(196, 181, 253, 0.35)"],
  },
];

const sectionSize = Math.ceil(reasons.length / sectionMeta.length);

const reasonSections = sectionMeta
  .map((meta, index) => {
    const start = index * sectionSize;
    return {
      ...meta,
      offset: start,
      items: reasons.slice(start, start + sectionSize),
    };
  })
  .filter((section) => section.items.length > 0);

export function Reasons() {
  return (
    <div className="relative z-10 px-4 py-10 text-text sm:px-6 lg:px-12">
      <section className="glass-panel rounded-[32px] border border-white/20 bg-white/5 p-6 shadow-2xl lg:p-10">
        <p className="pill mx-auto w-max text-xs text-text/70">
          handwritten reminders
        </p>
        <h1 className="mt-4 text-center text-4xl font-semibold leading-tight sm:text-5xl">
          Reasons I Fall For You Again, Every Day
        </h1>
        <p className="mt-4 text-center text-base text-text/80">
          A living list of why you&apos;re my entire heart.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-text/50">
              Reasons logged
            </p>
            <p className="mt-2 text-3xl font-semibold">{reasons.length}</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-text/50">
              Times said today
            </p>
            <p className="mt-2 text-3xl font-semibold">∞</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-text/50">
              Reasons left
            </p>
            <p className="mt-2 text-3xl font-semibold">Endless</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {reasonSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[28px] border border-white/15 p-6 shadow-xl"
              style={{
                backgroundImage: `linear-gradient(135deg, ${section.colors[0]}, ${section.colors[1]})`,
              }}
            >
              <div className="flex items-center gap-3 text-lg font-semibold text-text">
                <span className="text-2xl" aria-hidden="true">
                  {section.emoji}
                </span>
                {section.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-text/80">
                {section.items.map((reason, idx) => (
                  <li
                    key={`${section.title}-${idx}`}
                    className="flex gap-3 rounded-2xl bg-white/15 px-4 py-2"
                  >
                    <span className="font-semibold text-primary">
                      {section.offset + idx + 1}
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
