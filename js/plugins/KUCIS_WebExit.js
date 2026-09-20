/*:
 * @target MZ
 * @plugindesc Closes the browser tab, or shows a finished screen when closing is blocked.
 */

(() => {
  function showFinishedScreen() {
    try {
      AudioManager.stopAll();
    } catch (error) {
      // Ignore shutdown errors.
    }

    document.body.innerHTML = "";
    Object.assign(document.body.style, {
      margin: "0",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "#05070f",
      color: "#ffffff",
      fontFamily: "Malgun Gothic, Apple SD Gothic Neo, sans-serif"
    });

    const root = document.createElement("main");
    Object.assign(root.style, {
      display: "grid",
      placeItems: "center",
      width: "100vw",
      height: "100vh",
      textAlign: "center"
    });

    const message = document.createElement("div");
    message.textContent = "게임이 종료되었습니다.";
    Object.assign(message.style, {
      fontSize: "28px",
      fontWeight: "700",
      letterSpacing: "0"
    });

    root.appendChild(message);
    document.body.appendChild(root);
  }

  SceneManager.exit = function() {
    try {
      window.open("", "_self");
      window.close();
    } catch (error) {
      // Browser may block closing tabs it did not open.
    }

    window.setTimeout(() => {
      if (!window.closed) {
        showFinishedScreen();
      }
    }, 100);

    this._exiting = true;
  };
})();
