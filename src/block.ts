
class Point {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

class Block
{
    coords:Point[];
    constructor(coords:Point[]) {
        this.coords = coords;
    }
}

export  {Block, Point}