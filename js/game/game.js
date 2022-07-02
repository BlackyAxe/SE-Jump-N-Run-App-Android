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
var highscore = 0;
var highscoreOverlay;
var platforms;

function playerMovement(player, cursors) {
    if (cursors.left.isDown)
        player.setVelocityX(-widthGame / 4);

    else if (cursors.right.isDown)
        player.setVelocityX(widthGame / 4);

    else
        player.setVelocityX(0);

    if (cursors.up.isDown)
        player.setVelocityY(-heightGame);
}

function generatePlatforms() {
    platforms.create(1200, 730, 'platform').setScale(2).refreshBody();
    var counter = 0;
    var distance = 0;
    do {
        var random1 = Math.random() * (1000 - 500) + 500;
        var random2 = Math.random() * (750 - 180) + 180;
        platforms.create(1200 + distance + random1, random2, 'platform').setScale(2).refreshBody();
        distance = random1 + distance;
        counter = counter + 1;
    } while (counter != 50)
}

function preload() {
    this.load.image('background', 'img/background.jpg');
    this.load.spritesheet('character', 'img/character.png', { frameWidth: 64, frameHeight: 90 });
    this.load.image('platform', 'img/platform.png');
}

function create() {
    for (let i = 0; i <= 16384; i++)
        this.add.image(widthBackgroundPicture * i, 0, 'background').setOrigin(0, 0);
    player = this.physics.add.sprite(widthGame / 2, heightGame / 2, 'character');
    highscoreOverlay = this.add.text(860, 30, "Score:" + highscore).setScrollFactor(0);
    platforms = this.physics.add.staticGroup();
    generatePlatforms();
    this.physics.add.collider(player, platforms);
    player.setBounce(0.5);
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    cursors = this.input.keyboard.createCursorKeys();
    coordinatesOverlay = this.add.text(10, 60, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);

    // Test starten
    // playerMovement_Test()
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
    highscore = highscore + 1;
    highscoreOverlay.setText('Score: ' + highscore);
}

function playerMovement_Test() {
    // Funktion, die getestet wird
    playerMovement(player, cursors)

    setTimeout(function () { moveRight() == true }, 0);
    setTimeout(function () { moveLeft() == true }, 1000);
    setTimeout(function () { moveUp() == true }, 2000);

    function moveRight() {
        // Koordinaten vor dem Test
        coordinatePlayerX_Right = player.body.position.x;

        // Pfeiltaste nach rechts wird gedrückt
        cursors.right.isDown = true;

        // Pfeiltaste wird nach 1 Sekunde losgelassen
        setTimeout(function () {
            cursors.right.isDown = false;

            // Koordinaten nach dem Test
            coordinatePlayerX_Right_New = player.body.position.x;
            if (coordinatePlayerX_Right < coordinatePlayerX_Right_New)
                console.log('PASSED: moveRight()');
            else
                console.log('FAILED: moveRight()');
        }, 1000);
    }
    function moveLeft() {
        // Koordinaten vor dem Test
        coordinatePlayerX_Left = player.body.position.x;

        // Pfeiltaste nach rechts wird gedrückt
        cursors.left.isDown = true;

        // Pfeiltaste wird nach 1 Sekunde losgelassen
        setTimeout(function () {
            cursors.left.isDown = false;

            // Koordinaten nach dem Test
            coordinatePlayerX_Left_New = player.body.position.x;
            if (coordinatePlayerX_Left > coordinatePlayerX_Left_New)
                console.log('PASSED: moveLeft()');
            else
                console.log('FAILED: moveLeft()');
        }, 1000);
    }
    function moveUp() {
        // Koordinaten vor dem Test
        coordinatePlayerY = player.body.position.y;

        // Pfeiltaste nach rechts wird gedrückt
        cursors.up.isDown = true;

        // Pfeiltaste wird nach 1 Sekunde losgelassen
        setTimeout(function () {
            cursors.up.isDown = false;

            // Koordinaten nach dem Test
            coordinatePlayerY_New = player.body.position.y;
            if (coordinatePlayerY > coordinatePlayerY_New)
                console.log('PASSED: moveUp()');
            else
                console.log('FAILED: moveUp()');
        }, 1000);
    }
}