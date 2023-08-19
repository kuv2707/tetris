import { createContext } from "react";
const GameContext = createContext({ time: 0,BLOCK_SIZE:50 } as GameContextType);

interface GameContextType {
	time: number;
    BLOCK_SIZE:number;
    // WIDTH:number;
}


export { GameContext }