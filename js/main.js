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
  this.load.image('bg', 'assets/bg.png');

  this.load.image('tiles', 'assets/tilemaps/tiles/tileset.png');
  this.load.tilemapTiledJSON('level1', 'assets/tilemaps/maps/level1.json');

  this.load.image('box32', 'assets/box32.png');
  this.load.image('cookie', 'assets/cookie.png');
}

function create() {
  this.add.image(400, 240, 'bg');

  var map = this.make.tilemap({ key: 'level1' });
  var tiles = map.addTilesetImage('tileset', 'tiles');
  var layer = map.createStaticLayer(0, tiles, 0, 0);

  var rawTileArray = this.cache.tilemap.get('level1').data.layers[0].data;
  var numCols = this.cache.tilemap.get('level1').data.width;
  this.grid = new Grid2D(rawTileArray, numCols);
  this.gridCollider = new GridCollider(this.grid);
  
  this.cookieLocations = [
    {x: 64, y: 160},
    {x: 224, y: 32},
    {x: 384, y: 32},
    {x: 544, y: 32},
    {x: 704, y: 160},
    {x: 384, y: 224}
  ];
  var randomCookieIndex = Math.floor(Math.random() * this.cookieLocations.length);
  var cookieX = this.cookieLocations[randomCookieIndex].x;
  var cookieY = this.cookieLocations[randomCookieIndex].y;
  this.cookie = this.add.sprite(cookieX, cookieY, 'cookie');
  this.cookie.setOrigin(0, 0);

  this.player = this.add.sprite(384, 320, 'box32');
  // MUST initialize values (or first frame's physics will break)
  this.player.dx = 0;
  this.player.dy = 0;
  this.player.setOrigin(0, 0);
  this.player.alreadyJumped = false;

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(this.player);

  this.time = 3600; // 60 per second
  this.score = 0;
  this.timeText = this.add.text(16, 16, 'time: ' + Math.ceil(this.time / 60), { fontSize: '32px', fill: '#000' });
  this.scoreText = this.add.text(616, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#000' });
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (this.time == 0) {
    return;
  }

  var maxSpeed = 10.0;
  var acceleration = 7.0;
  var friction = 0.01;
  if (cursors.left.isDown) {
    if (this.player.dx < -maxSpeed) {
      this.player.dx *= friction;
    }
    else {
      this.player.dx -= acceleration;
      this.player.dx = Math.max(this.player.dx, -maxSpeed);
    }
  }
  else if (cursors.right.isDown) {
    if (this.player.dx > maxSpeed) {
      this.player.dx *= friction;
    }
    else {
      this.player.dx += acceleration;
      this.player.dx = Math.min(this.player.dx, maxSpeed);
    }
  }
  else {
    this.player.dx *= friction;
  }

  if (this.player.onGround && cursors.space.isDown && this.player.alreadyJumped == false) {
    this.player.dy = -25;
    this.player.alreadyJumped = true;
  }
  else {
    this.player.dy += 2.25;
    // cheap test to ensure can't fall through floor
    if (this.player.dy > 10) {
      this.player.dy = 10;
    }
  }

  if (cursors.space.isUp) {
    this.player.alreadyJumped = false;
  }

  this.gridCollider.handleCollisionsWith(this.player);

  // Level collisions
  if (this.player.x < 0) {
    this.player.x = 0;
    this.player.dx = 0;
  }
  // Needs a better way of getting the level width
  else if (this.player.x > this.grid.numCols * TILE_WIDTH - this.player.width) {
    this.player.x = this.grid.numCols * TILE_WIDTH - this.player.width;
    this.player.dx = 0;
  }

  this.player.x += this.player.dx;
  this.player.y += this.player.dy;

  this.time = this.time - 1;
  this.timeText.setText('time: ' + Math.ceil(this.time / 60));
  this.scoreText.setText('score: ' + this.score);
}
