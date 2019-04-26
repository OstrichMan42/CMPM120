"use strict";

var game = new Phaser.Game(700, 700, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
		// preload assets
		game.load.image('sky', 'assets/img/sky.png');
	    game.load.image('ground', 'assets/img/platform.png');
		game.load.image('hole', 'assets/img/BlackHole.jpg');
	    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
	    //game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		//game.load.audio('collectD', 'assets/audio/CollectDiamond.mp3');

		console.log("loaded assets");
	},
	create: function() {
		game.stage.backgroundColor = "#0000"
		var menuText = game.add.text(game.world.centerX - 140, game.world.centerY, 'Endless runner,\nPress Space', { fontSize: '30px', fill: '#ACE', align: 'center'});
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}

game.state.add("MainMenu", MainMenu);
game.state.start("MainMenu");