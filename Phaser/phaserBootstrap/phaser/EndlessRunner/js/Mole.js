"use strict";

var Bird = function(game, difficulty, player) {
	// Make the sprite when function is called
	Phaser.Sprite.call(this, game, game.width, 150, 'bird');
	console.log('new birb');

	// set necessary properties
	this.speed = 50 + difficulty * 0.5;
	this.player = player;
	this.difficulty = difficulty;

	game.physics.arcade.enable(this);
	game.add.existing(this);

	// Using the character movement tutorial that Nathan posted I made it so the bird always flies towards the player, I thought that was pretty neat
	this.body.velocity.x = ((player.body.x - this.body.x) * this.speed) / 300 - difficulty;
	this.body.velocity.y = ((player.body.y - this.body.y + 30) * this.speed) / 300 - difficulty;
	this.speed = this.body.velocity.x;
}

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
	if (this.player.airborne){
		this.body.velocity.x = this.speed - 75 - 1.5 * this.difficulty;
	} else{
		this.body.velocity.x = this.speed;
	}

	if (this.body.x < -30) this.kill;
}