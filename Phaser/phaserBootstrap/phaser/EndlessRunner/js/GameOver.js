"use strict";

var GameOver = function(game) {};
GameOver.prototype = {
	init: function(score) {
		this.score = score;
		console.log(score);
	},
	preload: function() {
		console.log("loaded game over");
		console.log(this.score);
	},
	create: function() {
		if (this.score > 150){
			// Give the player a nicer color if they do well
			game.stage.backgroundColor = "#21d2ff"
			var gameOverText = game.add.text(game.world.centerX - 150, game.world.centerY - 90, "Game Over\nFinal score: " + this.score + "\nPress the spacebar to retry", { fontSize: '32px', fill: '#62912a', align: 'center'});
		} else {
			game.stage.backgroundColor = "#0000"
			var gameOverText = game.add.text(game.world.centerX - 150, game.world.centerY - 90, "Game Over\nFinal score: " + this.score + "\nPress the spacebar to retry", { fontSize: '32px', fill: '#474f77', align: 'center'});
		}
		console.log("game over created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("GameOver", GameOver);