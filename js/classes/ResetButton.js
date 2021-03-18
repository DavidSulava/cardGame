export default class ResetButton {

    constructor( x, y, w, h, app, deck, text='Reset Deck'){

        this.deck = deck;
        this.app  = app;

        this.button = new PIXI.Sprite.from( app.loader.resources['button'].url );

        this.button.interactive = true;
        this.button.buttonMode = true;

        this.button.deck = deck;
        this.button.app  = app;

        this.button
            .on('mousedown', this.onButtonDown )
            .on('pointerup', this.onButtonUp)

        this.button.anchor.set(0.5);
        this.button.x      = x;
        this.button.y      = y;
        this.button.width  = w;
        this.button.height = h;

        this.text = new PIXI.Text( text , {
            fontSize      : 90,
            fonyFamily    : 'Arial',
            fill          : 0xffffff,
            align         : 'center',
            cacheAsBitmap : true, // for better performance
        });
        this.text.anchor.set(0.5);

        this.button.addChild( this.text );
    }

    get getButton(){
        return this.button
    }
    onButtonDown(){

        this.alpha = 0.88;
        this.deck.reset();

        this.deck.cards.map((el)=> {
            this.app.stage.children[0].removeChild(el.cardContainer);
            this.app.stage.children[0].addChild(el.cardContainer);
        })
    }
    onButtonUp(){
        this.alpha = 1
    }

}