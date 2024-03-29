"use strict";

var Play = function(game) {};

Play.prototype = {
	init: function(){
		// Necessary variables
		this.time;

		// Make audio players

	},
	create: function() {
		// REMEMBER - .push() to push onto an array

		// Start music
		
		// Enable physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
			
		// Make character 1
		this.earth = game.add.sprite(100, game.world.centerY, 'earth');
		this.earth.anchor.set(0.5);
		this.earth.scale.setTo(0.25);
		game.physics.arcade.enable(this.earth);

		// Make character 2
		this.mars = game.add.sprite(game.width - 100, game.world.centerY, 'mars');
		this.mars.anchor.set(0.5);
		this.mars.scale.setTo(0.25);
		game.physics.arcade.enable(this.mars);

		// Make asteroid
		this.asteroid = game.add.sprite(game.world.centerX, game.world.centerY, 'asteroid');
		game.physics.arcade.enable(this.asteroid);
	    this.asteroid.body.collideWorldBounds = false;
	    this.asteroid.animations.frame = 0;
		this.asteroid.anchor.set(0.5);
		this.asteroid.body.velocity.y = -50;
		
		// Make controller
		var cursors = game.input.keyboard.createCursorKeys();

		// Make a timer for spawning obstacles
		// help from http://jsfiddle.net/lewster32/vd70o41p/ and phaser documentation
		this.time = game.time.create();
		this.time.start();

		// Used for debugging some code from https://phaser.io/examples/v2/sprites/anchor
		this.debug = true;
		this.p1Point = new Phaser.Point(100, game.world.centerY,);
		this.p2Point = new Phaser.Point(game.width - 100, game.world.centerY,);
		this.astPoint = new Phaser.Point(game.world.centerX, game.world.centerY,);
	},

	update: function() {
		// run game loop
		// var vX;
    	// var vY;
   		var destBody = new Phaser.Point();
   		var thisBody = new Phaser.Point();
   		var gravityVector = new Phaser.Point();
   		var velocityVector = new Phaser.Point();
   		var gravityAngle;
   		var distance;
   		var mass = 500;

   		// Set points to be the x,y positions of sprites
   		destBody.copyFrom(this.earth);
   		thisBody.copyFrom(this.asteroid);

   		distance = thisBody.distance(destBody, true);

   		Phaser.Point.subtract(destBody, thisBody, gravityVector);
   		gravityVector.normalize();

   		// Unsure if this angle will be useful
   		// gravityAngle = Phaser.Point.angle(destBody, thisBody);

   		// Create a vector with magnitude greater than one 
   		gravityVector.clone(velocityVector);
   		velocityVector.setMagnitude(mass/distance);
   		// console.log(velocityVector);

   		// Alter velocity based on gravity
   		this.asteroid.body.velocity.x += velocityVector.x;
   		this.asteroid.body.velocity.y += velocityVector.y;

   		// .clamp keeps the value between the two numbers given, can be used to set a max speed
   		/*
   		this.asteroid.body.velocity.clampX(-375, 375);
   		this.asteroid.body.velocity.clampY(-225, 225);
   		*/
   		console.log(this.asteroid.body.velocity);

   		

   		/*
		vX = this.earth.body.x - this.asteroid.body.x;
		vY = this.earth.body.y - this.asteroid.body.y;

		vX = vX/distance;
		vY = vY/distance;

		this.asteroid.body.velocity.x += 100*vX / Math.min(distance, 500);
		this.asteroid.body.velocity.y += 100*vY / Math.min(distance, 500);

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log(distance);
		}

		vX = this.mars.body.x - this.asteroid.body.x;
		vY = this.mars.body.y - this.asteroid.body.y;
		distance = Math.sqrt(vX*vX + vY*vY);

		vX = vX/distance;
		vY = vY/distance;

		this.asteroid.body.velocity.x += 10*vX / Math.min(Math.max(distance-25, 1), 500);
		this.asteroid.body.velocity.y += 10*vY / Math.min(Math.max(distance-25, 1), 500);

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log(distance);
		}
		*/
	},

	render: function() {
		if (this.debug){
			game.debug.geom(this.p1Point, '#1546c1');
			game.debug.geom(this.p2Point, '#c13715');
			game.debug.geom(this.astPoint, '#562d13');
		}
	}
}

function Gravity (bodies) {	    
    // Calculate gravity
    var vX;
    var vY;
	for (var i = 0; i < bodies.length; i++){
		vX = bodies[i].body.x - this.body.x;
		vY = bodies[i].body.y - this.body.y;
		distance = sqrt(vX*vX + vY*vY);

		this.velocity.x += (vX/3000)/(distance-25);
		this.velocity.y += (vY/3000)/(distance-25);
	}
}

game.state.add("Play", Play);