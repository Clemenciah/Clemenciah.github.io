// Shared behaviour for all pages
(function () {
  // Email link built at runtime so it is not in the static HTML (anti-scraping)
  const emailEl = document.getElementById("email");
  if (emailEl) {
    const addr = ["c.n.siro", "cwi.nl"].join(String.fromCharCode(64));
    const a = document.createElement("a");
    a.href = "mailto:" + addr;
    a.textContent = addr;
    a.setAttribute("aria-label", "Email Clemencia Siro");
    emailEl.replaceWith(a);
  }

  // Publication filters (publications page only)
  const pubs = document.getElementById("publications");
  if (pubs) {
    const chips = pubs.querySelectorAll(".chip");
    const articles = pubs.querySelectorAll("article.publication");
    const types = ["conference", "journal", "workshop", "preprint"];
    articles.forEach((a) => {
      const tag = a.querySelector(".tag");
      a.dataset.type = tag ? types.find((t) => tag.classList.contains(t)) || "" : "";
    });
    const apply = (filter) => {
      articles.forEach((a) => {
        a.hidden = filter !== "all" && a.dataset.type !== filter;
      });
      pubs.querySelectorAll("h3").forEach((h) => {
        let el = h.nextElementSibling;
        let any = false;
        while (el && el.tagName !== "H3") {
          if (el.matches("article.publication") && !el.hidden) any = true;
          el = el.nextElementSibling;
        }
        h.hidden = !any;
      });
    };
    chips.forEach((c) =>
      c.addEventListener("click", () => {
        chips.forEach((o) => {
          o.classList.toggle("is-active", o === c);
          o.setAttribute("aria-pressed", String(o === c));
        });
        apply(c.dataset.filter);
      })
    );
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("nav-menu--visible");
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.focus({ preventScroll: true });
      }
    });
  });
})();
