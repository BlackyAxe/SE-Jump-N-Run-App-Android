var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#4488aa',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var player;

function preload() {
    this.load.spritesheet('character', 'img/character.png', { frameWidth: 64, frameHeight: 90 });
}

function create() {
    player = this.physics.add.sprite(960, 540, 'character');

    player.setBounce(0.5);
    player.setCollideWorldBounds(true);
}

function update() {
}