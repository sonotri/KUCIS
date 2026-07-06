/*:
 * @target MZ
 * @plugindesc Fits the game canvas to the browser window while preserving aspect ratio.
 * @author KUCIS
 *
 * @help
 * Enables RPG Maker's stretch mode on web browsers so the 1280x720 game
 * screen fills the available viewport as much as possible.
 */

(() => {
  const fitWindow = () => {
    if (typeof Graphics !== "undefined") {
      Graphics._stretchEnabled = true;
      Graphics._updateAllElements();
    }
  };

  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    fitWindow();
  };

  window.addEventListener("resize", fitWindow);
})();
