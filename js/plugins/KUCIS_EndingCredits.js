/*:
 * @target MZ
 * @plugindesc Opens the guardian form and shows the final scrolling credits.
 *
 * @command openForm
 * @text Open Guardian Form
 *
 * @arg url
 * @type string
 * @default https://docs.google.com/forms/d/e/1FAIpQLSeLQDkvYHOHolc2v93UQbnC_mGtwstnSfp9y1Zhhur5eZR29g/viewform?usp=sharing&ouid=107835637981268863450
 *
 * @command startCredits
 * @text Start Ending Credits
 */

(() => {
  const PLUGIN_NAME = "KUCIS_EndingCredits";
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeLQDkvYHOHolc2v93UQbnC_mGtwstnSfp9y1Zhhur5eZR29g/viewform?usp=sharing&ouid=107835637981268863450";
  let active = false;

  const text = (...codes) => String.fromCharCode(...codes);

  const lines = [
    text(50724, 45720, 32, 48176, 50868, 32, 51089, 51008, 32, 49892, 52380, 46308, 51060),
    text(45208, 50752, 32, 52828, 44396, 46308, 51012, 32, 51648, 53412, 45716, 32, 44053, 54620, 32, 47560, 48277, 51060, 32, 46121, 45768, 45796, 46),
    "",
    text(55, 50900, 32, 56, 51068, 32, 51221, 48372, 48372, 54840, 51032, 32, 45216, 44),
    text(50864, 47532, 32, 47784, 46160, 32, 50504, 51204, 54620, 32, 46356, 51648, 53560, 32, 49464, 49345, 51012, 32, 47564, 46308, 50612, 44032, 50836, 33),
    "",
    "",
    "KUCIS(" + text(45824, 54617, 51221, 48372, 48372, 54840, 32, 46041, 50500, 47532) + ") x SWING",
    "",
    "[Made by]",
    "",
    "sonotri",
    "Yebbi",
    "bage2room",
    "y00nsssu",
    "2seoyg",
    "",
    "[" + text(49324, 51060, 48260, 32, 49688, 54840, 51088) + "]",
    "(" + text(52628, 54980, 32, 44277, 44060) + ")",
    "",
    "Thank You"
  ];

  function closeCredits(root) {
    active = false;
    if (root && root.parentNode) root.remove();
  }

  function goToTitle(root) {
    closeCredits(root);
    if (SceneManager && Scene_Title) {
      SceneManager.goto(Scene_Title);
    }
  }

  function startCredits() {
    if (active) return;
    active = true;

    const root = document.createElement("div");
    root.id = "kucis-ending-credits";
    Object.assign(root.style, {
      position: "fixed",
      inset: "0",
      zIndex: "1300",
      overflow: "hidden",
      background: "rgba(0, 0, 0, 0.45)",
      color: "#ffffff",
      fontFamily: "Malgun Gothic, Apple SD Gothic Neo, sans-serif",
      pointerEvents: "auto"
    });

    const credits = document.createElement("div");
    for (const line of lines) {
      const item = document.createElement("div");
      if (line) {
        item.textContent = line;
      } else {
        item.className = "spacer";
      }
      credits.appendChild(item);
    }

    Object.assign(credits.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "min(920px, 90vw)",
      transform: "translateX(-50%)",
      textAlign: "center",
      fontSize: "30px",
      lineHeight: "1.85",
      fontWeight: "700",
      letterSpacing: "0",
      textShadow: "0 4px 16px rgba(0,0,0,0.95)"
    });

    const button = document.createElement("button");
    button.textContent = text(44172, 51076, 32, 51333, 47308, 54616, 44592);
    Object.assign(button.style, {
      position: "fixed",
      left: "50%",
      bottom: "46px",
      transform: "translateX(-50%)",
      zIndex: "1302",
      display: "none",
      padding: "14px 30px",
      border: "1px solid rgba(255,255,255,0.78)",
      borderRadius: "6px",
      background: "rgba(15,23,42,0.92)",
      color: "#ffffff",
      fontFamily: "Malgun Gothic, Apple SD Gothic Neo, sans-serif",
      fontSize: "20px",
      fontWeight: "700",
      cursor: "pointer"
    });

    const style = document.createElement("style");
    style.textContent = `
      #kucis-ending-credits .spacer { height: 34px; }
      @keyframes kucisCreditsScroll {
        from { top: 50%; }
        to { top: -118%; }
      }
    `;

    button.addEventListener("click", () => goToTitle(root));

    root.appendChild(style);
    root.appendChild(credits);
    root.appendChild(button);
    document.body.appendChild(root);
    credits.style.animation = "kucisCreditsScroll 34s linear forwards";
    credits.addEventListener("animationend", () => {
      button.style.display = "block";
    });
  }

  window.KUCISEndingCredits = {
    start: startCredits,
    isActive() {
      return active;
    }
  };

  PluginManager.registerCommand(PLUGIN_NAME, "openForm", function(args) {
    const url = args.url || FORM_URL;
    window.open(url, "_blank", "noopener");
  });

  PluginManager.registerCommand(PLUGIN_NAME, "startCredits", function() {
    startCredits();
    this.setWaitMode("kucisEndingCredits");
  });

  const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === "kucisEndingCredits") {
      if (window.KUCISEndingCredits.isActive()) return true;
      this._waitMode = "";
      return false;
    }
    return _Game_Interpreter_updateWaitMode.call(this);
  };
})();
