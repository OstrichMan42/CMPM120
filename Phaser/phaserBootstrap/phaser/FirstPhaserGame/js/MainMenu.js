var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log("loaded main menu");
		// preload assets
		game.load.image('sky', 'assets/img/sky.png');
	    game.load.image('ground', 'assets/img/platform.png');
	    game.load.image('star', 'assets/img/star.png');
	    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
		game.load.spritesheet('baddie', 'assets/img/baddie.png', 32, 32);
		game.load.image('diamond', 'assets/img/diamond.png');
		game.load.image('hole', 'assets/img/BlackHole.jpg');
		game.load.audio('collectS', 'assets/audio/CollectStar.mp3');
		game.load.audio('collectD', 'assets/audio/CollectDiamond.mp3');

		console.log("loaded assets");
	},
	create: function() {
		game.stage.backgroundColor = "#0000"
		menuText = game.add.text(game.world.centerX - 140, game.world.centerY, 'Collect the shinies\nUse arrow keys to move\nPress SPACE to begin', { fontSize: '30px', fill: '#ACE', align: 'center'});
		console.log("main menu created");
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start("Play");
		}
	}
}