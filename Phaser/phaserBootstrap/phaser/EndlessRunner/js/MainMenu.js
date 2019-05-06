"use strict";

var game = new Phaser.Game(800, 450, Phaser.AUTO);

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
		// preload assets
		game.load.image('bg', 'assets/img/Background.png'); // Image from https://www.behance.net/vitaliyvill

		// Couldnt get spritesheet to work with atlas, but the bunny and the backgrounnd are the only two things not on the sheet
	    game.load.spritesheet('Bunny', 'assets/img/Bunny.png', 50, 50);
	    game.load.atlas('runnerSheet', 'assets/img/runnerSpritesheet.png', 'assets/img/sprites.json')

	    game.load.audio('jump', 'assets/audio/Boing.wav')
	    // by user juskiddink on https://freesound.org/s/140867/ Licensed under Creative Commons: By Attribution 3.0 License
		game.load.audio('music', 'assets/audio/Ambler.mp3');
		// "Ambler" Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 3.0 License http://creativecommons.org/licenses/by/3.0/

		console.log("loaded assets");
	},
	create: function() {
		game.stage.backgroundColor = "#5ef9d0"
		var menuText = game.add.text(game.world.centerX - 140, game.world.centerY - 50, 'Endless jumper,\npress up to jump,\navoid birds,\nPress Space to start', { fontSize: '30px', fill: '#000000', align: 'center'});
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