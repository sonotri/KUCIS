/*:
 * @target MZ
 * @plugindesc Allows free movement on the parallax-mapped hub map.
 * @author Codex
 *
 * @help
 * This project uses a full-image parallax background for Map001.
 * Empty map tiles are normally not passable in RPG Maker MZ, so this
 * plugin allows movement on Map001 while keeping event collisions intact.
 * Paint Region 1 or Region 2 on Map001 to mark blocked tiles.
 */

(() => {
  const HUB_MAP_ID = 1;
  const BLOCKED_REGION_IDS = [1, 2];
  const _Game_Map_checkPassage = Game_Map.prototype.checkPassage;

  Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (this.mapId() === HUB_MAP_ID) {
      return !BLOCKED_REGION_IDS.includes(this.regionId(x, y));
    }
    return _Game_Map_checkPassage.call(this, x, y, bit);
  };
})();
