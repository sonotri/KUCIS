/*:
 * @target MZ
 * @plugindesc Starts the game directly on the map instead of showing the title screen.
 * @author KUCIS
 *
 * @help
 * Skips the RPG Maker title/splash flow and immediately starts a new game.
 */

(() => {
  Scene_Boot.prototype.startNormalGame = function() {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  };
})();
