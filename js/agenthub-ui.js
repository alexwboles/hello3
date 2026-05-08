(function () {
  const THEME_KEY = "agenthub-theme";

  function applyTheme(theme) {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);

    const toggle = document.getElementById("darkModeToggle");
    if (toggle) {
      toggle.textContent = isDark ? "Switch to Light" : "Switch to Dark";
    }
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    const initial = stored === "dark" ? "dark" : "light";
    applyTheme(initial);

    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const nextTheme = document.documentElement.classList.contains("dark")
        ? "light"
        : "dark";
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
      menu.classList.add("hidden");
    });
  }

  function initDropdowns() {
    document.addEventListener("click", function (event) {
      const trigger = event.target.closest(".dropdown-trigger");

      if (trigger) {
        event.stopPropagation();
        const menu = trigger.parentElement.querySelector(".dropdown-menu");
        const willOpen = menu && menu.classList.contains("hidden");

        closeAllDropdowns();
        if (menu && willOpen) {
          menu.classList.remove("hidden");
        }
        return;
      }

      if (event.target.closest(".dropdown-menu")) {
        return;
      }

      closeAllDropdowns();
    });
  }

  function syncBodyScrollLock() {
    const hasOpenModal = Array.from(document.querySelectorAll(".modal")).some(function (modal) {
      return !modal.classList.contains("hidden");
    });

    document.body.classList.toggle("overflow-hidden", hasOpenModal);
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    syncBodyScrollLock();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    syncBodyScrollLock();
  }

  function initModals() {
    document.addEventListener("click", function (event) {
      const openTrigger = event.target.closest("[data-open-modal]");
      if (openTrigger) {
        const modalId = openTrigger.getAttribute("data-open-modal");
        if (modalId) {
          openModal(modalId);
          closeAllDropdowns();
        }
        return;
      }

      const closeTrigger = event.target.closest("[data-close-modal]");
      if (closeTrigger) {
        const modalId = closeTrigger.getAttribute("data-close-modal");
        if (modalId) {
          closeModal(modalId);
        }
        return;
      }

      const backdrop = event.target.classList.contains("modal") ? event.target : null;
      if (backdrop && backdrop.id) {
        closeModal(backdrop.id);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;

      document.querySelectorAll(".modal").forEach(function (modal) {
        if (!modal.classList.contains("hidden")) {
          closeModal(modal.id);
        }
      });
    });
  }

  function initSkillToggles() {
    document.querySelectorAll(".skill-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-target");
        const panel = targetId ? document.getElementById(targetId) : null;
        if (!panel) return;

        const isClosed = panel.classList.contains("max-h-0");

        if (isClosed) {
          panel.classList.remove("max-h-0", "opacity-0");
          panel.classList.add("max-h-48", "opacity-100");
          button.textContent = "Hide Skills";
        } else {
          panel.classList.add("max-h-0", "opacity-0");
          panel.classList.remove("max-h-48", "opacity-100");
          button.textContent = "Show Skills";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initDropdowns();
    initModals();
    initSkillToggles();
  });

  window.AgentHubUI = {
    openModal: openModal,
    closeModal: closeModal,
    closeAllDropdowns: closeAllDropdowns
  };
})();
