function Blob(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
    this.speed = createVector(0, 10);

    this.show = function() {
        fill(255);
        noStroke();
        circle(this.pos.x, this.pos.y, this.size);
    };

    this.update = function() {
        this.fall();
        this.checkCollisions();
    };

    this.fall = function() {
        this.pos.add(this.speed);
        if(this.pos.y + this.size > height) {
            this.pos.y = 0;
        }
    };

    this.checkCollisions = function() {
        blocks.forEach(b => {
            let leftmost = b.pos.x;
            let rightmost = b.pos.x + b.size.x;
            let topmost = b.pos.y;
            let bottommost = b.pos.y + b.size.y;

            let x = this.pos.x;
            let y = this.pos.y;

            if((x >= leftmost && x <= rightmost) && (y >= topmost && y <= bottommost)) {
                noLoop();
                setTimeout(function() {
                    location.reload();
                }, 2000);
            }
        });
    };
}