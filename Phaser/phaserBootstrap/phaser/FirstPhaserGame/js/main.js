"use strict";

var game = new Phaser.Game(800, 900, Phaser.AUTO);

game.state.add("MainMenu", MainMenu);
game.state.add("Play", Play);
game.state.add("GameOver", GameOver);
game.state.start("MainMenu");