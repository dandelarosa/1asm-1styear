var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
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

function preload() {
  this.load.image('box32', 'assets/box32.png');
}

function create() {
  player = this.physics.add.sprite(150, 200, 'box32');
}

function update() {
}
