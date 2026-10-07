/* Site behaviour: nav, theme toggle, and rendering content from data.js */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.setAttribute("data-theme", t); } catch (e) {}
  const themeBtn = $("#theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav ---------- */
  const menuBtn = $("#menu-toggle"), links = $("#nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Footer year & site config ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  if (typeof SITE !== "undefined") {
    document.querySelectorAll("[data-site-email]").forEach((el) => {
      el.textContent = SITE.email; el.href = "mailto:" + SITE.email;
    });
    document.querySelectorAll("[data-site-address]").forEach((el) => (el.innerHTML = SITE.address.map(esc).join("<br>")));
    if (!SITE.showPlaceholderNotes) document.querySelectorAll(".placeholder-note").forEach((n) => n.remove());
  }

  /* ---------- Helpers ---------- */
  const initials = (name) =>
    name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  const LINK_LABELS = { email: "Email", website: "Website", scholar: "Scholar", orcid: "ORCID", linkedin: "LinkedIn", github: "GitHub", doi: "DOI", arxiv: "arXiv", pdf: "PDF" };
  const linkRow = (obj) => {
    const items = Object.entries(obj || {}).filter(([, v]) => v).map(([k, v]) => {
      let href = v;
      if (k === "email") href = "mailto:" + v;
      if (k === "doi" && !/^https?:/.test(v)) href = "https://doi.org/" + v;
      if (k === "arxiv" && !/^https?:/.test(v)) href = "https://arxiv.org/abs/" + v;
      const ext = k === "email" ? "" : ' target="_blank" rel="noopener"';
      return `<a href="${esc(href)}"${ext}>${LINK_LABELS[k] || esc(k)}</a>`;
    });
    return items.length ? `<div class="links">${items.join("")}</div>` : "";
  };
  const avatar = (m) => m.photo
    ? `<img class="avatar" src="${esc(m.photo)}" alt="Photo of ${esc(m.name)}" loading="lazy">`
    : `<div class="avatar" aria-hidden="true">${esc(initials(m.name))}</div>`;

  /* ---------- Members page ---------- */
  const membersEl = $("#members");
  if (membersEl && typeof MEMBERS !== "undefined") {
    const groups = [
      ["pi", "Principal Investigator"],
      ["postdoc", "Postdoctoral Researchers"],
      ["phd", "PhD Researchers"],
      ["masters", "MSc & Project Students"],
      ["visitor", "Visiting Researchers"],
    ];
    let html = "";
    for (const [cat, label] of groups) {
      const people = MEMBERS.filter((m) => m.category === cat);
      if (!people.length) continue;
      html += `<h2 class="group-title">${label}</h2>`;
      if (cat === "pi") {
        html += people.map((m) => `
          <article class="card member pi-card">
            ${avatar(m)}
            <div>
              <h3>${esc(m.name)}</h3>
              <div class="role">${esc(m.role)}</div>
              <p>${esc(m.bio)}</p>
              ${linkRow(m.links)}
            </div>
          </article>`).join("");
      } else {
        html += `<div class="grid grid-3">` + people.map((m) => `
          <article class="card member">
            ${avatar(m)}
            <h3>${esc(m.name)}</h3>
            <div class="role">${esc(m.role)}</div>
            <p>${esc(m.bio)}</p>
            ${linkRow(m.links)}
          </article>`).join("") + `</div>`;
      }
    }
    const alumni = MEMBERS.filter((m) => m.category === "alumni");
    if (alumni.length) {
      html += `<h2 class="group-title">Alumni</h2><ul class="alumni-list">` +
        alumni.map((m) => `<li><strong>${esc(m.name)}</strong> — ${esc(m.role)}${m.now ? `, <span class="muted">${esc(m.now)}</span>` : ""}</li>`).join("") +
        `</ul>`;
    }
    membersEl.innerHTML = html;
  }

  /* ---------- Collaborators page ---------- */
  const collabEl = $("#collaborators");
  if (collabEl && typeof COLLABORATORS !== "undefined") {
    const TYPE_LABEL = { academic: "Academic", industry: "Industry", facility: "Facilities & Labs" };
    const filterBar = $("#collab-filters");
    const render = (type) => {
      const list = COLLABORATORS.filter((c) => type === "all" || c.type === type);
      collabEl.innerHTML = list.map((c) => {
        const mono = initials(c.institution || c.name);
        const logo = c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.institution)} logo">` : `<span class="mono">${esc(mono)}</span>`;
        const title = c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name);
        return `
          <article class="card collab">
            <div class="logo">${logo}</div>
            <span class="tag" style="align-self:flex-start">${TYPE_LABEL[c.type] || esc(c.type)}</span>
            <h3>${title}</h3>
            <div class="inst">${esc(c.institution)}</div>
            <div class="loc">${esc(c.location)}</div>
            <p>${esc(c.area)}</p>
          </article>`;
      }).join("") || `<p class="muted">No collaborators in this category yet.</p>`;
    };
    if (filterBar) {
      const types = ["all", ...new Set(COLLABORATORS.map((c) => c.type))];
      filterBar.innerHTML = types.map((t, i) =>
        `<button class="chip" type="button" data-type="${t}" aria-pressed="${i === 0}">${t === "all" ? "All" : TYPE_LABEL[t] || t}</button>`).join("");
      filterBar.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        filterBar.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        render(b.dataset.type);
      });
    }
    render("all");
    const fundEl = $("#funders");
    if (fundEl && typeof FUNDERS !== "undefined") {
      fundEl.innerHTML = FUNDERS.map((f) => `<a class="card" href="${esc(f.url)}" target="_blank" rel="noopener" style="text-align:center;font-weight:600">${esc(f.name)}</a>`).join("");
    }
  }

  /* ---------- Publications page ---------- */
  const pubEl = $("#publications");
  if (pubEl && typeof PUBLICATIONS !== "undefined") {
    const surnames = (typeof MEMBERS !== "undefined" ? MEMBERS : [])
      .map((m) => m.name.split(/\s+/).pop()).filter((s) => s && s.length > 2);
    const boldMembers = (authors) => {
      let out = esc(authors);
      surnames.forEach((s) => { out = out.replace(new RegExp(`([^,]*\\b${s}\\b)`, "g"), "<strong>$1</strong>"); });
      return out;
    };
    const search = $("#pub-search"), typeSel = $("#pub-type"), count = $("#pub-count");
    const render = () => {
      const q = (search?.value || "").toLowerCase().trim();
      const t = typeSel?.value || "all";
      const list = PUBLICATIONS
        .filter((p) => t === "all" || p.type === t)
        .filter((p) => !q || [p.title, p.authors, p.venue, p.year].join(" ").toLowerCase().includes(q))
        .sort((a, b) => b.year - a.year);
      if (count) count.textContent = `${list.length} publication${list.length === 1 ? "" : "s"}`;
      let html = "", lastYear = null;
      for (const p of list) {
        if (p.year !== lastYear) { html += `<h2 class="pub-year">${p.year}</h2>`; lastYear = p.year; }
        html += `
          <article class="pub">
            <div class="title">${esc(p.title)}</div>
            <div class="authors">${boldMembers(p.authors)}</div>
            <div class="venue">${esc(p.venue)}</div>
            ${linkRow({ doi: p.doi, arxiv: p.arxiv, pdf: p.pdf })}
          </article>`;
      }
      pubEl.innerHTML = html || `<p class="muted">No publications match your search.</p>`;
    };
    search?.addEventListener("input", render);
    typeSel?.addEventListener("change", render);
    render();
  }

  /* ---------- News (home page) ---------- */
  const newsEl = $("#news");
  if (newsEl && typeof NEWS !== "undefined") {
    const limit = Number(newsEl.dataset.limit || 99);
    newsEl.innerHTML = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit).map((n) => {
      const d = new Date(n.date + "T00:00:00");
      const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      return `<div class="news-item"><time datetime="${esc(n.date)}">${label}</time><div>${esc(n.text)}</div></div>`;
    }).join("");
  }

  /* ---------- Positions (join page) ---------- */
  const posEl = $("#positions");
  if (posEl && typeof POSITIONS !== "undefined") {
    posEl.innerHTML = POSITIONS.map((p) => `
      <article class="card">
        <span class="tag">${esc(p.status)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="muted">${esc(p.text)}</p>
      </article>`).join("");
  }

  /* ---------- Home stats (auto-counted) ---------- */
  const statEl = (id, n) => { const el = $(id); if (el) el.textContent = n; };
  if (typeof MEMBERS !== "undefined") statEl("#stat-members", MEMBERS.filter((m) => m.category !== "alumni").length);
  if (typeof COLLABORATORS !== "undefined") statEl("#stat-collabs", COLLABORATORS.length);
  if (typeof PUBLICATIONS !== "undefined") statEl("#stat-pubs", PUBLICATIONS.length);
})();
