function Weather(game, key, frame, scale, rotation, speed) {
	// Make the sprite when function is called
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), key, frame);

	// set necessary properties
	this.anchor.set(0.5);
	this.scale.x = scale;
	this.scale.y = scale;
	// this.rotation = rotation;

	this.body.angularVelocity = rotation;
}

Weather.prototype = Object.create(Phaser, Sprite.prototype);
Weather.prototye.constructor = Weather;

Weather.prototype.update = function() {
	if (game.input.keyboard.isDown(Phaser.KeyCode.R)){
		this.speed = -this.speed;
	}

}