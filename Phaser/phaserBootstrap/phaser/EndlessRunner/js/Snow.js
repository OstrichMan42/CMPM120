var Weather = function(game, key, scale, rotation, speed) {
	// Make the sprite when function is called
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), key);
	console.log('new hole');

	// set necessary properties
	this.anchor.set(0.5);
	this.alpha = (0.3 + 0.6 * Math.random());
	this.scale.x = scale;
	this.scale.y = scale;
	this.speed = speed;
	// this.rotation = rotation;

	game.physics.arcade.enable(this);
	this.body.angularVelocity = rotation;
	this.body.velocity.y = Math.random() * 100 + 50
	this.body.velocity.x = this.speed;
	game.add.existing(this);
}

Weather.prototype = Object.create(Phaser.Sprite.prototype);
Weather.prototype.constructor = Weather;

Weather.prototype.update = function() {

	// Reverse reverse
	if (game.input.keyboard.isDown(Phaser.KeyCode.R)){
		this.speed = -this.speed;
		this.body.velocity.x = this.speed;
	}

	// Wrap around screen
	if (this.x > game.width + 25 || -25 > this.x){
		if (this.speed > 0) this.x = -24;
		else this.x = game.width + 24;
	}
	if (this.y > game.height + 25){
		this.y = -25;
	}

}