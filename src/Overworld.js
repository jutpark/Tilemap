class Example extends Phaser.Scene
{
    propertiesText;
    marker;
    map;
    light;
    player;
    radius = 35;
    themeMusic;

    preload ()//"100 and 99 are both pink"
    {
        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/tile_properties-v12.json');
       
        //this.load.tilemapTiledJSON('map', 'assets/tile_properties.json');
        this.load.audio('theme', 'assets/Myst_theme.mp3');
        var coin = Math.floor(Math.random() * 2);
        if(coin==1){
            this.load.tilemapTiledJSON('map', 'assets/tile_properties2.json');
        }
        else{
            this.load.tilemapTiledJSON('map', 'assets/tile_properties.json');
        }
        

        //this.load.image('tiles', 'assets/gridtiles2.png');
        this.load.image('tiles', 'assets/gridtiles.png');
        this.load.image('player', 'assets/player.png');
    }

    create ()
    {
        this.map = this.make.tilemap({ key: 'map' });
        const tileset = this.map.addTilesetImage('tiles');
        const layer = this.map.createLayer('Tile Layer 1', tileset, 0, 0).setPipeline('Light2D');
        this.propertiesText = this.add.text(16, 540, '', {
            fontSize: '18px',
            fill: '#ffffff'
        });
        
        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        const help = this.add.text(16, 500, 'Time remaining: ', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        help.setScrollFactor(0);
        this.player = this.add.image(32 + 16, 32 + 16, 'player');

        this.light = this.lights.addLight(0,0,this.radius,0xffffff,5.0).setScrollFactor(0.0);
        this.lights.enable().setAmbientColor(0x000000);
        
        const music = this.sound.add('theme');
        music.play();
        music.volume = 0.25;

        this.sound.pauseOnBlur = true;
        
        this.input.keyboard.on('keydown-A', event =>
        {

            const tile = layer.getTileAtWorldXY(this.player.x - 32, this.player.y, true);

            if (tile.index === 1 || tile.index === 29 || tile.index ===99)
            {
                //  Blocked, we can't move
                this.player.x -= 32;
            }else if(tile.index===73){
                this.player.x=48
                this.player.y=48
                //this.light = this.lights.addLight(0,0,this.radius+=this.radius,0xffffff,5.0).setScrollFactor(0.0); // increases light radius for when hitting a trap
                this.light.radius += this.light.radius;
            }else if(tile.index===100){
                var rect = this.add.rectangle(0, 0, 10000, 10000, "Black", 1);
                this.add.text(150, 256, 'You escaped the maze and won! ', { fontSize: '30px' });
            }

        });

        //  Right
        this.input.keyboard.on('keydown-D', event =>
        {

            const tile = layer.getTileAtWorldXY(this.player.x + 32, this.player.y, true);

            if (tile.index === 1 || tile.index === 29 || tile.index === 99 || tile.index ===100)
            {
                //  Blocked, we can't move
                this.player.x += 32;
            }else if(tile.index===73){
                this.player.x=48
                this.player.y=48
                //this.light = this.lights.addLight(0,0,this.radius+=this.radius,0xffffff,5.0).setScrollFactor(0.0); // increases light radius for when hitting a trap
                this.light.radius += this.light.radius;
            }


        });

        //  Up
        this.input.keyboard.on('keydown-W', event =>
        {

            const tile = layer.getTileAtWorldXY(this.player.x, this.player.y - 32, true);

            if (tile.index === 1 || tile.index === 29 || tile.index === 99 || tile.index ===100)
            {
                //  Blocked, we can't move
                this.player.y -= 32;
            }else if(tile.index===73){
                this.player.x=48
                this.player.y=48
                // this.light = this.lights.addLight(0,0,this.radius+=this.radius,0xffffff,5.0).setScrollFactor(0.0); // increases light radius for when hitting a trap
                this.light.radius += this.light.radius;
            }

        });

        //  Down
        this.input.keyboard.on('keydown-S', event =>
        {

            const tile = layer.getTileAtWorldXY(this.player.x, this.player.y + 32, true);

            if (tile.index === 1 || tile.index === 29 || tile.index === 99 || tile.index ===100)
            {
                //  Blocked, we can't move
                this.player.y += 32;
            }else if(tile.index===73){
                this.player.x=48
                this.player.y=48
                //this.light = this.lights.addLight(0,0,this.radius+=5,0xffffff,5.0).setScrollFactor(0.0); // increases light radius for when hitting a trap
                this.light.radius += this.light.radius;
            }

        });
    }

    update (time, delta)
    {
        this.propertiesText.setText('Countdown: ' + formatTime(180-(time/1000)));
        if(180-(time/1000)<=0){
            var rect = this.add.rectangle(0, 0, 10000, 10000, "Black", 1);
            this.add.text(150, 256, 'You didn\'t escape the maze and lost :(', { fontSize: '30px' });
        }
        
        //console.log(time)
        /*const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        const pointerTileX = this.map.worldToTileX(worldPoint.x);
        const pointerTileY = this.map.worldToTileY(worldPoint.y);

        // Snap to tile coordinates, but in world space
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

        if (this.input.manager.activePointer.isDown)
        {
            const tile = this.map.getTileAt(pointerTileX, pointerTileY);

            if (tile)
            {
                // Note: JSON.stringify will convert the object tile properties to a string
                this.propertiesText.setText(`Properties: ${JSON.stringify(tile.properties)}`);
                tile.properties.viewed = true;
            }
        }*/
        this.light.x = this.player.x;
        this.light.y = this.player.y;
    }
}
function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = Math.floor(seconds%60);
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    pixelArt: true,
    scene: Example,
   
};

const game = new Phaser.Game(config);

