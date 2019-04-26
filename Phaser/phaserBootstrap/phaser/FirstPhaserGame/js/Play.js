var Play = function(game) {};
Play.prototype = {
	init: function(){
		this.score = 0;
		this.numStars = 12;
		this.PLAYERSPEED = 250;
		this.PLAYERJUMP = -450;
		// console.log(this);   // why do these two lines
		// console.log(Play);   // log totally different things

		// Make audio players
		this.starSound = game.add.audio('collectS');
		this.diamondSound = game.add.audio('collectD');
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
		
		// Make baddie group and enable physics for them
		baddies = game.add.group();
		baddies.enableBody = true;
		
		// Make, scale, and set ground as immovable
		var ground = platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
		
		// Make ledges
		var ledge = platforms.create(490, 400, 'ground');
	    ledge.body.immovable = true;

	    ledge = platforms.create(-105, 550, 'ground');
	    ledge.body.immovable = true;
		
		ledge = platforms.create(410, 680, 'ground');
	    ledge.body.immovable = true;
		
		ledge = platforms.create(-180, 250, 'ground');
	    ledge.body.immovable = true;
		
		// Make player and set it's properties
		var player = game.add.sprite(32, game.world.height - 150, 'dude');
		game.physics.arcade.enable(player);
	    player.body.gravity.y = 375;
	    player.body.collideWorldBounds = true;
		
		// Make baddies and set their properties
		baddie1 = game.add.sprite(100, game.world.height - 895, 'baddie');
		game.physics.arcade.enable(baddie1);
		baddie1.body.gravity.y = 90;   // This one bounces slow and long
		baddie1.body.bounce.y = 0.85;
		
		baddie2 = game.add.sprite(240, game.world.height - 490, 'baddie');
		game.physics.arcade.enable(baddie2);
		baddie2.body.gravity.y = 1500;  // This one bounces angrily
		baddie2.body.bounce.y = 0.9999;
		
		// Make diamond at a random location and enable its physics for collision
		diamond = game.add.sprite(225 + Math.random() * 220, 10 + Math.random() * 480, 'diamond');
		game.physics.arcade.enable(diamond);
		
		// Set animations, baddie animations using frames 1,2 and 3,4
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);
		baddie1.animations.add('left', [0, 1], 5, true);
	    baddie2.animations.add('right', [2, 3], 5, true);
		
		// Make stars and set their physics
		stars = game.add.group();
	    stars.enableBody = true;
	    for (var i = 0; i < 12; i++)
	    {
	        //  Make stars
	        var star = stars.create(i * 70, 0, 'star');
			
			// Set physics
	        star.body.gravity.y = 300;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
		
		// Make score text in top left
		scoreText = game.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#ACE' });
		
		// Make controller
		cursors = game.input.keyboard.createCursorKeys();

		// Make 'snow'
		for (var i = 0; i < 100; i++){
			blackHole = new Weather(game, 'hole', Math.random() * 0.75+ 0.5, Math.random() * 100 + 50, Math.random() * 150 + 50);
		}
	},

	update: function() {
		// run game loop
		// Check collisions

	    var hitPlatform = game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);
		game.physics.arcade.collide(baddie1, platforms);
		game.physics.arcade.collide(baddie2, platforms);

		// Check for score changing collisions
	    game.physics.arcade.overlap(player, stars, collectStar, null, this);
		game.physics.arcade.overlap(player, baddie1, getHurt, null, this);
		game.physics.arcade.overlap(player, baddie2, getHurt, null, this);
		game.physics.arcade.overlap(player, diamond, collectDiamond, null, this);

		// Start/stop movement
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown)
	    {
	        // Move left if pressing left
	        player.body.velocity.x = -this.PLAYERSPEED;  // Set horizontal velocity (higher than in tutorial)

	        player.animations.play('left'); // Play animation
	    }
	    else if (cursors.right.isDown)
	    {
	        // Move right if pressing right
	        player.body.velocity.x = this.PLAYERSPEED;

	        player.animations.play('right');
	    }
	    else
	    {
	        // Idle animation
	        player.animations.stop();

	        player.frame = 4;
	    }
	    
	    // Jump if on ground and pressing up
	    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
	    {
	        player.body.velocity.y = this.PLAYERJUMP; // Set vertical velocity (higher than in tutorial)
	    }
		
		// Animate baddies
		baddie1.animations.play('left');
		baddie2.animations.play('right');
		
		// A little bit of fun
		if (player.body.velocity.y > 700) {
			player.body.bounce.y = 1.05;
		}
		else {
			player.body.bounce.y = 0;
		}
	}
}

function collectStar (player, star) {	    
    // Collect star, add score, and play pirated sound
    star.kill();
    this.starSound.play();
	this.score += 10;
	this.numStars--;
	if (this.numStars <= 0) {
		game.state.start("GameOver", true, false, this.score);
	}
    scoreText.text = 'Score: ' + this.score;
}

function collectDiamond (player, diamond) {    
    // Collect diamond and add score
    diamond.kill();
    this.diamondSound.play();

	this.score += 50;
    scoreText.text = 'Score: ' + this.score;
}

function getHurt (player, baddie) {
    // Kill baddie and lose score
    baddie.kill();
	this.score -= 25;
    scoreText.text = 'Score: ' + this.score;
    game.state.start("GameOver", true, false, this.score);
}