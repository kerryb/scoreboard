Scoreboard = (function() {
  var _this = {};
  var locked = false;

  _this.bind = function() {
    $(document).bind("keypress", Scoreboard.keypress);
    $(document).bind("buzz", Scoreboard.buzz);
    $(".plus").bind("click", Scoreboard.addPoint);
    $(".minus").bind("click", Scoreboard.subtractPoint);
  };

  _this.keypress = function(event) {
    if (event.which >= 49 && event.which <= 52) {
      $(document).trigger("buzz", {player: event.which - 48});
    } else if (event.which == 32) {
      unlock();
    }
  };

  _this.buzz = function(event, data) {
    if (!locked) {
      lock(data.player);
    }
  };

  _this.addPoint = function() {
    adjustScore($(this).data("index"), 1);
    unlock();
  };

  _this.subtractPoint = function() {
    adjustScore($(this).data("index"), -1);
    unlock();
  };

  function adjustScore(player, amount) {
    score = $("#score-" + player);
    score.text(parseInt(score.text()) + amount);
  }

  function lock(player) {
    locked = true;
    $(".player").addClass("disabled");
    $("#player-" + player).removeClass("disabled");
  }

  function unlock() {
    locked = false;
    $(".player").removeClass("disabled");
  }

  return _this;
}).call($);


$(function() {
  Scoreboard.bind();
});
