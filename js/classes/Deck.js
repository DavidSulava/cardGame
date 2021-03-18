const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]


export default class Deck {

  constructor( app, preset ) {
    this.cards = freshDeck(app, preset);
  }

  get numberOfCards() {
    return this.cards.length
  }

  reset(){
    this.shuffle();
    this.cards.forEach( card => {
      card.resetPosition();
    });

  }

  shuffle() {

    for ( let i = this.numberOfCards - 1; i > 0; i-- ) {

      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];

      this.cards[newIndex] = this.cards[i]
      this.cards[i]        = oldValue
    }

  }
}

class Card  {

  static order = 0;

  constructor( suit, value, app, preset ) {

    this.app    = app;
    this.suit   = suit;
    this.value  = value;
    this.preset = preset

    this.width  = preset.card.width;
    this.height = preset.card.height;

    this.front = new PIXI.Sprite.from( this.app.loader.resources['front'].url );
    this.back  = new PIXI.Sprite.from( this.app.loader.resources['back'].url );

    this.front.width  = this.width;
    this.front.height = this.height;
    this.back.width   = this.width;
    this.back.height  = this.height;

    this.front.anchor.x = 0.5;
    this.front.anchor.y = 0.5;
    this.back.anchor.x  = 0.5;
    this.back.anchor.y  = 0.5;

    this.cardContainer =  new PIXI.Container();
    this.cardContainer.addChild(this.front);
    this.cardContainer.addChild(this.back);

    this.endLocation_x = this.endLocation.x;
    this.endLocation_y = this.endLocation.y;

    this.cardChangePoint = this.endLocation_y/ 1.4

    this.ticker = new PIXI.Ticker;

    this.suit_text = new PIXI.Text( this.suit , {
        fontSize      : 90,
        fonyFamily    : 'Arial',
        fill          : this.color,
        align         : 'center',
        cacheAsBitmap : true, // for better performance
    });
    this.suit_text_small = new PIXI.Text( this.suit , {
        fontSize      : 40,
        fonyFamily    : 'Arial',
        fill          : this.color,
        align         : 'center',
        cacheAsBitmap : true,
    });
    this.value_text = new PIXI.Text( this.value , {
        fontSize      : 35,
        fonyFamily    : 'Arial',
        fill          : this.color,
        align         : 'center',
        cacheAsBitmap : true,
    });

    this.setContainer()
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? 0x050505 : 0xf71919
  }
  get endLocation(){

    const x_coordinate = {
      "♠":  this.preset.rectangle.x[0],
      "♣":  this.preset.rectangle.x[1],
      "♥":  this.preset.rectangle.x[2],
      "♦":  this.preset.rectangle.x[3],
    }

    return {
      x: x_coordinate[this.suit] ,
      y: this.preset.rectangle.y,
    }
  }

  setFront(){

    this.suit_text.anchor.x = 0.5;
    this.suit_text.anchor.y = 0.5;

    this.suit_text_small.x = -this.width + 50;
    this.suit_text_small.y = -this.height + 70;

    this.value_text.x = -this.width + 50;
    this.value_text.y = -this.height + 45;

    this.front.addChild( this.suit_text );
    this.front.addChild( this.suit_text_small );
    this.front.addChild( this.value_text );

  }
  setBack(){

    this.back.interactive = true;
    this.back.buttonMode  = true;
    this.back.on('mousedown', ()=> this.handleClick() )
  }
  setContainer(){

    this.setFront();
    this.setBack();

    this.cardContainer.x = this.preset.deck.x;
    this.cardContainer.y = this.preset.deck.y;

  }
  resetPosition(){

    Card.order = 0;
    this.cardContainer.zIndex = Card.order;

    this.cardContainer.x = this.preset.deck.x;
    this.cardContainer.y = this.preset.deck.y;

    this.back.visible = true;
  }

  handleClick(){

    // this.back.visible = false;

    Card.order += 1
    this.cardContainer.zIndex = Card.order;

    this.ticker.add( this.animateCard, this );
    this.ticker.start();
  }
  animateCard(delta){

    if( this.cardContainer.x  > this.endLocation_x )
      this.cardContainer.x -= 18
    else if(this.cardContainer.x  <= this.endLocation_x)
      this.cardContainer.x = this.endLocation_x

    if( this.cardContainer.y  < this.endLocation_y )
      this.cardContainer.y += 18
    else if(this.cardContainer.y  >= this.endLocation_y)
      this.cardContainer.y = this.endLocation_y

    //--Card Reveal Point
    if( this.cardContainer.y > this.cardChangePoint )
      this.back.visible = false;

    //-- stop loop
    if(this.cardContainer.y  >= this.endLocation_y && this.cardContainer.x  <= this.endLocation_x ){

      this.cardContainer.x = this.endLocation_x;
      this.cardContainer.y = this.endLocation_y;

      this.ticker.remove(this.animateCard, this);
    }


  }

}

function freshDeck(app, preset) {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value, app, preset)
    })
  })
}