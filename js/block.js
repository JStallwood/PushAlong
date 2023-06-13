function Block(x, y, w, h, a, b, color_one, color_two, highlight_color, speed) {
    this.pos = createVector(x, y);
    this.size = createVector(w, h);
    this.colors = [color_one, color_two, highlight_color];
    this.moving = false;
    this.pos_one = createVector(x, y);
    this.pos_two = createVector(a, b);
    this.pos_index = 1;
    this.move_counter = 0;
    this.speed = speed;

    this.show = function() {
        this.gradient();
        this.highlight();
    };
    
    this.gradient = function() {
        let startY = this.pos.y;
        let endY = this.pos.y + this.size.y;
        for(let i = startY; i <= endY; i++) {
            let increment = map(i, startY, endY, 0, 1);
            let col = lerpColor(this.colors[0], this.colors[1], increment);
            strokeWeight(1);
            stroke(col);
            line(this.pos.x, i, this.pos.x + this.size.x, i);
        }
    };

    this.highlight = function() {
        strokeWeight(2);
        stroke(this.colors[2]);
        noFill();
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    };

    this.show_alternative_location = function() {
        strokeWeight(2);
        stroke(this.colors[2]);
        noFill();
        
        if(this.pos_index == 1) {
            rect(this.pos_two.x, this.pos_two.y, this.size.x, this.size.y);
        }
        else {
            rect(this.pos_one.x, this.pos_one.y, this.size.x, this.size.y);
        }
    };

    this.update = function() {
        if(this.moving) {            
            if(dist(this.pos.x, this.pos.y, this.target.x, this.target.y) > 0.1) {
                let u = createVector(this.pos.x, this.pos.y);
                let l = u.lerp(this.target, this.move_counter);
                this.pos.x = l.x;
                this.pos.y = l.y;
                this.move_counter += this.speed;
            }
            else {
                this.pos_index *= -1;
                this.move_counter = 0;
                this.moving = false; 
                this.pos.x = this.target.x;
                this.pos.y = this.target.y;
            }
            
        }
    };

    this.setTarget = function() {
        this.target = createVector(this.pos_two.x, this.pos_two.y);
        if(this.pos_index == -1) {
            this.target = createVector(this.pos_one.x, this.pos_one.y);
        }
    };
}