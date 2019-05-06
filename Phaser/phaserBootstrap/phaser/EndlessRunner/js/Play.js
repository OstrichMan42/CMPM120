"use strict";

var time;

var Play = function(game) {};

Play.prototype = {
	init: function(){
		// Necessary variables
		this.score = 0;
		this.numStars = 12;
		this.PLAYERSPEED = 100;
		this.PLAYERJUMP = -350;
		this.player;
		this.spawnTimer;
		this.difficulty = 2;
		console.log(this);   // why do these two lines
		console.log(Play);   // log totally different things

		// Make audio players
		this.musicPlayer = game.add.audio('music');
		this.soundPlayer = game.add.audio('jump');
	},
	create: function() {
		// Start music
		this.musicPlayer.play("", 0, 1, true);
		
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		
		// Place background and make it fit new aspect ratio
		this.background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
		
		// Make platform group and enable physics for them
		game.platforms = game.add.group();
		game.platforms.enableBody = true;

		// Make group for enemies
		game.enemies = game.add.group();
		
		// Make, scale, and set ground as immovable
		var ground = game.platforms.create(0, game.world.height - 64, 'runnerSheet', 'platform');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true;
			
		// 	Make character
		this.player = game.add.sprite(95, game.world.height - 150, 'Bunny');

		game.physics.arcade.enable(this.player);
	    this.player.body.gravity.y = 975;
	    this.player.body.collideWorldBounds = false;
	    this.player.animations.frame = 0;
		this.player.anchor.x = 0.5;
		
		// Make score text in top left
		this.scoreText = game.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#358c45' });
		
		// Make controller
		var cursors = game.input.keyboard.createCursorKeys();

		// Start the random platforms
		var plat = new Platform(game, 0.7, 80, this.player, 0);
		plat = new Platform(game, 0.7, 80, this.player, 2);

		// Make a timer for spawning obstacles
		// help from http://jsfiddle.net/lewster32/vd70o41p/ and phaser documentation
		time = game.time.create();
		this.spawnTimer = time.add(10000 - 70 * this.difficulty, spawnEnemy, this);
		time.start();

		this.player.hitBird = false;
	},

	update: function() {
		// run game loop
		//this.player.body.velocity.x = 0;

		// Check collisions
		if (!this.player.hitBird){
			this.hitPlatform = game.physics.arcade.collide(this.player, game.platforms);
		}

		this.jumping = game.input.keyboard.downDuration(Phaser.KeyCode.UP, 400);

		if (this.player.body.touching.down && this.hitPlatform){
			//Player is on the ground
			this.jumps = 1;
			this.player.airborne = false;

			this.player.animations.frame = 0;
		} else{
			// In the air
			this.player.animations.play('jump');
			this.score += this.difficulty * 0.01;
			this.scoreText.text = 'Score: '+Math.floor(this.score);

			// Scroll the background
			this.background.tilePosition.x -= 0.5 + this.difficulty/3;

			this.player.animations.frame = 1;
		}

		// Jump sound effect
		if (!this.player.airborne && game.input.keyboard.isDown(Phaser.KeyCode.UP)){
			this.soundPlayer.play();
		}

	    if (this.jumps > 0 && this.jumping){
	    	// Set vertical velocity
	        this.player.body.velocity.y = this.PLAYERJUMP;
	        this.player.airborne = true;
	    }

	    if (this.player.airborne && game.input.keyboard.upDuration(Phaser.KeyCode.UP)){
	    	this.jumps--;
	    }

	    // Make sure player stays centerish
	    if (this.player.airborne && this.player.body.x < 200){
	    	this.player.body.velocity.x = 15;
	    } else{
	    	this.player.body.velocity.x = 0;
	    }

	    // If the plpayer is carried offscreen they lose
	    if(this.player.body.x < -5){
	    	this.musicPlayer.pause();
	    	console.log(this.player.body.x);
			game.state.start("GameOver", true, false, Math.floor(this.score));
		}

	    // Check enemy collision
	    if (!this.player.hitBird){
			this.player.hitBird = game.physics.arcade.overlap(this.player, game.enemies);
		}
	}
}

function spawnEnemy () {	    
    // Spawn an obstacle
	var enemy = new Bird(game, this.difficulty, this.player);

	this.difficulty = Math.min(this.difficulty + 0.5, 100);

	console.log("difficulty is "+this.difficulty);

	this.spawnTimer = time.add(6000 + (Math.random() * 4000) - 70 * this.difficulty, spawnEnemy, this);
}

game.state.add("Play", Play);