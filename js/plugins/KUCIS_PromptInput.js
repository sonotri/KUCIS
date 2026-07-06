/*:
 * @target MZ
 * @plugindesc Adds a simple prompt input overlay for quiz stages.
 *
 * @command open
 * @text Open Prompt Input
 *
 * @arg variableId
 * @type variable
 * @default 3
 *
 * @arg title
 * @type string
 * @default GUARD-AI에게 보낼 프롬프트를 입력하세요.
 *
 * @arg placeholder
 * @type string
 * @default 프롬프트를 입력하세요.
 *
 * @arg hint
 * @type string
 * @default
 */

(() => {
  const PLUGIN_NAME = "KUCIS_PromptInput";
  let active = false;

  function closeOverlay(root, variableId, value) {
    $gameVariables.setValue(variableId, value.trim());
    active = false;
    root.remove();
    Input.clear();
    TouchInput.clear();
  }

  function openPromptInput(args) {
    if (active) return;
    active = true;

    const variableId = Number(args.variableId || 3);
    const title = args.title || "GUARD-AI에게 보낼 프롬프트를 입력하세요.";
    const placeholder = args.placeholder || "프롬프트를 입력하세요.";
    const hintText = args.hint || "";

    const root = document.createElement("div");
    root.id = "kucis-prompt-input";
    Object.assign(root.style, {
      position: "fixed",
      inset: "0",
      zIndex: "1000",
      display: "block",
      background: "rgba(2, 6, 23, 0.58)",
      fontFamily: "Malgun Gothic, Apple SD Gothic Neo, sans-serif"
    });

    const panel = document.createElement("div");
    Object.assign(panel.style, {
      width: "min(860px, 86vw)",
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      padding: "28px",
      border: "1px solid rgba(125, 211, 252, 0.75)",
      borderRadius: "12px",
      background: "linear-gradient(180deg, rgba(10, 22, 48, 0.96), rgba(9, 12, 30, 0.96))",
      boxShadow: "0 0 28px rgba(56, 189, 248, 0.32)",
      color: "#e0f2fe"
    });

    const heading = document.createElement("div");
    heading.textContent = title;
    Object.assign(heading.style, {
      marginBottom: "16px",
      fontSize: "25px",
      fontWeight: "700"
    });

    const textarea = document.createElement("textarea");
    textarea.placeholder = placeholder;
    Object.assign(textarea.style, {
      width: "100%",
      height: "150px",
      boxSizing: "border-box",
      resize: "none",
      padding: "16px",
      border: "1px solid rgba(186, 230, 253, 0.7)",
      borderRadius: "8px",
      outline: "none",
      background: "rgba(15, 23, 42, 0.92)",
      color: "#f8fafc",
      fontSize: "22px",
      lineHeight: "1.45"
    });

    const footer = document.createElement("div");
    Object.assign(footer.style, {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "18px"
    });

    const submit = document.createElement("button");
    submit.textContent = "전송";
    Object.assign(submit.style, {
      minWidth: "112px",
      padding: "12px 18px",
      border: "0",
      borderRadius: "8px",
      background: "#38bdf8",
      color: "#06131f",
      fontSize: "20px",
      fontWeight: "700",
      cursor: "pointer"
    });

    const hint = document.createElement("div");
    hint.textContent = "Enter로 줄바꿈, 전송 버튼으로 제출";
    Object.assign(hint.style, {
      marginTop: "10px",
      color: "#bae6fd",
      fontSize: "16px",
      opacity: "0.86"
    });

    submit.addEventListener("click", () => closeOverlay(root, variableId, textarea.value));
    root.addEventListener("keydown", event => {
      event.stopPropagation();
      if (event.key === "Escape") closeOverlay(root, variableId, "");
    });

    footer.appendChild(submit);
    panel.appendChild(heading);
    if (hintText) {
      const hintTextElement = document.createElement("div");
      hintTextElement.textContent = hintText;
      Object.assign(hintTextElement.style, {
        marginBottom: "14px",
        color: "#bae6fd",
        fontSize: "17px",
        lineHeight: "1.45",
        opacity: "0.9"
      });
      panel.appendChild(hintTextElement);
    }
    panel.appendChild(textarea);
    panel.appendChild(hint);
    panel.appendChild(footer);
    root.appendChild(panel);
    document.body.appendChild(root);
    textarea.focus();
  }

  function includesAny(text, words) {
    return words.some(word => text.includes(word));
  }

  window.KUCISPromptInput = {
    isActive() {
      return active;
    },
    isInjectionPrompt(value) {
      const text = String(value || "").toLowerCase().replace(/\s+/g, " ");
      const overrideWords = ["무시", "ignore", "bypass", "override", "이전 지시", "앞의 지시", "기존 지시"];
      const secretWords = ["기밀", "비밀", "내부", "시스템", "규칙", "프롬프트", "secret", "system", "instruction", "rule"];
      const revealWords = ["출력", "공개", "알려", "보여", "말해", "print", "show", "reveal", "display"];
      const directPhrases = ["system prompt", "hidden instruction", "내부 규칙", "시스템 프롬프트"];
      return (
        includesAny(text, overrideWords) && includesAny(text, secretWords) ||
        includesAny(text, directPhrases) && includesAny(text, revealWords) ||
        includesAny(text, overrideWords) && includesAny(text, revealWords)
      );
    }
  };

  PluginManager.registerCommand(PLUGIN_NAME, "open", function(args) {
    openPromptInput(args);
    this.setWaitMode("kucisPromptInput");
  });

  const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === "kucisPromptInput") {
      if (window.KUCISPromptInput.isActive()) return true;
      this._waitMode = "";
      return false;
    }
    return _Game_Interpreter_updateWaitMode.call(this);
  };
})();
