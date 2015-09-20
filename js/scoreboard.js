var Scoreboard = (function() {
  var _this = {};
  var locked = false;
  var buzzer = new Audio("media/buzz.wav");

  _this.init = function() {
    $.each([1, 2, 3, 4], function(_index, player) {
      $($.templates("#playerTemplate").render({player: player})).appendTo("#players");
    });
    $(".name").editable();
    hide_continue_button();
  };

  _this.bind = function() {
    $(document).bind("keypress", Scoreboard.keypress);
    $(document).bind("buzz", Scoreboard.buzz);
    $("#reset-button").bind("click", Scoreboard.reset);
    $(".plus").bind("click", Scoreboard.addPoint);
    $(".minus").bind("click", Scoreboard.subtractPoint);
    $("#continue").bind("click", Scoreboard.unlock);
  };

  _this.keypress = function(event) {
    if (event.which >= 49 && event.which <= 52) {
      $(document).trigger("buzz", {player: event.which - 48});
    } else if (event.which == 32) {
      Scoreboard.unlock();
    }
  };

  _this.buzz = function(event, data) {
    if (!locked) {
      lock(data.player);
      buzzer.play();
    }
  };

  _this.reset = function() {
    $(".score").text(0);
  };

  _this.addPoint = function() {
    this.blur();
    adjustScore($(this).data("index"), 1);
    Scoreboard.unlock();
  };

  _this.subtractPoint = function() {
    this.blur();
    adjustScore($(this).data("index"), -1);
    Scoreboard.unlock();
  };

  _this.unlock = function() {
    locked = false;
    $(".player").removeClass("disabled");
    hide_continue_button();
  };

  function show_continue_button() {
    $("#continue").show();
  }

  function hide_continue_button() {
    $("#continue").hide();
  }

  function adjustScore(player, amount) {
    score = $("#score-" + player);
    score.text(parseInt(score.text()) + amount);
  }

  function lock(player) {
    locked = true;
    $(".player").addClass("disabled");
    $("#player-" + player).removeClass("disabled");
    show_continue_button();
  }

  _this.init();
  return _this;
}).call($);


$(function() {
  Scoreboard.bind();
});
