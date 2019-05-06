"use strict";

var Platform = function(game, scale, speed, player, upper) {
	// Make the sprite when function is called
	// determine if it should appear higher or lower
	if (upper == 2){
		Phaser.Sprite.call(this, game, game.width + 200 + game.rnd.integerInRange(0, 100), game.rnd.integerInRange(120, game.height - 275), 'runnerSheet', 'platform');
		upper--;
	} else if (upper == 1){
		Phaser.Sprite.call(this, game, game.width + game.rnd.integerInRange(0, 100), game.rnd.integerInRange(120, game.height - 275), 'runnerSheet', 'platform');
	}else{
		Phaser.Sprite.call(this, game, game.width + game.rnd.integerInRange(0, 100), game.rnd.integerInRange(230, game.height - 150), 'runnerSheet', 'platform');
	}

	console.log('new platform');
	console.log(speed);

	// set necessary properties
	this.upper = upper;
	this.scale.x = scale;
	this.speed = speed;
	this.player = player;
	// this.rotation = rotation;

	game.physics.arcade.enable(this);
	game.add.existing(this);
	this.body.immovable = true;
	game.platforms.add(this);
}

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
	// Only move if player is jumping
	if (this.player.airborne){
		this.body.velocity.x = -this.speed;
	} else{
		this.body.velocity.x = 0;
	}

	// Spawn new platform when this goes off of the screen
	if (-280 > this.x){
		var plat = new Platform(game, this.scale.x, Math.min(this.speed + 20, 450), this.player, this.upper);
		this.destroy();
	}
}