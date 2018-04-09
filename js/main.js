var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
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
  this.player = this.add.sprite(150, 200, 'box32');
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown)
  {
    this.player.x -= 4;
  }
  else if (cursors.right.isDown)
  {
    this.player.x += 4;
  }
}
