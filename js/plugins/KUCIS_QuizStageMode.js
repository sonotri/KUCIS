(() => {
  const QUIZ_MAP_IDS = [2, 3, 4, 5, 6, 7, 8, 9];

  function isQuizMap() {
    return $gameMap && QUIZ_MAP_IDS.includes($gameMap.mapId());
  }

  const _Game_Player_isTransparent = Game_Player.prototype.isTransparent;
  Game_Player.prototype.isTransparent = function() {
    return isQuizMap() || _Game_Player_isTransparent.call(this);
  };

  const _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if (isQuizMap()) return false;
    return _Game_Player_canMove.call(this);
  };

  const _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
  Scene_Map.prototype.isMenuEnabled = function() {
    if (isQuizMap()) return false;
    return _Scene_Map_isMenuEnabled.call(this);
  };
})();
