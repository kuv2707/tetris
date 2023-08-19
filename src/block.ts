
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
    initX:number;
    initY:number;
    id:string;
    createTime:number;
    lastSavedTime:number;
    alive:boolean;
    constructor(coords:Point[],Y0:number,t:number) {
        this.coords = coords;
        this.initX = Y0;
        this.initY=t;
        this.id = Date.now()+" "+Math.random();
        this.createTime = t;
        this.lastSavedTime = 0;
        this.alive = true;
    }
}

export  {Block, Point}