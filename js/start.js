import Deck        from '/js/classes/Deck.js';
import Rectangle   from '/js/classes/Rectangle.js';
import ResetButton from '/js/classes/ResetButton.js';
import preset      from './coordinates.js';


window.onload = ()=>{

    let app = new PIXI.Application({
        resizeTo : window,
    });
    app.sortableChildren  = true;
    app.loader.add('front' , '../img/front.jpg')
              .add('back'  , '../img/back.png')
              .add('button', '../img/button.png')
              .add('table' , '../img/table.jpg')
              .load(setup);


    function setup(){

        document.body.appendChild(app.view);

        let mainContainer = new PIXI.Container();
            mainContainer.sortableChildren = true;

        app.stage.addChild(mainContainer);

        //--crate table background
        let table = new PIXI.Sprite.from( app.loader.resources['table'].url );
            table.scale.set(1.5 , 1.5 )
        mainContainer.addChild(table);

        //--Create Rectangles
        for (let index = 0; index < preset.rectangle.x.length; index++) {

            let x = preset.rectangle.x[index];
            let y = preset.rectangle.y;
            let w = preset.card.width;
            let h = preset.card.height;

            let rect = new Rectangle(x,y,w,h);

            mainContainer.addChild(rect.create());
        }

        //--crate Deck of Cards
        const deck = new Deck(app, preset );
              deck.shuffle();

        //---add a Card to the main container
        deck.cards.map((el)=> {
            mainContainer.addChild(el.cardContainer);
        })

        //--Create Reset Button
        let btnResetX = preset.resetButton.x;
        let btnResetY = preset.resetButton.y;
        let btnResetW = preset.resetButton.width;
        let btnResetH = preset.resetButton.height;

        let resetButton = new ResetButton( btnResetX, btnResetY, btnResetW, btnResetH, app, deck);
        mainContainer.addChild(resetButton.getButton);


    }


}