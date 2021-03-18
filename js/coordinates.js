let card_w = 150;
let card_h = 200;
let window_w = window.innerWidth;
let window_h = window.innerHeight;
let window_middle_w  = window.innerWidth / 2;


let preset = {


    card:{
        width  : card_w,
        height : card_h,
    },
    rectangle :{
        x: [
            window_middle_w + card_w/2 - 2*(card_w + 10 + 5 ),
            window_middle_w - (card_w/2 + 10),
            window_middle_w + (card_w/2 + 10),
            window_middle_w - card_w/2 + 2*(card_w + 10 + 5 ),
        ],
        y: window_h  - card_h,

    },
    deck:{
        x: window_w  - card_w,
        y: window_h - (window_h - card_h),
    },
    resetButton:{
        x     : 100,
        y     : window_h - (window_h - 50),
        width : 150,
        height: 50,
    }

}

export default preset