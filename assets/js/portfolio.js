"use strict";
(() => {
  const colors = {
    fg: "#eae8e2",
    muted: "#92969e",
    gold: "#edbb65",
    green: "#91caaa",
    blue: "#93b6e5",
    edge: "#363c46",
  };
  const label = (x, y, value, color = "fg", size = 13, extra = "") =>
    `<text x="${x}" y="${y}" fill="${colors[color]}" font-size="${size}" ${extra}>${value}</text>`;
  const box = (x, y, w, h, value, color = "fg") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#10151b" stroke="#363c46"/>${label(x + w / 2, y + h / 2 + 4, value, color, 12, 'text-anchor="middle"')}`;
  const line = (x1, y1, x2, y2, color = "muted", extra = "") =>
    `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${colors[color]}" stroke-width="1.4" marker-end="url(#arrow)" ${extra}/>`;
  // Conceptual diagrams illustrate the work; they are not production architecture or live metrics.
  const scenes = [
    {
      title: "BUILD THE SYSTEM",
      note: "From data cleaning to model deployment.",
      alt: "Conceptual diagram: data flows through a machine learning pipeline to a deployed model.",
      svg: () =>
        `${label(35, 53, "STARTUP / SYSTEMS THINKING", "muted", 10)}${box(35, 97, 130, 54, "Raw data", "gold")}${line(176, 124, 335, 124, "gold", 'class="draw-line"')}${box(350, 97, 135, 54, "Clean & process", "green")}<g class="appear" style="--delay:.5s">${line(418, 160, 418, 220, "green")}${box(350, 234, 135, 54, "ML pipeline", "green")}${line(338, 261, 182, 261, "blue")}${box(35, 234, 130, 54, "Deploy model", "blue")}</g><g class="appear" style="--delay:1s">${label(260, 346, "DATA → SYSTEM → PRODUCTION", "gold", 12, 'text-anchor="middle"')}</g>`,
    },
    {
      title: "MAKE IT RELIABLE",
      note: "Automation. Compatibility. Confidence.",
      alt: "Illustration of an automated test suite checking multiple platforms and devices.",
      svg: () =>
        `${label(35, 53, "VARICENT / QUALITY ENGINEERING", "muted", 10)}${box(160, 83, 200, 48, "Automated test suite", "gold")}${line(260, 141, 260, 174, "gold", 'class="draw-line"')}<path d="M80 197 V176 H440 V197" fill="none" stroke="#363c46"/>${[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]
          .map((i) => {
            const x = 40 + (i % 5) * 91,
              y = 204 + Math.floor(i / 5) * 65;
            return `<g class="appear" style="--delay:${0.3 + i * 0.09}s"><rect x="${x}" y="${y}" width="76" height="47" rx="5" fill="#121a19" stroke="#91caaa55"/>${label(x + 38, y + 29, "✓", "green", 23, 'text-anchor="middle"')}</g>`;
          })
          .join(
            "",
          )}${label(260, 367, "10+ PLATFORMS & DEVICES", "green", 11, 'text-anchor="middle"')}`,
    },
    {
      title: "TURN IDEAS INTO INTERFACES",
      note: "From research requirements to online delivery.",
      alt: "Conceptual diagram connecting a research platform interface, backend, database, and Docker deployment.",
      svg: () =>
        `${label(35, 53, "WATERLOO / RESEARCH & DEVELOPMENT", "muted", 10)}<rect x="60" y="85" width="400" height="146" rx="6" fill="#0b0e12" stroke="#363c46"/><path d="M60 110 H460" stroke="#363c46"/><circle cx="76" cy="98" r="3" fill="#edbb65"/>${label(260, 102, "Academic platform", "muted", 9, 'text-anchor="middle"')}<rect class="paint" x="80" y="132" width="98" height="76" rx="3" fill="#93b6e522" stroke="#93b6e566"/><rect class="paint" style="--delay:.2s" x="196" y="132" width="240" height="12" rx="2" fill="#edbb65"/><rect class="paint" style="--delay:.4s" x="196" y="158" width="210" height="6" rx="2" fill="#92969e"/><rect class="paint" style="--delay:.55s" x="196" y="176" width="160" height="6" rx="2" fill="#4e5867"/><g class="appear" style="--delay:.7s">${line(260, 243, 260, 277, "blue")}${box(60, 291, 115, 45, "Frontend", "blue")}${box(202, 291, 115, 45, "Backend", "green")}${box(345, 291, 115, 45, "SQL / Docker", "gold")}</g>`,
    },
    {
      title: "MAKE AN IMPACT",
      note: "Technical improvements, tangible business value.",
      alt: "Honkon results from the existing experience notes: 5,000+ concurrent requests, 40% faster page loading, and $1,500 monthly savings.",
      svg: () =>
        `${label(35, 53, "HONKON / ENGINEERING & IMPACT", "muted", 10)}${label(45, 116, "5,000+", "gold", 43)}${label(47, 143, "CONCURRENT REQUESTS", "muted", 10)}${label(45, 225, "40%", "green", 43)}${label(47, 252, "FASTER PAGE LOADING", "muted", 10)}${label(45, 333, "$1,500", "blue", 43)}${label(47, 360, "SAVED PER MONTH", "muted", 10)}<g class="appear" style="--delay:.5s"><path class="draw-line" d="M280 294 L314 260 L350 266 L389 197 L433 146 L472 110" fill="none" stroke="#edbb65" stroke-width="2"/><path d="M280 320 H480 M280 320 V85" fill="none" stroke="#363c46"/>${label(380, 350, "IMPACT", "muted", 9, 'text-anchor="middle"')}</g>`,
    },
  ];
  const chapters = [...document.querySelectorAll(".chapter")];
  const nav = [...document.querySelectorAll(".rail a")];
  let active = -1;
  function setScene(index) {
    if (active === index) return;
    active = index;
    const scene = scenes[index];
    document.querySelector("#stage-label").textContent =
      `0${index + 1} / ${scene.title}`;
    document.querySelector("#stage-note").textContent = scene.note;
    document.querySelector("#scene").setAttribute("aria-label", scene.alt);
    document.querySelector("#scene").innerHTML =
      `<svg viewBox="0 0 520 390" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 1 L8 5 L0 9" fill="none" stroke="#92969e" stroke-width="1.5"/></marker></defs><g class="scene-content">${scene.svg()}</g></svg>`;
    document.querySelector("#scene-dots").innerHTML = scenes
      .map((_, i) => `<i class="${i === index ? "active" : ""}"></i>`)
      .join("");
    chapters.forEach((c, i) => c.classList.toggle("active", i === index));
    nav.forEach((a, i) => {
      a.classList.toggle("active", i === index);
      if (i === index) a.setAttribute("aria-current", "step");
      else a.removeAttribute("aria-current");
    });
  }
  let framePending = false;
  function onScroll() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => {
      framePending = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      document.querySelector(".reading-progress").style.transform =
        `scaleX(${max > 0 ? scrollY / max : 0})`;
      const target = innerWidth <= 700 ? innerHeight * 0.72 : innerHeight * 0.5;
      let best = 0,
        distance = Infinity;
      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - target);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      setScene(best);
    });
  }
  setScene(0);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document.body.classList.add("js-ready");
  }
  const projects = {
    weather: {
      title: "real-weather",
      image: "weather.png",
      repo: "Real-time-Weather-Alert-System",
      post: "2025-05-23-real-weather",
      description:
        "A real-time weather warning system that fetches live weather data and sends alerts when severe weather is detected. A hands-on lesson in API integration, asynchronous requests, and CORS.",
    },
    movie: {
      title: "mood-decide-movie",
      image: "movie.png",
      repo: "mood-effect-movie",
      post: "2025-05-23-movie-recommodation-system",
      description:
        "A mood-based movie recommendation system built with Flask and the TMDB API. I learned to map mood keywords to genres, handle form data, and retrieve real movie metadata.",
    },
    todo: {
      title: "to-do",
      image: "todo.png",
      repo: "to-do",
      post: "2025-05-22-to-do",
      description:
        "A simple to-do list built with HTML, CSS, and JavaScript. Add, complete, and delete tasks, with local storage to keep them after a refresh. An exercise in DOM events and application state.",
    },
    cat: {
      title: "cat-generator",
      image: "cat.png",
      repo: "Random-Cat-Generator",
      post: "2025-05-22-cat-generator",
      description:
        "A random cat generator using React, JavaScript, and TheCatAPI. I explored hooks, asynchronous API requests, and fallback handling for unexpected responses. Also: cute cats.",
    },
    game: {
      title: "2048-game",
      image: "2048.png",
      repo: "2048-game",
      post: "2025-05-22-2048-game",
      description:
        "A Python implementation of 2048. Arrow keys shift and merge the tiles. I learned to manage a 2D grid, detect valid moves, and ensure tiles merge only once per turn.",
    },
  };
  document.querySelectorAll("[data-project]").forEach((button, index) =>
    button.addEventListener("click", () => {
      const project = projects[button.dataset.project];
      document.querySelectorAll("[data-project]").forEach((b) => {
        b.classList.toggle("selected", b === button);
        b.setAttribute("aria-pressed", String(b === button));
      });
      document.querySelector("#project-label").textContent =
        `0${index + 1} / ${project.title.toUpperCase()}`;
      document.querySelector("#project-title").textContent = project.title;
      document.querySelector("#project-description").textContent =
        project.description;
      const image = document.querySelector("#project-image");
      image.src = `/assets/img/${project.image}`;
      image.alt = `${project.title} project screenshot`;
      document.querySelector("#project-source").href =
        `https://github.com/endElder/${project.repo}`;
      document.querySelector("#project-notes").href = `/${project.post}/`;
      document.querySelector("#project-announcement").textContent =
        `Showing ${project.title}. ${project.description}`;
    }),
  );
})();
