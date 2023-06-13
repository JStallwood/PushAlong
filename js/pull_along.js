let blocks = [];
let shadow_colors, mid_colors, high_colors;
let block_speeds = [0.01, 0.1, 0.2, 0.02, 0.005, 0.05];
let blob;
let block_order = [];
let block_counter = 0;
let attempts = 0;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("game_div");
  setColors();
  initializeBlocks();
  initializeBlockOrder();
  blob = new Blob(width/2, 40, 30);
}

function draw() {
    background(52);
    blocks.forEach(b => {
        b.update();
        b.show();
    });
    blob.update();
    blob.show();
    drawAttempts();
}

function initializeBlockOrder() {
    let map = [...Array(blocks.length).keys()];
    for(let i = map.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let temp = map[i];
        map[i] = map[r];
        map[r] = temp;
    }
    block_order.push(...map);
}

function initializeBlocks() {
    let X_positions = [10, width - 210];
    for(let i = 0; i < 5; i++) {
        let r = Math.floor(Math.random() * 99) + 1;
        let startX = X_positions[0];
        let endX = X_positions[1];
        if(r % 2 == 0) {
            startX = X_positions[1];
            endX = X_positions[0];
        }
        let color_index = Math.floor(Math.random() * shadow_colors.length);

        let b = new Block(
                            startX,
                            110 * i + 10,
                            200,
                            100,
                            endX,
                            110 * i + 10,
                            shadow_colors[color_index],
                            mid_colors[color_index],
                            high_colors[color_index],
                            random(block_speeds)
                        );
        b.setTarget();
        blocks.push(b);
    }
}

function mousePressed() {
    let b_choice = block_order[block_counter];
    if(!blocks[b_choice].moving) 
    { 
        blocks[b_choice].setTarget();
        blocks[b_choice].moving = true; 
        attempts += 1;
    }
    block_counter += 1;
    if(block_counter > block_order.length - 1) {
        block_counter = 0;
    }
    
}

function drawAttempts() {
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(attempts.toString(), width - 30, height - 15);
}

function setColors() {
    //DARK GREEN
    //DODGER BLUE
    //ORANGE RED
    //DARK VIOLET
    shadow_colors = [
        color(0,100,0),
        color(30,144,255),
        color(255,69,0),
        color(148,0,211)
    ];
    //FOREST GREEN
    //DEEP SKY
    //ORANGE
    //MEDIUM ORCHID
    mid_colors = [
        color(34,139,34),
        color(0,191,255),
        color(255,165,0),
        color(186,85,211)
    ];
    //PALE GREEN
    //LIGHT SKY
    //GOLD
    //FUSCHIA
    high_colors = [
        color(152,251,152),
        color(135,206,250),
        color(255,215,0),
        color(255,0,255)
    ];
}



