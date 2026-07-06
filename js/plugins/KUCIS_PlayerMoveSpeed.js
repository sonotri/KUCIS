(() => {
  const HUB_MAP_ID = 1;
  const WALK_SPEED = 3;

  const _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    _Game_Player_refresh.call(this);
    if ($gameMap && $gameMap.mapId() === HUB_MAP_ID) {
      this.setMoveSpeed(WALK_SPEED);
    }
  };

  const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function() {
    _Game_Player_performTransfer.call(this);
    if ($gameMap && $gameMap.mapId() === HUB_MAP_ID) {
      this.setMoveSpeed(WALK_SPEED);
    }
  };
})();
