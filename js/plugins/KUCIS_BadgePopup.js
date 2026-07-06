/*:
 * @target MZ
 * @plugindesc Shows a centered badge popup above the game screen.
 *
 * @command show
 * @text Show Badge Popup
 *
 * @arg filename
 * @type string
 * @default prompt_badge.png
 *
 * @arg duration
 * @type number
 * @default 0
 *
 * @arg caption
 * @type string
 * @default 뱃지를 획득했습니다
 */

(() => {
  const PLUGIN_NAME = "KUCIS_BadgePopup";
  let active = false;

  function themeFor(filename) {
    const themes = {
      "fishing_badge.png": {
        glow: "56, 189, 248",
        border: "125, 211, 252",
        text: "#e0f2fe"
      },
      "privacy_badge.png": {
        glow: "251, 191, 36",
        border: "253, 224, 71",
        text: "#fef3c7"
      },
      "prompt_badge.png": {
        glow: "168, 85, 247",
        border: "216, 180, 254",
        text: "#f3e8ff"
      },
      "metadata_badge.png": {
        glow: "34, 197, 94",
        border: "134, 239, 172",
        text: "#dcfce7"
      },
      "pwnable_badge.png": {
        glow: "239, 68, 68",
        border: "252, 165, 165",
        text: "#fee2e2"
      },
      "log_badge.png": {
        glow: "249, 115, 22",
        border: "253, 186, 116",
        text: "#ffedd5"
      }
    };
    return themes[filename] || themes["fishing_badge.png"];
  }

  function close(root) {
    active = false;
    if (root && root.parentNode) root.remove();
  }

  function showBadge(args) {
    if (active) {
      const old = document.getElementById("kucis-badge-popup");
      if (old) old.remove();
    }
    active = true;

    const filename = args.filename || "prompt_badge.png";
    const duration = Number(args.duration || 0);
    const caption = args.caption || "뱃지를 획득했습니다";
    const theme = themeFor(filename);

    const root = document.createElement("div");
    root.id = "kucis-badge-popup";
    Object.assign(root.style, {
      position: "fixed",
      inset: "0",
      zIndex: "1200",
      display: "block",
      pointerEvents: "none"
    });

    const panel = document.createElement("div");
    Object.assign(panel.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(0.88)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "18px",
      opacity: "0",
      transition: "opacity 180ms ease, transform 180ms ease"
    });

    const img = document.createElement("img");
    img.src = `img/pictures/${filename}`;
    Object.assign(img.style, {
      width: "360px",
      height: "360px",
      objectFit: "contain",
      filter: `drop-shadow(0 0 26px rgba(${theme.glow}, 0.72))`
    });

    const text = document.createElement("div");
    text.textContent = caption;
    Object.assign(text.style, {
      minWidth: "520px",
      padding: "16px 28px",
      border: `1px solid rgba(${theme.border}, 0.75)`,
      borderRadius: "12px",
      background: "rgba(8, 18, 40, 0.92)",
      boxShadow: `0 0 24px rgba(${theme.glow}, 0.28)`,
      color: theme.text,
      fontFamily: "Malgun Gothic, Apple SD Gothic Neo, sans-serif",
      fontSize: "30px",
      fontWeight: "800",
      textAlign: "center"
    });

    panel.appendChild(img);
    panel.appendChild(text);
    root.appendChild(panel);
    document.body.appendChild(root);
    requestAnimationFrame(() => {
      panel.style.opacity = "1";
      panel.style.transform = "translate(-50%, -50%) scale(1)";
    });
    if (duration > 0) {
      setTimeout(() => close(root), duration);
    }
  }

  window.KUCISBadgePopup = {
    isActive() {
      return active;
    },
    close() {
      const root = document.getElementById("kucis-badge-popup");
      if (root) close(root);
    }
  };

  PluginManager.registerCommand(PLUGIN_NAME, "show", function(args) {
    showBadge(args);
  });
})();
