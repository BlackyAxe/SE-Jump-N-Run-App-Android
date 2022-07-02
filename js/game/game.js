var widthGame = window.innerWidth * window.devicePixelRatio;
var heightGame = window.innerHeight * window.devicePixelRatio;
var widthBackgroundPicture = 1920
var config = {
    type: Phaser.AUTO,
    width: widthGame,
    height: heightGame,
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
var cursors;
var setBoundsMultiplier = 1

function playerMovement(player, cursors) {
    if (cursors.left.isDown)
        player.setVelocityX(-widthGame / 4);

    else if (cursors.right.isDown)
        player.setVelocityX(widthGame / 4);

    else
        player.setVelocityX(0);

    if (this.cursors.up.isDown)
        this.player.setVelocityY(-heightGame);
}
var highscore = 0;
var highscoreAnzeige;
var platforms;


function preload() {
    this.load.image('background', 'img/background.jpg');
    this.load.spritesheet('character', 'img/character.png', { frameWidth: 64, frameHeight: 90 });
    this.load.image('plattform', 'img/plattform.png');
}

function create() {
    for (let i = 0; i <= 16384; i++)
        this.add.image(widthBackgroundPicture * i, 0, 'background').setOrigin(0, 0);
    player = this.physics.add.sprite(widthGame / 2, heightGame / 2, 'character');

     //Highscore
     highscoreAnzeige = this.add.text(860, 30, "Score:" + highscore).setScrollFactor(0);
     // Plattformen
     platforms = this.physics.add.staticGroup();
     plattformgenerieren();
     this.physics.add.collider(player,platforms);

    
    player.setBounce(0.5);
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    cursors = this.input.keyboard.createCursorKeys();
    coordinatesOverlay = this.add.text(10, 60, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
}

function update() {
    setBoundsMultiplier = setBoundsMultiplier + 1
    this.cameras.main.setBounds(0, 0, widthGame * setBoundsMultiplier, heightGame);
    this.physics.world.setBounds(0, 0, widthGame * setBoundsMultiplier, heightGame);
    

    playerMovement(player, cursors);

    coordinatesOverlay.setText([
        'mouse x: ' + this.input.x,
        'mouse y: ' + this.input.y,
        'player x: ' + player.body.position.x,
        'player y: ' + player.body.position.y
    ]);

    //Highscore erhöhen
    highscore = highscore + 1;
    highscoreAnzeige.setText('Score: ' +highscore);
}
function plattformgenerieren(){
        platforms.create(1200, 730, 'plattform').setScale(2).refreshBody();
        var zaehler = 0;
        var abstand = 0;
        do {
        var random1 = Math.random() * (1000-500) + 500;
        var random2 = Math.random() * (750-180) + 180;
        platforms.create(1200+abstand+random1, random2, 'plattform').setScale(2).refreshBody();
        abstand = random1 + abstand;
        zaehler = zaehler + 1;
        } while (zaehler != 50)
}