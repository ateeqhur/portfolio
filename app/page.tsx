"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

const EngineeringScene = dynamic(() => import("../components/hero/EngineeringScene"), { ssr: false });
gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Field Service Order Platform",
    type: "Enterprise platform · Field operations",
    description:
      "Co-owned architecture across 17 modules, including a dynamic rule engine, SLA validation, Okta SSO, and a dispatcher workflow connected to IBM i.",
    stack: ["Cloud architecture", "Okta", "IBM i", "RBAC"],
    role: "Co-owned end-to-end architecture and developed the dispatcher and admin experiences.",
    outcomes: ["Designed a dynamic rule engine and SLA validation logic across a 17-module platform.", "Built four real-time synchronous IBM i touchpoints for dispatch workflows.", "Implemented fine-grained permissions and mentored three junior engineers."],
    visual: "field",
    accent: "sage",
  },
  {
    number: "02",
    title: "ARIA",
    type: "Algorithmic trading · Real-time systems",
    description:
      "Extended a Go trading engine integrated with Interactive Brokers, then built a live P&L dashboard for streaming trade updates and performance review.",
    stack: ["Go", "IBKR API", "Python", "AWS S3"],
    role: "Extended the trading engine and built the real-time performance dashboard.",
    outcomes: ["Implemented WebSocket reconnection, bar subscriptions, bracket orders, and trailing-stop monitoring.", "Created a live P&L dashboard from S3 trade logs with daily, weekly, and monthly views.", "Adapted order handling for MES futures tick size during a client-directed pivot."],
    visual: "aria",
    accent: "blue",
  },
  {
    number: "03",
    title: "FranFlow",
    type: "Dynamic access management · Full stack",
    description:
      "Designed hierarchical permissions across three organizational levels, with a configurable role builder and UI rendered from cached access rules.",
    stack: ["Hierarchical RBAC", "Permissions", "Middleware"],
    role: "Designed the access model and built the dynamic role and permission experience.",
    outcomes: ["Mapped permissions across three organization levels and seven or more roles.", "Created a role builder so administrators can configure access without developer changes.", "Rendered navigation and actions from cached permissions with scope-based data isolation."],
    visual: "franflow",
    accent: "peach",
  },
  {
    number: "04",
    title: "Sales Expansion Dashboard",
    type: "AI-assisted sales · Next.js 14",
    description:
      "Built a sales opportunity dashboard with a Kanban pipeline, multi-dimensional filters, and drill-down recommendations for stakeholder demos.",
    stack: ["Next.js", "TypeScript", "React", "REST APIs"],
    role: "Developed a stakeholder-ready opportunity prioritization dashboard.",
    outcomes: ["Built a Kanban view with filters for deal size, stage, customer tier, and product family.", "Added drill-down screens for buying signals and product recommendations.", "Connected a synthetic data layer to a Next.js REST API ahead of Snowflake integration."],
    visual: "cisco",
    accent: "lilac",
  },
  {
    number: "05",
    title: "Conversational Query Engine",
    type: "Generative AI · Data platform",
    description:
      "Turns natural-language requests into governed Snowflake SQL, grounding generation in a data dictionary and validating queries before execution.",
    stack: ["FastAPI", "LLMs", "SQLGlot", "Snowflake"],
    role: "Engineered the backend for governed natural-language analytics.",
    outcomes: ["Grounds generated SQL with a governed data dictionary.", "Validates generated queries with SQLGlot before execution.", "Applies fine-grained RBAC to Snowflake queries across multiple LLMs."],
    visual: "query",
    accent: "yellow",
  },
  {
    number: "06",
    title: "DYNVIZ",
    type: "Backend platform · Go",
    description:
      "Delivered REST APIs across 10+ modules and concurrent PostgreSQL metadata discovery, increasing service throughput by 20%.",
    stack: ["Go", "GORM", "PostgreSQL", "Goroutines"],
    role: "Designed REST APIs and concurrent metadata discovery for a multi-module product.",
    outcomes: ["Implemented CRUD APIs across more than ten modules using Go and GORM.", "Added concurrent PostgreSQL metadata discovery with goroutines.", "Raised API throughput by 20%."],
    visual: "dynviz",
    accent: "mint",
  },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "Go", "SQL", "Next.js"],
  },
  {
    title: "Backend & APIs",
    items: ["FastAPI", "Flask", "REST", "Celery", "GORM", "JWT", "OAuth", "Okta SSO", "RBAC"],
  },
  {
    title: "Generative AI",
    items: ["LLM applications", "RAG", "OpenAI", "Text-to-SQL", "SQLGlot", "PyMuPDF4LLM"],
  },
  {
    title: "Data engineering",
    items: ["PySpark", "Databricks", "Kafka", "Airflow", "Matillion", "Azure Event Hubs", "ETL / ELT"],
  },
  {
    title: "Databases & cloud",
    items: ["Snowflake", "PostgreSQL", "MongoDB", "MySQL", "Redis", "AWS", "Docker", "CI / CD"],
  },
  {
    title: "Tools & integration",
    items: ["Workato", "Postman", "Git", "GitHub", "Nginx"],
  },
];

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "aria") {
    return (
      <div className="visual-shell chart-shell" aria-hidden="true">
        <div className="visual-top"><span>ARIA / LIVE P&amp;L</span><span className="visual-live">● LIVE</span></div>
        <div className="chart-value">P&amp;L updates <small>streaming</small></div>
        <svg className="line-chart" viewBox="0 0 460 135" preserveAspectRatio="none">
          <path d="M0 110 C35 104 32 73 70 83 S110 118 145 85 190 82 225 58 270 77 300 48 344 61 375 28 418 45 460 9" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M0 110 C35 104 32 73 70 83 S110 118 145 85 190 82 225 58 270 77 300 48 344 61 375 28 418 45 460 9 L460 135 L0 135Z" fill="currentColor" opacity=".08" />
        </svg>
        <div className="chart-axis"><span>09:30</span><span>11:00</span><span>12:30</span><span>14:00</span><span>16:00</span></div>
      </div>
    );
  }

  if (kind === "field") {
    return (
      <div className="visual-shell field-shell" aria-hidden="true">
        <div className="visual-top"><span>FIELD SERVICE</span><span>DISPATCH</span></div>
        <div className="field-status"><i /> Ready for assignment</div>
        <div className="field-lines"><span>Workflow</span><b>Dispatcher persona</b><span>Service level</span><b>SLA validation</b><span>Integration</span><b>IBM i · real time</b></div>
        <div className="field-button">Assign technician <span>→</span></div>
      </div>
    );
  }

  if (kind === "franflow") {
    return (
      <div className="visual-shell access-shell" aria-hidden="true">
        <div className="visual-top"><span>ORGANIZATION ACCESS</span><span>3 LEVELS</span></div>
        <div className="access-tree"><div className="access-node root-node">Workspace admin</div><div className="access-branches"><div className="access-node">Regional manager</div><div className="access-node">Team lead</div><div className="access-node">Contributor</div></div></div>
        <div className="access-foot"><span>7 roles</span><span>Permission matrix <b>↗</b></span></div>
      </div>
    );
  }

  if (kind === "cisco") {
    return (
      <div className="visual-shell sales-shell" aria-hidden="true">
        <div className="visual-top"><span>OPPORTUNITY PIPELINE</span><span>DEMO VIEW</span></div>
        <div className="sales-summary"><span>Pipeline board<strong>Prioritized</strong></span><span>Deal filters<strong>Multi-axis</strong></span></div>
        <div className="sales-bars"><i style={{ height: "43%" }} /><i style={{ height: "68%" }} /><i style={{ height: "52%" }} /><i style={{ height: "83%" }} /><i style={{ height: "61%" }} /><i style={{ height: "100%" }} /><i style={{ height: "73%" }} /></div>
        <div className="sales-axis"><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span></div>
      </div>
    );
  }

  if (kind === "query") {
    return (
      <div className="visual-shell query-shell" aria-hidden="true">
        <div className="visual-top"><span>CONVERSATIONAL QUERY</span><span>SNOWFLAKE</span></div>
        <div className="query-prompt"><span>QUESTION</span>Show monthly sales by region for 2025</div>
        <div className="query-code"><span>SELECT</span> region, month, <em>SUM</em>(sales)<br /><span>FROM</span> analytics.orders<br /><span>WHERE</span> year = <b>2025</b><br /><span>GROUP BY</span> 1, 2 <i>✓ validated</i></div>
      </div>
    );
  }

  return (
    <div className="visual-shell dynviz-shell" aria-hidden="true">
      <div className="visual-top"><span>SERVICE HEALTH</span><span>10 MODULES</span></div>
      <div className="module-grid"><span>Identity</span><span>Accounts</span><span>Inventory</span><span>Orders</span><span>Reports</span><span>Metadata</span></div>
      <div className="throughput"><div><strong>+20%</strong><span>API throughput</span></div><div className="throughput-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>
    </div>
  );
}

const portraitColumns = 24;
const portraitRows = 32;
const portraitDotScale = 0.48;
const portraitTiles = Array.from({ length: portraitColumns * portraitRows }, (_, index) => {
  const col = index % portraitColumns;
  const row = Math.floor(index / portraitColumns);
  const delay = ((index * 73 + 41) % 101) / 100 * 0.7;
  return { index, col, row, delay };
});

function MosaicPortrait() {
  const photoRef = useRef<HTMLDivElement>(null);
  const [origins, setOrigins] = useState<Array<{ x: number; y: number }> | null>(null);
  useEffect(() => {
    const bounds = photoRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const tileWidth = bounds.width / portraitColumns;
    const tileHeight = bounds.height / portraitRows;
    setOrigins(portraitTiles.map(({ index, col, row }) => {
      const xSeed = ((index * 73 + 31) % 997) / 997;
      const ySeed = ((index * 191 + 17) % 991) / 991;
      const tileCenterX = bounds.left + (col + 0.5) * tileWidth;
      const tileCenterY = bounds.top + (row + 0.5) * tileHeight;
      return { x: xSeed * window.innerWidth - tileCenterX, y: ySeed * window.innerHeight - tileCenterY };
    }));
  }, []);
  return <div ref={photoRef} className="hero-photo">
    <span className="sr-only" role="img" aria-label="Ateeqh Ur Rehman in a navy suit" />
    <span className={`portrait-base${origins ? " portrait-revealed" : ""}`} aria-hidden="true" />
    {origins && <div className="portrait-mosaic" aria-hidden="true">{portraitTiles.map(({ index, col, row, delay }) => <motion.i key={index} initial={{ opacity: 0.96, scale: 0.82, x: origins[index].x, y: origins[index].y, rotate: index % 2 ? -5 : 5, filter: "brightness(1.5) saturate(1.12)" }} animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, filter: "brightness(1) saturate(1)" }} transition={{ duration: 2.8, delay, ease: [0.22, 1, 0.36, 1] }} style={{ gridColumn: col + 1, gridRow: row + 1, width: `${portraitDotScale * 100}%`, height: `${portraitDotScale * 100}%`, backgroundImage: "url('/images/ateeqh-professional-portrait.png')", backgroundSize: `${portraitColumns * 100 / portraitDotScale}% ${portraitRows * 100 / portraitDotScale}%`, backgroundPosition: `${col / (portraitColumns - 1) * 100}% ${row / (portraitRows - 1) * 100}%` } as CSSProperties} />)}</div>}
  </div>;
}

function CursorDotTrail({ theme, reduceMotion }: { theme: "dark" | "light"; reduceMotion: boolean | null }) {
  const trailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const trail = trailRef.current;
    if (!trail || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const dots = Array.from(trail.children) as HTMLSpanElement[];
    const points = dots.map(() => ({ x: -100, y: -100 }));
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let initialized = false;

    const animate = () => {
      let unsettled = false;
      dots.forEach((dot, index) => {
        const point = points[index];
        const nextX = index === 0 ? targetX : points[index - 1].x;
        const nextY = index === 0 ? targetY : points[index - 1].y;
        const ease = index === 0 ? 0.48 : 0.3;
        point.x += (nextX - point.x) * ease;
        point.y += (nextY - point.y) * ease;
        dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
        if (Math.abs(nextX - point.x) > 0.35 || Math.abs(nextY - point.y) > 0.35) unsettled = true;
      });
      frame = unsettled ? requestAnimationFrame(animate) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX - 8;
      targetY = event.clientY - 8;
      if (!initialized) {
        points.forEach((point, index) => {
          point.x = targetX - index * 4;
          point.y = targetY - index * 3;
        });
        initialized = true;
      }
      trail.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) trail.style.opacity = "0";
    };
    const onWindowBlur = () => { trail.style.opacity = "0"; };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [reduceMotion]);

  return <div ref={trailRef} className="cursor-dot-trail" aria-hidden="true" style={{ "--cursor-dot-color": theme === "dark" ? "#f4f6f2" : "#252a26" } as CSSProperties}>
    {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
  </div>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const caseOpener = useRef<HTMLButtonElement | null>(null);
  const closeCaseButton = useRef<HTMLButtonElement | null>(null);
  const closeContactButton = useRef<HTMLButtonElement | null>(null);
  const contactOpener = useRef<HTMLElement | null>(null);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("A message from your portfolio");
  const [emailCopied, setEmailCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 190]);

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem("portfolio-theme");
    } catch {
      // Keep the dark default when browser storage is unavailable.
    }
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme, themeReady]);

  useGSAP(() => {
    if (reduceMotion) return;
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.fromTo(".hero-copy > *", { y: 22, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.85, stagger: 0.1, clearProps: "all" });
    intro.fromTo(".hero h1", { y: 38, scale: 0.82, autoAlpha: 0, filter: "blur(15px)" }, { y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 1.05, ease: "expo.out", clearProps: "all" }, "<0.1");

  }, { scope: root, dependencies: [reduceMotion], revertOnUpdate: true });

  useEffect(() => {
    if (reduceMotion) return;
    const elements = Array.from(root.current?.querySelectorAll<HTMLElement>(".reveal") ?? []);
    elements.forEach((element) => element.classList.add("reveal-ready"));
    const headingAnimations: gsap.core.Tween[] = [];
    elements.forEach((element) => {
      const heading = element.querySelector<HTMLElement>("h2");
      if (!heading) return;
      const screenSafeZoom = () => {
        const left = Math.max(12, heading.getBoundingClientRect().left);
        const width = Math.max(heading.offsetWidth, 1);
        const availableWidth = Math.max(window.innerWidth - left - 24, width);
        return Math.min(16, availableWidth / width);
      };
      element.classList.add("reveal-heading");
      headingAnimations.push(gsap.fromTo(heading,
        { autoAlpha: 0, scale: screenSafeZoom, filter: "blur(4px)", transformOrigin: "left center" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "none", immediateRender: false, scrollTrigger: { trigger: heading, start: "top 94%", end: "top 72%", scrub: 0.65, invalidateOnRefresh: true } },
      ));
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const heading = entry.target.querySelector<HTMLElement>("h2");
        const supportingCopy = heading ? entry.target.closest("section")?.querySelectorAll<HTMLElement>(".section-aside, .about-copy p") ?? [] : [];
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (supportingCopy.length) gsap.fromTo(supportingCopy, { autoAlpha: 0, y: 20, filter: "blur(7px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65, delay: 0.25, stagger: 0.06, ease: "power3.out", clearProps: "all" });
        } else {
          entry.target.classList.remove("is-visible");
          if (supportingCopy.length) {
            gsap.killTweensOf(supportingCopy);
            gsap.set(supportingCopy, { autoAlpha: 0, y: 20, filter: "blur(7px)" });
          }
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      headingAnimations.forEach((animation) => animation.revert());
      elements.forEach((element) => element.classList.remove("reveal-ready", "is-visible", "reveal-heading"));
    };
  }, [reduceMotion]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id], main footer[id]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lenis) return;
    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncScrollTrigger);
    return () => lenis.off("scroll", syncScrollTrigger);
  }, [lenis]);

  useEffect(() => {
    if (!selectedProject) return;
    const closeOnKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".case-dialog button, .case-dialog a[href]"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", closeOnKeyboard);
    document.body.classList.add("dialog-open");
    lenis?.stop();
    requestAnimationFrame(() => closeCaseButton.current?.focus());
    return () => {
      document.removeEventListener("keydown", closeOnKeyboard);
      document.body.classList.remove("dialog-open");
      lenis?.start();
      if (!contactOpen) requestAnimationFrame(() => caseOpener.current?.focus());
    };
  }, [selectedProject, lenis, contactOpen]);

  useEffect(() => {
    if (!contactOpen) return;
    const contactKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".contact-dialog button, .contact-dialog a[href]"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", contactKeys);
    document.body.classList.add("dialog-open");
    lenis?.stop();
    requestAnimationFrame(() => closeContactButton.current?.focus());
    return () => {
      document.removeEventListener("keydown", contactKeys);
      document.body.classList.remove("dialog-open");
      lenis?.start();
      requestAnimationFrame(() => contactOpener.current?.focus());
    };
  }, [contactOpen, lenis]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    history.pushState(null, "", `#${id}`);
    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: reduceMotion ? "instant" : "smooth" });
    if (lenis) requestAnimationFrame(() => lenis.resize());
  };

  const showContact = (subject: string, opener: HTMLElement) => {
    contactOpener.current = opener;
    setContactSubject(subject);
    setEmailCopied(false);
    setSelectedProject(null);
    setContactOpen(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ateeqhurrehman@gmail.com");
      setEmailCopied(true);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <main ref={root}>
      <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />
      <CursorDotTrail theme={theme} reduceMotion={reduceMotion} />
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={(event) => navigateTo(event, "home")} aria-label="Ateeqh Ur Rehman, home">Ateeqh<span>.</span></a>
        <nav className={mobileMenuOpen ? "nav-open" : ""} aria-label="Main navigation">
          {["about", "projects", "experience", "skills"].map((id) => <a className={activeSection === id ? "nav-active" : ""} key={id} href={`#${id}`} onClick={(event) => { navigateTo(event, id); setMobileMenuOpen(false); }}>{id}<span className="nav-marker">↘</span></a>)}
        </nav>
        <button className="header-contact" type="button" onClick={(event) => showContact("A message from your portfolio", event.currentTarget)}>Let&apos;s talk <span>↗</span></button>
        <button className="theme-toggle" type="button" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}><span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span><small>{theme === "dark" ? "Light" : "Dark"}</small></button>
        <a className="header-resume" href="/Ateeqh-Ur-Rehman-Resume.pdf" download aria-label="Download resume">Resume <span aria-hidden="true">↓</span></a>
        <button ref={menuButton} className={`menu-toggle ${mobileMenuOpen ? "menu-open" : ""}`} type="button" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}><span /><span /></button>
      </header>

      <section className="hero" id="home">
        <EngineeringScene />
        <motion.div className="hero-orbit" aria-hidden="true" style={{ y: reduceMotion ? 0 : orbitY }}><div className="hero-orbit-spin"><i /><i /><i /></div></motion.div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="availability-dot" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> PUNE, INDIA</p>
          <h1>I make complex<br />systems feel <em>simple.</em></h1>
          <p className="hero-summary">I&apos;m Ateeqh Ur Rehman. I build backend systems, data platforms, and practical generative AI for enterprise teams.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects" onClick={(event) => navigateTo(event, "projects")}>Explore my work <span>↓</span></a>
            <button className="text-link" type="button" onClick={(event) => showContact("A message from your portfolio", event.currentTarget)}>Get in touch <span>↗</span></button>
          </div>
          <div className="hero-proof"><div><strong>3<span>+</span></strong><span>years building<br />production systems</span></div><i /><div><strong>95<span>%</span></strong><span>higher data<br />processing efficiency</span></div><i /><div><strong>90<span>%</span></strong><span>document extraction<br />accuracy</span></div></div>
        </div>
        <div className="hero-photo-wrap">
          <MosaicPortrait />
          <motion.div className="floating-note" initial={reduceMotion ? false : { y: 12, opacity: 0 }} animate={{ y: [0, -8, 0], opacity: 1 }} transition={{ y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6, delay: 0.8 } }}><span className="note-signal" /><div><strong>Building for impact</strong><span>Backend · Data · Applied AI</span></div><b>↗</b></motion.div>
          <div className="photo-note"><span>01 / 06</span><span>ENGINEER · PUNE, INDIA</span></div>
          <span className="photo-spark" aria-hidden="true">✳</span>
        </div>
        <a className="scroll-cue" href="#about" onClick={(event) => navigateTo(event, "about")}><span>SCROLL TO EXPLORE</span><i>↓</i></a>
      </section>

      <section className="about section" id="about">
        <div className="section-intro reveal"><p className="eyebrow">A LITTLE ABOUT ME <span>01</span></p><h2>Clear thinking.<br /><em>Dependable systems.</em></h2></div>
        <div className="about-copy"><p>My work sits at the intersection of backend engineering, data, and applied AI. I enjoy taking a complicated workflow—from event ingestion to document intelligence—and making it reliable, understandable, and useful.</p><p>At DynPro, I&apos;ve contributed to platforms across manufacturing, healthcare, retail, analytics, and enterprise integrations, with ownership spanning architecture, implementation, and delivery.</p><a className="text-link" href="https://www.linkedin.com/in/ateeqh-ur-rehman-a11364271/" target="_blank" rel="noreferrer">More about my work <span>↗</span></a></div>
      </section>

      <section className="projects-section section" id="projects">
        <div className="section-head reveal"><div><p className="eyebrow">SELECTED WORK <span>02</span></p><h2>Projects with <em>purpose.</em></h2></div><p className="section-aside">A selection of systems I&apos;ve helped<br />design, build, and bring to life.</p></div>
        <div className="project-grid">
          {projects.map((project) => (
            <motion.article className={`project-card reveal accent-${project.accent}`} key={project.number} whileHover={reduceMotion ? undefined : { y: -7 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
              <ProjectVisual kind={project.visual} />
              <span className="project-corner" aria-hidden="true">↗</span>
              <div className="project-content">
                <div className="project-type"><span>{project.type}</span><span>{project.number}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <button className="case-link" type="button" onClick={(event) => { caseOpener.current = event.currentTarget; setSelectedProject(project); }}>Explore case study <span>↗</span></button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="experience section" id="experience">
        <div className="section-head reveal"><div><p className="eyebrow">WHERE I&apos;VE BEEN <span>03</span></p><h2>Experience &amp; <em>impact.</em></h2></div><p className="section-aside">Practical engineering, measured<br />by the problems it solves.</p></div>
        <article className="experience-card reveal">
          <div className="experience-heading"><div><span className="experience-period">JUN 2023 — PRESENT · PUNE, INDIA</span><h3>Consultant — AI Augmented Analytics</h3><p>DynPro India Pvt. Ltd.</p></div><span className="experience-mark">D.</span></div>
          <div className="impact-grid">
            <div><strong>95%</strong><span>higher processing efficiency<br />distributed data platform</span></div>
            <div><strong>+20%</strong><span>API throughput<br />DYNVIZ / Go</span></div>
            <div><strong>90%</strong><span>document extraction accuracy<br />local language models</span></div>
            <div><strong>70%</strong><span>less extraction time<br />PyMuPDF4LLM pipeline</span></div>
          </div>
          <div className="experience-note"><p>Across client work, I&apos;ve optimized distributed data processing, automated cloud ETL releases, built governed text-to-SQL services, and developed integrations across platforms such as JIRA, NetSuite, Salesforce, and Snowflake.</p><button className="text-link" type="button" onClick={(event) => showContact("Discuss an opportunity", event.currentTarget)}>Discuss an opportunity <span>↗</span></button></div>
        </article>
      </section>

      <section className="skills-section section" id="skills">
        <div className="section-head reveal"><div><p className="eyebrow">MY TOOLKIT <span>04</span></p><h2>The right tools for <em>the job.</em></h2></div><p className="section-aside">A practical stack shaped by<br />real product and platform work.</p></div>
        <div className="skills-grid">{skillGroups.map((group, groupIndex) => <motion.article className="skill-group" key={group.title} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5, delay: groupIndex * 0.06 }}><h3>{group.title}<span>0{groupIndex + 1}</span></h3><div>{group.items.map((item) => <motion.span key={item} whileHover={reduceMotion ? undefined : { y: -3, backgroundColor: theme === "dark" ? "#34463a" : "#e4eee5", color: theme === "dark" ? "#f5f7f5" : "#26352a" }}>{item}</motion.span>)}</div></motion.article>)}</div>
      </section>

      <section className="background-section section" id="background">
        <div className="background-column"><p className="eyebrow">EDUCATION <span>05</span></p><h2>Grounded in <em>engineering.</em></h2><article className="background-item"><div><h3>AMC Engineering College</h3><p>B.E. · Computer Science and Engineering</p></div><span>2018 — 2022<br />CGPA 7.76 / 10</span></article></div>
        <div className="background-column certifications"><p className="eyebrow">CERTIFICATIONS <span>06</span></p><h2>Always <em>learning.</em></h2><ul><li>Google Cloud Digital Leader</li><li>Databricks Accredited Lakehouse Fundamentals</li><li>Workato Automation Pro I, II &amp; III</li><li>AWS Cloud Essentials · IBM Cloud Essentials V3</li></ul></div>
      </section>

      <footer className="site-footer contact-section" id="contact">
        <div className="contact-content"><p className="eyebrow">HAVE A GOOD PROBLEM?</p><h2>Get In Touch</h2><p className="contact-intro">I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out.</p>
          <a className="button button-dark say-hello" href={`https://mail.google.com/mail/?view=cm&fs=1&to=ateeqhurrehman%40gmail.com&su=${encodeURIComponent("A message from your portfolio")}`}>✉ <span>Say Hello</span></a>
          <p className="connect-label">Or connect with me on</p><div className="social-links"><a href="https://www.linkedin.com/in/ateeqh-ur-rehman-a11364271/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 .01-4.12 2.06 2.06 0 0 1-.01 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.43c.99 0 1.79-.77 1.79-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg></a></div>
          <a className="resume-download" href="/Ateeqh-Ur-Rehman-Resume.pdf" download>Download My Resume <span aria-hidden="true">↓</span></a>
        </div>
        <div className="footer-bottom"><span>© 2026 Ateeqh Ur Rehman</span><a href="#home" onClick={(event) => navigateTo(event, "home")}>Back to top ↑</a></div>
      </footer>

      <AnimatePresence>
        {selectedProject && <motion.div className="case-overlay" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
          <motion.section className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>
            <div className="case-dialog-top"><p className="eyebrow">CASE STUDY <span>{selectedProject.number}</span></p><button ref={closeCaseButton} type="button" aria-label="Close case study" onClick={() => setSelectedProject(null)}>×</button></div>
            <p className="case-type">{selectedProject.type}</p><h2 id="case-title">{selectedProject.title}</h2><p className="case-description">{selectedProject.description}</p>
            <div className="case-role"><span>MY CONTRIBUTION</span><p>{selectedProject.role}</p></div>
            <ul className="case-outcomes">{selectedProject.outcomes.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul>
            <div className="project-tags">{selectedProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <a className="button button-dark case-contact" href={`https://mail.google.com/mail/?view=cm&fs=1&to=ateeqhurrehman%40gmail.com&su=${encodeURIComponent(`Let's discuss ${selectedProject.title}`)}`}>Discuss a similar challenge <span>↗</span></a>
          </motion.section>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && <motion.div className="case-overlay contact-overlay" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setContactOpen(false); }}>
          <motion.section className="case-dialog contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>
            <div className="case-dialog-top"><p className="eyebrow">LET&apos;S CONNECT</p><button ref={closeContactButton} type="button" aria-label="Close contact options" onClick={() => setContactOpen(false)}>×</button></div>
            <p className="case-type">{contactSubject}</p><h2 id="contact-title">A good conversation starts here.</h2><p className="case-description">Choose how you&apos;d like to reach me. Nothing will be sent until you write and send your message.</p>
            <div className="contact-address"><span>EMAIL ADDRESS</span><strong>ateeqhurrehman@gmail.com</strong><button type="button" onClick={copyEmail}>{emailCopied ? "Copied" : "Copy email"}</button></div>
            <p className="copy-feedback" role="status">{emailCopied ? "Email address copied to clipboard." : ""}</p>
            <a className="button button-dark contact-compose" href={`https://mail.google.com/mail/?view=cm&fs=1&to=ateeqhurrehman%40gmail.com&su=${encodeURIComponent(contactSubject)}`}>Open Gmail <span>↗</span></a>
            <button className="contact-dismiss" type="button" onClick={() => setContactOpen(false)}>Maybe later</button>
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
