(function () {
  /* --- Theme init (inlined in <head> pour éviter le flash) --- */
  function applyTheme() {
    try {
      var stored = localStorage.getItem("portfolio-rag.theme");
      var pref = stored === "light" || stored === "dark" ? stored : "system";
      var theme = pref === "system"
        ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
        : pref;
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  /* --- Nav scroll --- */
  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle("pf-nav-scrolled", window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- Theme toggle --- */
  function initThemeToggle() {
    var toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "dark";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("portfolio-rag.theme", next); } catch (e) {}
    });
  }

  /* --- Chat widget --- */
  function initChat() {
    var chatToggle = document.getElementById("chatToggle");
    var chatClose  = document.getElementById("chatClose");
    var chatWidget = document.getElementById("chatWidget");
    var form       = document.getElementById("chatForm");
    var input      = document.getElementById("chatInput");
    var body       = document.getElementById("chatBody");
    if (!chatToggle || !chatWidget) return;

    function setChatOpen(open) {
      chatWidget.classList.toggle("pf-chat-open", open);
      chatWidget.setAttribute("aria-hidden", open ? "false" : "true");
      chatToggle.classList.toggle("pf-chat-bubble-hidden", open);
      chatToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && input) input.focus();
    }

    chatToggle.addEventListener("click", function () {
      setChatOpen(!chatWidget.classList.contains("pf-chat-open"));
    });
    if (chatClose) chatClose.addEventListener("click", function () { setChatOpen(false); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") setChatOpen(false); });

    var answers = [
      "Je peux parler des projets actifs : ecotokens, Papimathic, Mycelium, Caps.",
      "Pour une mission, le bon format est un cadrage court avec livrable vérifiable.",
      "Contact : ansicode@ansicode.fr, LinkedIn, GitHub et X dans la section Contact.",
      "Stack principale : C/C++, LLM, agents, React Native, Rust, Docker."
    ];
    var idx = 0;
    if (form && input && body) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var text = input.value.trim() || "?";
        var userMsg = document.createElement("div");
        userMsg.className = "pf-message pf-message-user";
        userMsg.textContent = text;
        body.appendChild(userMsg);
        var botMsg = document.createElement("div");
        botMsg.className = "pf-message pf-message-bot";
        botMsg.textContent = answers[idx++ % answers.length];
        body.appendChild(botMsg);
        input.value = "";
        body.scrollTop = body.scrollHeight;
      });
    }
  }

  /* --- Mobile menu (hamburger simple) --- */
  function initMobileMenu() {
    var btn = document.getElementById("mobileMenuBtn");
    var menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("pf-mobile-menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("pf-mobile-menu-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Init --- */
  applyTheme();
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initThemeToggle();
    initChat();
    initMobileMenu();
  });
})();
