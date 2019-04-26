var Play = function(game) {};

Play.prototype = {
	init: function(){
		// Necessary variables
		this.score = 0;
		this.numStars = 12;
		this.PLAYERSPEED = 250;
		this.PLAYERJUMP = -450;
		this.player;
		console.log(this);   // why do these two lines
		console.log(Play);   // log totally different things

		// Make audio players

	},
	create: function() {
		
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		
		// Place background and make it fit new aspect ratio
		var sky = game.add.sprite(0, 0, 'sky');
		sky.scale.setTo(1, 1.5);
		
		// Make platform group and enable physics for them
		platforms = game.add.group();
		platforms.enableBody = true;
		
		// Make, scale, and set ground as immovable
		var ground = platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		
		// Make stars and set their physics
		// stars = game.add.group();
		// stars.enableBody = true;
		// for (var i = 0; i < 12; i++)
		// {
		//  //  Make stars
		//  var star = stars.create(i * 70, 0, 'star');
			
		// 	Set physics
		//     star.body.gravity.y = 300;
		//     star.body.bounce.y = 0.7 + Math.random() * 0.2;
		//  }

		this.player = game.add.sprite(32, game.world.height - 150, 'dude');
		game.physics.arcade.enable(this.player);
	    this.player.body.gravity.y = 375;
	    this.player.body.collideWorldBounds = true;

	    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		// Make score text in top left
		// scoreText = game.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#ACE' });
		
		// Make controller
		cursors = game.input.keyboard.createCursorKeys();

		// Make wheather
		for (var i = 0; i < 100; i++){
			blackHole = new Weather(game, 'hole', Math.random() * 0.75+ 0.5, Math.random() * 100 + 50, -(Math.random() * 150 + 50));
		}
	},

	update: function() {
		// run game loop
		this.player.body.velocity.x = 0;

		// Check collisions
		var hitPlatform = game.physics.arcade.collide(this.player, platforms);

	    if (cursors.left.isDown)
	    {
	        // Move left if pressing left
	        this.player.body.velocity.x = -this.PLAYERSPEED;  // Set horizontal velocity (higher than in tutorial)

	        this.player.animations.play('left'); // Play animation
	    }
	    else if (cursors.right.isDown)
	    {
	        // Move right if pressing right
	        this.player.body.velocity.x = this.PLAYERSPEED;

	        this.player.animations.play('right');
	    }
	    else
	    {
	        // Idle animation
	        this.player.animations.stop();

	        this.player.frame = 4;
	    }
	    if (cursors.up.isDown && this.player.body.touching.down && hitPlatform)
	    {
	        this.player.body.velocity.y = this.PLAYERJUMP; // Set vertical velocity (higher than in tutorial)
	    }
	}
}

function collectStar (player, star) {	    
    
}

game.state.add("Play", Play);