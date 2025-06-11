var sceneMenu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this, { key: 'sceneMenu' });
    },
    init(){},
    preload: function(){
        this.load.setBaseURL('assets/assets/');
        this.load.image('bg_start', 'images/bg_start.png');
        this.load.image('btn_play','images/btn_play.png');
        this.load.image('title_game','images/title_game.png');
        this.load.image('panel_skor', 'images/panel_skor.png');
        this.load.audio('snd_ambience',  'audio/ambience.mp3');
        this.load.audio('snd_touch', 'audio/touch.mp3');
        this.load.audio('snd_transisi_menu', 'audio/transisi_menu.mp3')
        this.load.spritesheet('sps_mummy', 'sprite/mummy37x45.png', {frameWidth: 37, frameHeight: 45});
    },

    create : function(){

        X_POSITION = {
            LEFT : 0,
            CENTER : 1250 / 2,
            RIGHT: 1250,
        };

        Y_POSITION = {
            TOP : 0,
            CENTER : 580 / 2,
            BOTTOM : 580,
        };

        if(snd_ambience == null){
            snd_ambience = this.sound.add('snd_ambience');
            snd_ambience.loop = true;
            snd_ambience.setVolume(0.35);
            snd_ambience.play();
        }

        this.snd_touch = this.sound.add('snd_touch');
        var snd_transisi = this.sound.add('snd_transisi_menu');

        var skorTertinggi = localStorage["highscore"] || 0;

        this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bg_start');

        var btnPlay = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + 100, 'btn_play');
        btnPlay.setDepth(10);

        this.titleGame = this.add.image(this.scale.width/2, 120, 'title_game');
        this.titleGame.setDepth(10);

        this.titleGame.y -= 250;

        var  panelSkor = this.add.image(this.scale.width/2, this.scale.height-80, 'panel_skor');
        panelSkor.setOrigin(0.5);
        panelSkor.setDepth(10);
        panelSkor.setAlpha(0);

        var lblSkor = this.add.text(panelSkor.x + 25, panelSkor.y, "High Score : " + skorTertinggi);
        lblSkor.setOrigin(0.5);
        lblSkor.setDepth(10);
        lblSkor.setFontSize(30);
        lblSkor.setTint(0xff732e);

        var diz = this;

        const mummyAnimation = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('sps_mummy'),
            frameRate: 16,
        });
        const sprite = this.add.sprite(400,this.scale.height /2 +150, 'sps_mummy').setScale(4).setDepth(10);
        sprite.play({ key: 'walk',  repeat: -1 });

        this.tweens.add({
            targets: diz.titleGame,
            ease: 'Bounce.easeOut',
            duration: 750,
            delay: 250,
            y: 120,
            onComplete: function(){
                snd_transisi.play();
            }

        });

        btnPlay.setScale(0);

        this.tweens.add({
            targets: btnPlay,
            ease: 'Back',
            duration:  500,
            delay: 750,
            scaleX: 1,
            scaleY: 1
        });

        this.titleGame.setScale(0);

        this.tweens.add({
            targets: diz.titleGame,
            ease: 'Elastic',
            duration:  750,
            delay: 1000,
            scaleX: 1,
            scaleY: 1
        });

        this.input.on ('gameobjectover', function(pointer, gameObject) {
            console.log("Scene Menu | Object Over" ) ;
            if(!btnClicked) return;
            if(gameObject == btnPlay) {
                btnPlay.setTint(0x616161);
            }
            }, this);
            this.input.on ('gameobjectout', function(pointer, gameObject) {
            console.log("Scene Menu | Object Out") ;
            if( !btnClicked) return;
            if(gameObject == btnPlay) {
                btnPlay. setTint (0xffffff) ;
                btnClicked = true;
                }
            }, this);
            this.input.on('gameobjectdown', function(pointer, gameObject) {
            console.log("Scene Menu | Object Click") ;
            if (gameObject == btnPlay) {
                btnPlay.setTint(0x616161) ;
                btnClicked = true;
                }
            }, this);
            this.input.on('gameobjectup', function(pointer, gameObject) {
            console. log("Scene Menu | Object End Click") ;
            if(gameObject == btnPlay) {
                btnPlay.setTint (0xffffff) ;
                this.scene.start('scenePlay');
                this.snd_touch.play();
                }
            }, this) ;
            this.input.on ('pointerup', function(pointer, gameObject) {
            console.log("Scene Menu | Mouse Up") ;
            btnClicked = false;
            }, this);
            
        btnPlay.setInteractive();

        var btnClicked = false;
    },
    update(){}
})