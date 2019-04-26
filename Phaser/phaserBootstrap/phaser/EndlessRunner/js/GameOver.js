var GameOver = function(game) {};
GameOver.prototype = {
	init: function(score) {
		this.score = score;
	},
	preload: function() {
		console.log("loaded game over");
	},
	create: function() {
		game.stage.backgroundColor = "#0000"
		gameOverText = game.add.text(game.world.centerX - 140, game.world.centerY, "Game Over\nFinal score: " + this.score + "\nPress the spacebar to retry", { fontSize: '32px', fill: '#ACE', align: 'center'});
		console.log("game over created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("GameOver", GameOver);