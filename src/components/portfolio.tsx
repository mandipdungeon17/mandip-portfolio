"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Flag,
  Gauge,
  Github,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  Menu,
  Radio,
  Rocket,
  Sparkles,
  Star,
  Terminal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  experience,
  impact,
  profile,
  projects,
  recognition,
  skillGroups,
} from "@/lib/data";

type GitHubProfile = {
  public_repos: number;
};

type GitHubRepo = {
  name: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string;
};

type GitHubEvent = {
  type: string;
  created_at: string;
};

type GitHubSnapshot = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  events: GitHubEvent[];
  activityError: boolean;
};

const navigation = [
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "About", id: "about" },
];

const githubHeaders = {
  Accept: "application/vnd.github+json",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGitHubProfile(value: unknown): value is GitHubProfile {
  return isRecord(value) && typeof value.public_repos === "number";
}

function isGitHubRepo(value: unknown): value is GitHubRepo {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.stargazers_count === "number" &&
    (typeof value.language === "string" || value.language === null) &&
    typeof value.fork === "boolean" &&
    typeof value.pushed_at === "string"
  );
}

function isGitHubEvent(value: unknown): value is GitHubEvent {
  return (
    isRecord(value) &&
    typeof value.type === "string" &&
    typeof value.created_at === "string"
  );
}

function isGitHubRepoList(value: unknown): value is GitHubRepo[] {
  return Array.isArray(value) && value.every(isGitHubRepo);
}

function isGitHubEventList(value: unknown): value is GitHubEvent[] {
  return Array.isArray(value) && value.every(isGitHubEvent);
}

function useGitHubSnapshot() {
  const [snapshot, setSnapshot] = useState<GitHubSnapshot | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    const base = "https://api.github.com/users/mandipdungeon17";

    async function loadSnapshot() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(base, { headers: githubHeaders, signal: controller.signal }),
          fetch(`${base}/repos?per_page=100&sort=updated`, {
            headers: githubHeaders,
            signal: controller.signal,
          }),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub profile data is temporarily unavailable.");
        }

        const [profilePayload, reposPayload]: [unknown, unknown] =
          await Promise.all([profileResponse.json(), reposResponse.json()]);
        if (
          !isGitHubProfile(profilePayload) ||
          !isGitHubRepoList(reposPayload)
        ) {
          throw new Error("GitHub returned data in an unexpected format.");
        }

        let activityError = false;
        let events: GitHubEvent[] = [];
        try {
          const eventsResponse = await fetch(`${base}/events?per_page=100`, {
            headers: githubHeaders,
            signal: controller.signal,
          });
          const eventsPayload: unknown = eventsResponse.ok
            ? await eventsResponse.json()
            : null;
          if (!eventsResponse.ok || !isGitHubEventList(eventsPayload)) {
            activityError = true;
          } else {
            events = eventsPayload;
          }
        } catch {
          if (controller.signal.aborted) return;
          activityError = true;
        }

        setSnapshot({
          profile: profilePayload,
          repos: reposPayload,
          events,
          activityError,
        });
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    }

    void loadSnapshot();
    return () => controller.abort();
  }, []);

  return { snapshot, status };
}

function SectionHeading({
  eyebrow,
  title,
  description,
  number,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  number: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-index">
        <span>{number}</span>
        <span className="section-index-line" />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix,
  reduceMotion,
}: {
  value: number;
  suffix: string;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: reduceMotion ? 0 : 1.15,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count, isInView, reduceMotion, value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <motion.span aria-hidden="true">{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "loglens") {
    return (
      <div className="project-visual visual-loglens" aria-hidden="true">
        <div className="mock-window">
          <div className="mock-window-bar">
            <span />
            <span />
            <span />
            <small>loglens / service-router</small>
          </div>
          <div className="log-lines">
            <p><i>10:42:08</i><b className="log-green">INFO</b> route.loaded <em>warehouse-01</em></p>
            <p><i>10:42:09</i><b className="log-blue">DEBUG</b> cache.hit <em>location-map</em></p>
            <p><i>10:42:10</i><b className="log-green">INFO</b> request.complete <em>42ms</em></p>
            <p><i>10:42:11</i><b className="log-amber">WARN</b> retry.scheduled <em>inventory-sync</em></p>
          </div>
        </div>
        <span className="visual-orbit orbit-one" />
        <span className="visual-orbit orbit-two" />
      </div>
    );
  }

  if (kind === "equitycart") {
    return (
      <div className="project-visual visual-equity" aria-hidden="true">
        <div className="equity-card">
          <span className="equity-label">PORTFOLIO VALUE</span>
          <strong>₹ 12,480<span>.50</span></strong>
          <div className="equity-chart">
            <svg viewBox="0 0 360 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="equity-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b7f36b" stopOpacity=".3" />
                  <stop offset="100%" stopColor="#b7f36b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 85 C25 90 40 56 68 64 S103 77 127 48 S168 60 193 39 S225 54 249 25 S292 36 316 16 S344 24 360 5 V110 H0Z" fill="url(#equity-fill)" />
              <path d="M0 85 C25 90 40 56 68 64 S103 77 127 48 S168 60 193 39 S225 54 249 25 S292 36 316 16 S344 24 360 5" fill="none" stroke="#b7f36b" strokeWidth="2" />
            </svg>
          </div>
          <div className="equity-footer"><span>REWARDS, REIMAGINED</span><span>+8.24%</span></div>
        </div>
        <div className="equity-orbit">₹</div>
      </div>
    );
  }

  const labels: Record<string, string[]> = {
    cinema: ["MOOD", "DISCOVER", "WATCH"],
    scalper: ["SIGNAL", "ENTRY", "EXIT"],
    swiggy: ["BROWSE", "PICK", "ORDER"],
  };

  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <div className="mini-flow">
        {labels[kind]?.map((label, index) => (
          <div className="flow-step" key={label}>
            <span className="flow-node">{String(index + 1).padStart(2, "0")}</span>
            <span className="flow-label">{label}</span>
            {index < 2 ? <span className="flow-connector" /> : null}
          </div>
        ))}
      </div>
      <span className="visual-glow" />
    </div>
  );
}

function ActivityGrid({ events }: { events: GitHubEvent[] }) {
  const days = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - 83);
    start.setHours(0, 0, 0, 0);

    const counts = new Map<string, number>();
    for (const event of events) {
      const date = event.created_at.slice(0, 10);
      counts.set(date, (counts.get(date) ?? 0) + 1);
    }

    return Array.from({ length: 84 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = date.toISOString().slice(0, 10);
      return { date: key, count: counts.get(key) ?? 0 };
    });
  }, [events]);

  const max = Math.max(1, ...days.map((day) => day.count));

  return (
    <div
      className="activity-grid"
      role="img"
      aria-label="Recent public GitHub events over the last twelve weeks"
    >
      {days.map((day) => (
        <span
          key={day.date}
          className="activity-cell"
          data-level={day.count === 0 ? 0 : Math.min(4, Math.ceil((day.count / max) * 4))}
          title={`${day.count} public event${day.count === 1 ? "" : "s"} on ${day.date}`}
        />
      ))}
    </div>
  );
}

function ExperienceScene({ scene }: { scene: string }) {
  if (scene === "warehouse") {
    return (
      <div className="experience-scene warehouse-scene" aria-hidden="true">
        <span className="scene-label">WAREHOUSE SYSTEMS</span>
        <svg viewBox="0 0 300 210" fill="none">
          <path d="M22 179H277M56 49V179M132 49V179M208 49V179M258 49V179M56 49H258M56 105H258M56 156H258" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M69 68h25v28H69zM99 62h20v34H99zM145 73h22v23h-22zM173 64h21v32h-21zM219 70h25v26h-25zM70 119h28v29H70zM104 126h16v22h-16zM146 117h23v31h-23zM175 124h21v24h-21zM219 120h25v28h-25z" fill="currentColor" opacity=".17" />
          <path d="M70 68h24v28H70zM145 73h22v23h-22zM219 120h25v28h-25z" stroke="currentColor" strokeWidth="2" />
          <g className="warehouse-package">
            <path d="M42 169h28v-22H42z" fill="#ecaa6c" stroke="currentColor" strokeWidth="2" />
            <path d="M56 147v10" stroke="currentColor" strokeWidth="2" />
          </g>
          <path d="M27 183h240" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" className="conveyor-line" />
          <circle cx="53" cy="189" r="3" fill="currentColor" /><circle cx="244" cy="189" r="3" fill="currentColor" />
        </svg>
        <span className="scene-caption">STORAGE · ROUTING · PICKING</span>
      </div>
    );
  }

  return (
    <div className="experience-scene banking-scene" aria-hidden="true">
      <span className="scene-label">BANKING &amp; LENDING</span>
      <svg viewBox="0 0 300 210" fill="none">
        <path d="M68 79 150 34l82 45H68ZM78 88h144M70 165h160M58 177h184M90 95v62m30-62v62m60-62v62m30-62v62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="150" cy="67" r="11" stroke="currentColor" strokeWidth="2" />
        <path d="M147 62h7m-7 4h7m-6-4c6 0 6 8 0 8h-1l7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <g className="banking-flow">
          <circle cx="40" cy="117" r="13" fill="#fff" stroke="currentColor" strokeWidth="2" />
          <path d="M35 117h10m-3-4 4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path d="M20 117h48M232 117h48" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" />
        <circle cx="260" cy="117" r="13" fill="#fff" stroke="currentColor" strokeWidth="2" />
        <path d="m254 117 4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="scene-caption">APIS · TRANSACTIONS · CUSTOMER CARE</span>
    </div>
  );
}

const awardIcons = {
  medal: Medal,
  star: Star,
  gauge: Gauge,
  heart: Heart,
  terminal: Terminal,
  rocket: Rocket,
  sparkles: Sparkles,
  flag: Flag,
} as const;

function RecognitionSection({ reduceMotion }: { reduceMotion: boolean | null }) {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollAwards(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.8, 320),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section className="section recognition-section" aria-labelledby="recognition-title">
      <div className="container">
        <div className="recognition-heading">
          <div className="section-heading">
            <div className="section-index"><span>07</span><span className="section-index-line" /><span>RECOGNITION</span></div>
            <h2 id="recognition-title">Good work is a team sport.</h2>
            <p>A few moments of recognition along the way—for solving hard problems and showing up for the team.</p>
          </div>
          <div className="recognition-controls">
            <button type="button" aria-label="Scroll recognition left" onClick={() => scrollAwards(-1)}><ArrowLeft size={17} /></button>
            <button type="button" aria-label="Scroll recognition right" onClick={() => scrollAwards(1)}><ArrowRight size={17} /></button>
          </div>
        </div>
        <div
          ref={railRef}
          className="recognition-rail"
          role="region"
          aria-label="Recognition awards. Scroll horizontally to explore."
          tabIndex={0}
        >
          {recognition.map((item, index) => {
            const Icon = awardIcons[item.icon];
            return (
              <article className={`recognition-card recognition-${item.theme}`} key={item.award}>
                <div className="recognition-card-top"><span>RECOGNITION / {String(index + 1).padStart(2, "0")}</span><Icon size={20} aria-hidden="true" /></div>
                <div className="recognition-illustration" aria-hidden="true"><Icon size={36} strokeWidth={1.5} /></div>
                <div className="recognition-card-copy"><span>{item.organization}</span><h3>{item.award}</h3></div>
              </article>
            );
          })}
        </div>
        <p className="recognition-hint">SCROLL OR USE THE ARROWS TO EXPLORE <ArrowRight size={13} /></p>
      </div>
    </section>
  );
}

function GitHubSection() {
  const { snapshot, status } = useGitHubSnapshot();
  const languages = useMemo(() => {
    if (!snapshot) return [];
    const totals = new Map<string, number>();
    for (const repo of snapshot.repos) {
      if (repo.language && !repo.fork) {
        totals.set(repo.language, (totals.get(repo.language) ?? 0) + 1);
      }
    }
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([language]) => language);
  }, [snapshot]);

  const stars =
    snapshot?.repos.reduce((total, repo) => total + repo.stargazers_count, 0) ?? 0;
  const latestRepo = snapshot?.repos[0];

  return (
    <section className="section github-section" id="github">
      <div className="container">
        <SectionHeading
          number="05"
          eyebrow="OPEN SOURCE / IN PUBLIC"
          title="A small window into what I build."
          description="A live snapshot from GitHub. Repository and event data is fetched from GitHub's public API—no activity is simulated."
        />

        <div className="github-panel">
          <div className="github-panel-top">
            <div className="github-profile-mark"><Github size={20} /></div>
            <div>
              <span className="github-handle">@mandipdungeon17</span>
              <span className="github-location"><MapPin size={12} /> Bengaluru, India</span>
            </div>
            <a className="text-link github-profile-link" href={profile.github} target="_blank" rel="noreferrer">
              Visit GitHub <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="github-stats">
            <div className="github-stat">
              <span>PUBLIC REPOSITORIES</span>
              <strong>{status === "ready" ? snapshot?.profile.public_repos : status === "loading" ? "—" : "Unavailable"}</strong>
            </div>
            <div className="github-stat">
              <span>STARS ACROSS PUBLIC REPOS</span>
              <strong>{status === "ready" ? stars : status === "loading" ? "—" : "Unavailable"}</strong>
            </div>
            <div className="github-stat">
              <span>TOP LANGUAGES ACROSS ORIGINAL REPOS</span>
              <strong className="language-stat">{status === "ready" ? languages.join(" · ") || "No language data" : status === "loading" ? "—" : "Unavailable"}</strong>
            </div>
          </div>

          <div className="activity-card">
            <div className="activity-heading">
              <div>
                <strong>Recent public activity</strong>
                <span>GitHub events · rolling 12 weeks</span>
              </div>
              {status === "ready" && !snapshot?.activityError ? (
                <Badge tone="accent"><span className="live-dot" /> LIVE</Badge>
              ) : null}
            </div>
            {status === "loading" ? (
              <p className="activity-message">Loading public GitHub activity…</p>
            ) : status === "error" ? (
              <p className="activity-message activity-error">GitHub profile data couldn’t be loaded. Please try the profile link directly.</p>
            ) : snapshot?.activityError ? (
              <p className="activity-message activity-error">The GitHub activity endpoint is unavailable right now; the profile and repository metrics above are still current.</p>
            ) : snapshot ? (
              <>
                <ActivityGrid events={snapshot.events} />
                <div className="activity-legend">
                  <span>{snapshot.events.length} recent public events returned by GitHub</span>
                  <span className="legend-scale"><i /> Less <i /><i /><i /> More</span>
                </div>
              </>
            ) : null}
          </div>

          {status === "ready" && latestRepo ? (
            <a
              className="latest-repo"
              href={`https://github.com/mandipdungeon17/${latestRepo.name}`}
              target="_blank"
              rel="noreferrer"
            >
              <span><span className="live-dot" /> MOST RECENTLY UPDATED</span>
              <strong>{latestRepo.name}</strong>
              <span>{new Date(latestRepo.pushed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}<ArrowUpRight size={14} /></span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroParallax = useTransform(scrollYProgress, [0, 0.45], [0, 95]);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function updateSpotlight(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  }

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" } },
  } as const;

  return (
    <main className="portfolio-shell" onPointerMove={updateSpotlight}>
      <motion.div className="reading-progress" style={{ scaleX: progressScale }} />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Mandip Pandit home">
            <span className="wordmark-icon">m<span>.</span></span>
            <span>MANDIP PANDIT</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                className={activeSection === item.id ? "nav-link active" : "nav-link"}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
            <Button asChild size="small" className="header-contact">
              <a href="#contact">Let’s talk <ArrowUpRight size={14} /></a>
            </Button>
          </div>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              {navigation.map((item) => (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}<ArrowUpRight size={14} />
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact<ArrowUpRight size={14} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                LinkedIn<ArrowUpRight size={14} />
              </a>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-grid container">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } } }}
          >
            <motion.div className="hero-status" variants={reveal}>
              <span className="live-dot" />
              <span>BUILDING AT HONEYWELL</span>
              <span className="status-divider">/</span>
              <span>BENGALURU, INDIA</span>
            </motion.div>

            <motion.p className="hero-kicker" variants={reveal}>SOFTWARE ENGINEER · JAVA / SPRING BOOT</motion.p>
            <motion.h1 variants={reveal}>
              I build software
              <br />
              that keeps the
              <br />
              <span className="hero-title-accent">real world moving.</span>
            </motion.h1>
            <motion.p className="hero-description" variants={reveal}>
              I’m Mandip—a backend-focused engineer turning complex, business-critical systems into reliable products, and building the tools that help the teams behind them move faster.
            </motion.p>

            <motion.div className="hero-actions" variants={reveal}>
              <Button asChild>
                <a href="#projects">Explore my work <ArrowDownRight size={16} /></a>
              </Button>
              <Button asChild variant="secondary">
                <a href={profile.resume} target="_blank" rel="noreferrer">
                  <Download size={15} /> Resume
                </a>
              </Button>
              <a className="hero-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} /> Connect on LinkedIn <ArrowUpRight size={14} />
              </a>
            </motion.div>

            <motion.div className="hero-proof" variants={reveal}>
              <div className="proof-avatars" aria-hidden="true">
                <span>J</span><span>⌘</span><span>→</span>
              </div>
              <p><strong>8 years in production.</strong> Still curious about what a system can do better.</p>
            </motion.div>
          </motion.div>

          <motion.div className="hero-art-wrap"           style={shouldReduceMotion ? undefined : { y: heroParallax }}>
            <div className="hero-orbit orbit-a" aria-hidden="true" />
            <div className="hero-orbit orbit-b" aria-hidden="true" />
            <motion.div
              className="hero-console"
              initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : 0.3 }}
            >
              <div className="console-header">
                <div className="console-dots"><i /><i /><i /></div>
                <span>warehouse / operations-dashboard</span>
                <span className="console-live"><i /> UI STUDY</span>
              </div>
              <div className="console-body">
                <div className="console-side">
                  <span className="console-brand">H<span>.</span></span>
                  <i className="side-selected"><Code2 size={15} /></i>
                  <i><Radio size={15} /></i>
                  <i><BriefcaseBusiness size={15} /></i>
                </div>
                <div className="console-main">
                  <div className="console-label">WAREHOUSE OPERATIONS</div>
                  <div className="console-title">System overview <span>↗</span></div>
                  <div className="console-cards">
                    <div className="console-metric"><span>ORDERS / MIN</span><strong>2,481</strong><small>↗ 12.4%</small></div>
                    <div className="console-metric"><span>AVG. LATENCY</span><strong>42<span>ms</span></strong><small>↘ 18.2%</small></div>
                  </div>
                  <div className="console-graph">
                    <div className="graph-heading"><span>THROUGHPUT</span><span>LAST 24H&nbsp;⌄</span></div>
                    <svg viewBox="0 0 380 96" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="hero-chart-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#b7f36b" stopOpacity=".22" />
                          <stop offset="100%" stopColor="#b7f36b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 76 C25 65 31 71 52 54 S87 65 106 48 S136 51 157 39 S188 48 207 31 S240 43 257 30 S287 38 310 18 S343 33 360 17 S370 18 380 5 V96 H0Z" fill="url(#hero-chart-fill)" />
                      <path d="M0 76 C25 65 31 71 52 54 S87 65 106 48 S136 51 157 39 S188 48 207 31 S240 43 257 30 S287 38 310 18 S343 33 360 17 S370 18 380 5" fill="none" stroke="#b7f36b" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="console-footer"><span><i /> Service-state visualization</span><span>sample values</span></div>
                </div>
              </div>
              <div className="console-caption">
                <span>UI STUDY · ILLUSTRATIVE DATA</span>
                <ArrowUpRight size={13} />
              </div>
            </motion.div>
            <motion.div
              className="hero-float-tag"
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span><Sparkles size={14} /> ENGINEERED FOR REAL WORK</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-bottom container">
          <div className="hero-scroll"><ArrowDown size={14} /><span>SCROLL TO EXPLORE</span></div>
          <div className="hero-bottom-note">FROM WAREHOUSE FLOORS TO THE SYSTEMS THAT POWER THEM</div>
        </div>
      </section>

      <section className="impact-strip">
        <div className="container impact-grid">
          {impact.map((item, index) => (
            <motion.div
              className="impact-item"
              key={item.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
              transition={{ delay: shouldReduceMotion ? 0 : index * 0.08 }}
            >
              <strong>
                {item.count === null ? item.value : (
                  <AnimatedCounter
                    value={item.count}
                    suffix={item.suffix}
                    reduceMotion={shouldReduceMotion}
                  />
                )}
              </strong>
              <span>{item.label}</span>
              <small>{item.note}</small>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="container">
          <SectionHeading
            number="01"
            eyebrow="THE WORK"
            title="Make the complex dependable."
            description="My work lives where software meets operations: high-volume systems, real-time decisions, and the people who rely on both."
          />

          <div className="work-feature-grid">
            <motion.article
              className="work-feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
            >
              <div className="feature-icon"><Code2 size={18} /></div>
              <span className="feature-label">01 / BACKEND SYSTEMS</span>
              <h3>Built for the pace of the physical world.</h3>
              <p>At Honeywell, I build services behind warehouse workflows—storage, routing, and picking—where a slow or unreliable system is felt immediately on the floor.</p>
              <div className="feature-tags"><Badge>JAVA</Badge><Badge>SPRING BOOT</Badge><Badge>MICROSERVICES</Badge></div>
            </motion.article>
            <motion.article
              className="work-feature-card feature-accent"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
            >
              <div className="feature-icon"><Radio size={18} /></div>
              <span className="feature-label">02 / ENGINEERING ENABLEMENT</span>
              <h3>Make the next investigation shorter.</h3>
              <p>When existing observability tools were too heavy for an on-prem environment, I built LogLens: a small, direct answer to a recurring problem for the whole team.</p>
              <a className="inline-arrow-link" href="#projects">Meet LogLens <ArrowUpRight size={14} /></a>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <SectionHeading
            number="02"
            eyebrow="SELECTED PROJECTS"
            title="A few things I’ve put into the world."
            description="Production-minded tools, architecture explorations, and experiments that began with a question worth answering."
          />

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.a
                className={`project-card project-${project.visual} ${project.featured ? "project-card-featured" : ""}`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.16 }}
                variants={reveal}
                transition={{ delay: shouldReduceMotion ? 0 : (index % 2) * 0.1 }}
                aria-label={`${project.title}: open GitHub repository`}
              >
                <ProjectVisual kind={project.visual} />
                <div className="project-card-content">
                  <div className="project-card-topline">
                    <span>{project.eyebrow}</span>
                    <span>{project.number}</span>
                  </div>
                  <h3>{project.title}<ArrowUpRight size={17} /></h3>
                  <p>{project.description}</p>
                  <div className="project-impact"><span>WHY IT MATTERS</span><p>{project.impact}</p></div>
                  <div className="project-card-footer">
                    <div className="project-stack">
                      {project.stack.map((item) => <Badge key={item}>{item}</Badge>)}
                    </div>
                    <span className="project-link-mark"><ExternalLink size={14} /></span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="container">
          <SectionHeading
            number="03"
            eyebrow="EXPERIENCE"
            title="A career built close to the problem."
            description="From banking systems to warehouse automation, the thread has stayed the same: understand what matters, then make the software more reliable."
          />

          <div className="timeline">
            {experience.map((job, index) => (
              <motion.article
                className={`timeline-item timeline-${job.scene}`}
                key={job.company}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
              >
                <div className="timeline-rail"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
                <div className="timeline-content">
                  <ExperienceScene scene={job.scene} />
                  <div className="timeline-content-copy">
                  <div className="timeline-heading">
                    <div><h3>{job.role}</h3><span>{job.company}</span></div>
                    <div className="timeline-meta"><span>{job.period}</span><span><MapPin size={12} /> {job.location}</span></div>
                  </div>
                  <p className="timeline-summary">{job.summary}</p>
                  <ul className="achievement-list">
                    {job.highlights.map((highlight) => <li key={highlight}><Check size={14} /><span>{highlight}</span></li>)}
                  </ul>
                  <div className="timeline-stack">{job.stack.map((item) => <Badge key={item}>{item}</Badge>)}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section skills-section" id="about">
        <div className="container">
          <SectionHeading
            number="04"
            eyebrow="HOW I WORK"
            title="A practical toolkit. A systems mindset."
            description="I enjoy the full path from understanding a production problem to shipping a measured improvement—and helping a team do it again."
          />

          <div className="skills-layout">
            <motion.div
              className="about-note"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
            >
              <span className="quote-mark">“</span>
              <blockquote>
                The best engineering work is often invisible: fewer late nights, faster investigations, and systems people can trust.
              </blockquote>
              <p>That’s the kind of progress I look for—especially when the environment is complex, on-prem, or running around the clock.</p>
              <div className="about-signoff"><span className="signoff-line" /> MANDIP’S ENGINEERING NOTEBOOK</div>
            </motion.div>

            <div className="skill-groups">
              {skillGroups.map((group, index) => (
                <motion.div
                  className="skill-group"
                  key={group.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  transition={{ delay: shouldReduceMotion ? 0 : index * 0.05 }}
                >
                  <div className="skill-group-heading">
                    <span>0{index + 1}</span>
                    <div><h3>{group.name}</h3><p>{group.description}</p></div>
                    <ChevronDown size={15} />
                  </div>
                  <div className="skill-chips">
                    {group.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GitHubSection />

      <section className="section beyond-section">
        <div className="container">
          <div className="beyond-grid">
            <div className="beyond-column">
              <SectionHeading
                number="06"
                eyebrow="FOUNDATIONS"
                title="Learning is part of the job."
              />
              <motion.article
                className="education-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={reveal}
              >
                <div className="education-icon"><GraduationCap size={20} /></div>
                <div className="education-details">
                  <span>2014 — 2018 · KOLKATA, INDIA</span>
                  <h3>B.Tech, Electronics & Communication Engineering</h3>
                  <p>Techno India University</p>
                </div>
                <ArrowUpRight size={15} />
              </motion.article>
              <p className="education-note">Currently continuing my education alongside full-time engineering work.</p>
            </div>

          </div>
        </div>
      </section>

      <RecognitionSection reduceMotion={shouldReduceMotion} />

      <section className="resume-section">
        <div className="container resume-inner">
          <div className="resume-orbit" aria-hidden="true"><span>MP</span><i /><i /><i /></div>
          <div className="resume-copy">
            <span className="resume-eyebrow">THE SHORT VERSION, IN ONE PLACE</span>
            <h2>Want the full story?</h2>
            <p>My resume has the roles, details, and outcomes behind the work.</p>
          </div>
          <div className="resume-actions">
            <Button asChild>
              <a href={profile.resume} target="_blank" rel="noreferrer">View resume <ArrowUpRight size={15} /></a>
            </Button>
            <Button asChild variant="secondary">
              <a href={profile.resume} download="Mandip-Pandit-Resume.pdf"><Download size={15} /> Download PDF</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="contact-card">
            <div className="contact-copy">
              <span className="section-index"><span>08</span><span className="section-index-line" /><span>CONTACT</span></span>
              <h2>Building something<br /><span>that matters?</span></h2>
              <p>I’m always glad to talk about backend systems, engineering craft, or the next hard problem worth solving.</p>
              <Button asChild>
                <a href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={15} /></a>
              </Button>
            </div>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}><span><Mail size={15} /> EMAIL</span><strong>{profile.email}</strong><ArrowUpRight size={15} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><span><Linkedin size={15} /> LINKEDIN</span><strong>mandip-pandit</strong><ArrowUpRight size={15} /></a>
              <a href={profile.github} target="_blank" rel="noreferrer"><span><Github size={15} /> GITHUB</span><strong>mandipdungeon17</strong><ArrowUpRight size={15} /></a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer"><span><Code2 size={15} /> LEETCODE</span><strong>mandip17</strong><ArrowUpRight size={15} /></a>
              <div className="contact-location"><MapPin size={14} /><span>Based in Bengaluru, India · Open to the right conversation</span></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="wordmark" href="#top" aria-label="Back to top">
            <span className="wordmark-icon">m<span>.</span></span>
            <span>MADE WITH INTENT, IN BENGALURU.</span>
          </a>
          <span>© {new Date().getFullYear()} MANDIP PANDIT</span>
          <a href="#top" className="back-to-top">BACK TO TOP <ArrowUpRight size={12} /></a>
        </div>
      </footer>
    </main>
  );
}
