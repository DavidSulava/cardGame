export default class Rectangle {

    constructor( x=100, y=100, w=100, h=100 ) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    create(){

        let rect = new PIXI.Graphics();
            rect.lineStyle(5, 0xFF0000);
            rect.drawRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

        return rect
    }
}