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
  this.load.image('tiles', 'assets/tilemaps/tiles/tileset.png');
  this.load.tilemapTiledJSON('level1', 'assets/tilemaps/maps/level1.json');

  this.load.image('box32', 'assets/box32.png');
}

function create() {
  var map = this.make.tilemap({ key: 'level1' });
  var tiles = map.addTilesetImage('tileset', 'tiles');
  var layer = map.createStaticLayer(0, tiles, 0, 0);

  this.player = this.add.sprite(150, 200, 'box32');

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(this.player);
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
