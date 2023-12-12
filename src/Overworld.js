//const { GameObjects } = require("phaser");

class Example extends Phaser.Scene
{
    propertiesText;
    marker;
    map;
    player;
    light;
    radius = 35; 
    deaths = 0;
    

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

        this.light = this.lights.addLight(0,0,this.radius,0xffffff,2.0).setScrollFactor(0.0);
        this.lights.enable().setAmbientColor(0x000000);
        
        const music = this.sound.add('theme');
        music.play();
        music.volume = 0.25;

        this.sound.pauseOnBlur = true;

        const lore1c = [
            'A cold nights embrace touches your skin.',
            'You have traveled backwards and now must find a way forward again.'
        ];
        const lore2c = [
            'You have been here before but you can not remember why you came.',
            'Each time you seemingly perish you come back with light that radiates from within you that is ever growing.'
        ];
        const lore3c = [
            'You must leave there are voices in the night and hour grows late.',
            'Bones scatter the floor as you traverse perhaps previous adventuers?',
            'The shape of the body the bones make is familiar to you but you must press on.'
        ];
        const lore4c =[
            'Theres markings on all the walls incompehensible to you.',
            'Warnings maybe? A strange feeling comes over you as if your heart has been branded by an iron.',
            'There is little time left you must leave.'
        ]
        const loreEndc = [
            'Even though you have escaped some part of you still feels like it remains in that maze.',
            'You are safe but something tells you will never be whole again.'
        ];

        const lore1 = this.add.text(100, 256, lore1c, { fontSize: '10px',color: '#00ff00',lineSpacing: 10 });
        lore1.setDepth(2);
        lore1.visible = false;

        const lore2 = this.add.text(100, 256, lore2c, { fontSize: '10px',color: '#00ff00',lineSpacing: 10 });
        lore2.setDepth(2);
        lore2.visible = false;

        const lore3 = this.add.text(100, 256, lore3c, { fontSize: '10px',color: '#00ff00',lineSpacing: 10 });
        lore3.setDepth(2);
        lore3.visible = false;      

        const lore4 = this.add.text(100, 256, lore4c, { fontSize: '10px',color: '#00ff00', lineSpacing: 10 });
        lore4.setDepth(2);
        lore4.visible = false; 

        const endLore = this.add.text(100, 256, loreEndc, { fontSize: '10px',color: '#00ff00', lineSpacing: 10 });
        endLore.setDepth(2);
        endLore.visible = false; 

        const box = this.add.rectangle(0,0,10000,10000,"Black",1);
        box.visible = false;
        

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
                this.light.radius += 5;
                this.deaths += 1;
                if(this.deaths == 1)
                {
                    box.visible = true;
                    lore1.visible = true;
                    this.input.on('pointerdown',() => {
                        lore1.visible = false;
                        box.visible = false;
                    });
                }    
                else if(this.deaths == 2) {
                    box.visible = true;
                    lore2.visible = true;
                    this.input.on('pointerdown',() => {
                        lore2.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 3){
                    box.visible = true;
                    lore3.visible = true;
                    this.input.on('pointerdown',() => {
                        lore3.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 4){
                    box.visible = true;
                    lore4.visible = true;
                    this.input.on('pointerdown',() => {
                        lore4.visible = false;
                        box.visible = false;
                    });
                }

            }else if(tile.index===100){
                box.visible = true; 
                endLore.visible = true; 
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
                this.light.radius += 5;
                this.deaths += 1;
                if(this.deaths == 1)
                {
                    box.visible = true;
                    lore1.visible = true;
                    this.input.on('pointerdown',() => {
                        lore1.visible = false;
                        box.visible = false;
                    });
                }    
                else if(this.deaths == 2) {
                    box.visible = true;
                    lore2.visible = true;
                    this.input.on('pointerdown',() => {
                        lore2.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 3){
                    box.visible = true;
                    lore3.visible = true;
                    this.input.on('pointerdown',() => {
                        lore3.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 4){
                    box.visible = true;
                    lore4.visible = true;
                    this.input.on('pointerdown',() => {
                        lore4.visible = false;
                        box.visible = false;
                    });
                }
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
                this.light.radius += 5;
                this.deaths += 1;
                if(this.deaths == 1)
                {
                    box.visible = true;
                    lore1.visible = true;
                    this.input.on('pointerdown',() => {
                        lore1.visible = false;
                        box.visible = false;
                    });
                }    
                else if(this.deaths == 2) {
                    box.visible = true;
                    lore2.visible = true;
                    this.input.on('pointerdown',() => {
                        lore2.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 3){
                    box.visible = true;
                    lore3.visible = true;
                    this.input.on('pointerdown',() => {
                        lore3.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 4){
                    box.visible = true;
                    lore4.visible = true;
                    this.input.on('pointerdown',() => {
                        lore4.visible = false;
                        box.visible = false;
                    });
                }
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
                this.light.radius += 5;
                this.deaths += 1;
                if(this.deaths == 1)
                {
                    box.visible = true;
                    lore1.visible = true;    
                    this.input.on('pointerdown',() => {
                        lore1.visible = false;
                        box.visible = false;
                    });
                }    
                else if(this.deaths == 2) {
                    box.visible = true;
                    lore2.visible = true;
                    this.input.on('pointerdown',() => {
                        lore2.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 3){
                    box.visible = true;
                    lore3.visible = true;
                    this.input.on('pointerdown',() => {
                        lore3.visible = false;
                        box.visible = false;
                    });
                }
                else if(this.deaths == 4){
                    box.visible = true;
                    lore4.visible = true;
                    this.input.on('pointerdown',() => {
                        lore4.visible = false;
                        box.visible = false;
                    });
                }
            }

        });
    }

    update (time, delta)
    {
        this.propertiesText.setText('Countdown: ' + formatTime(60-(time/1000)));
        if(60-(time/1000)<=0){
            var rect = this.add.rectangle(0, 0, 10000, 10000, "Black", 1);
            this.add.text(150, 256, 'You didn\'t escape the maze and \n your soul is forever trapped there :(', { fontSize: '20px' });
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
    scene: Example
};

const game = new Phaser.Game(config);

