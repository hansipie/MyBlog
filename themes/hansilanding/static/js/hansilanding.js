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

    function normalize(str) {
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "");
    }

    var rules = [
      {
        keywords: ["ecotoken"],
        response: "ecotokens : outil Rust open source de réduction de contexte et d'analyse pour workflows LLM (CLI, recherche de code, économie de tokens). github.com/hansipie/ecotokens"
      },
      {
        keywords: ["papimathic"],
        response: "Papimathic : application éducative de calcul mental en React Native / Expo, disponible en usage réel sur le Play Store. papimathic.ansicode.fr"
      },
      {
        keywords: ["hermes vaultwarden", "vaultwarden", "bitwarden", "secret"],
        response: "Hermes Vaultwarden : plugin Hermes Agent qui charge les secrets d'un coffre Vaultwarden ou Bitwarden via le CLI bw. github.com/hansipie/hermes-vaultwarden"
      },
      {
        keywords: ["caps"],
        response: "Caps : dossier de modernisation applicative — analyse de l'existant, trajectoire technique, réduction du risque."
      },
      {
        keywords: ["projet", "portfolio", "realisation"],
        response: "Projets actifs : ecotokens (CLI Rust/LLM), Papimathic (app mobile calcul mental), Hermes Vaultwarden (gestion de secrets), Caps (modernisation applicative)."
      },
      {
        keywords: ["stack", "techno", "langage", "competence", "c++", "rust", "llm", "ia", "intelligence artificielle", "agent", "docker", "react native", "mobile", "notebooklm", "rag"],
        response: "Stack principale : C/C++ bas niveau, réseau, LLM & agents (Claude/Codex, ClaudeCode/Hermes), React Native/Expo, Rust, Docker."
      },
      {
        keywords: ["mission", "audit", "spike", "cadrage", "disponib", "tarif", "budget", "devis", "freelance"],
        response: "Disponible pour missions ciblées : spike technique, audit, modernisation, architecture, ou accompagnement de build produit. Cadrage court avec livrable vérifiable."
      },
      {
        keywords: ["experience", "parcours", "cv", "dassault", "2sb"],
        response: "17 ans d'expérience : 6 ans C/C++ & réseau chez 2SB, 11 ans Lead Dev chez Dassault Systèmes, puis freelance IA appliquée et modernisation depuis 2026."
      },
      {
        keywords: ["blog", "article"],
        response: "Deux blogs : Ansicode (articles techniques IA, LLM, open source) et Papimathic (contenus pédagogiques calcul mental)."
      },
      {
        keywords: ["contact", "email", "mail", "linkedin", "github", "twitter", " x "],
        response: "Contact : ansicode@ansicode.fr, LinkedIn, GitHub et X — liens dans la section Contact."
      },
      {
        keywords: ["bonjour", "salut", "hello", "hi", "coucou"],
        response: "Bonjour ! Posez-moi une question sur le profil, les projets, la stack ou une mission."
      },
      {
        keywords: ["merci"],
        response: "Avec plaisir !"
      }
    ];

    var fallback = "Je peux répondre sur : projets (ecotokens, Papimathic, Hermes Vaultwarden, Caps), stack technique, expérience, missions ou contact.";

    function findAnswer(text) {
      var normalized = normalize(text);
      for (var i = 0; i < rules.length; i++) {
        var keywords = rules[i].keywords;
        for (var j = 0; j < keywords.length; j++) {
          if (normalized.indexOf(keywords[j]) !== -1) return rules[i].response;
        }
      }
      return fallback;
    }

    if (form && input && body) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var text = input.value.trim();
        if (!text) return;
        var userMsg = document.createElement("div");
        userMsg.className = "pf-message pf-message-user";
        userMsg.textContent = text;
        body.appendChild(userMsg);
        var botMsg = document.createElement("div");
        botMsg.className = "pf-message pf-message-bot";
        botMsg.textContent = findAnswer(text);
        body.appendChild(botMsg);
        input.value = "";
        body.scrollTop = body.scrollHeight;
      });
    }
  }

  /* --- Mobile menu (hamburger) --- */
  function initMobileMenu() {
    var btn = document.getElementById("mobileMenuBtn");
    var menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    function setOpen(open) {
      menu.classList.toggle("pf-mobile-menu-open", open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!menu.classList.contains("pf-mobile-menu-open"));
    });

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        setOpen(false);
      }
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) setOpen(false);
    }, { passive: true });
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
