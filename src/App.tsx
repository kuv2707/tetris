import { useState, useEffect, useContext } from "react";
import { Block, Point } from "./block";
import TetrisBoard from "./TetrisBoard";
import "./App.css";
import { GameContext } from "./GameContext";

function App() {
	const [blocks, setBlocks] = useState<Block[]>([] as Block[]);
	const [time, setTime] = useState(0);
	const [currentBlock, setCurrentBlock] = useState<Block>(blocks[0]);
	const { BLOCK_SIZE } = useContext(GameContext);
	useEffect(
		function () {
			document.documentElement.style.setProperty(
				"--BLOCK_SIZE",
				BLOCK_SIZE + "px"
			);

			function isOccupied(x:number,y:number) {
        if(y>11) return true
        else return false
				for (const block of blocks) {
					for (const coord of block.coords) {
						if (
							coord.x + block.initX === x &&
							coord.y + block.initY === y
						)
							return true;
					}
				}
				return false;
			}
			const intv = setInterval(function () {
				console.log(time);
				setBlocks((blocks) => [
					...blocks.map((block) => {
            if(block.alive===false) return block
						if (!isOccupied(block.initX, block.initY + 1))
							return new Block(
								block.coords,
								block.initX,
								block.initY + 1
							);
						else {
              block.alive=false;

              return block;
            }
					}),
				]);
				if (time % 50 === 0) {
					const newb = getRandomBlock();
					setBlocks((blocks)=>[...blocks, newb]);
					setCurrentBlock(blocks[blocks.length - 1]);
				}

				setTime((time) => time + 1);
			}, 200);

			return () => clearInterval(intv);
		},
		[BLOCK_SIZE, time, blocks]
	);

	useEffect(function () {
		function cb(e: KeyboardEvent) {
			if (e.key === "ArrowLeft")
				currentBlock.initX > 0 ? currentBlock.initX-- : 10;
			else if (e.key === "ArrowRight") currentBlock.initX++;
		}
		document.addEventListener("keydown", cb);
		return () => document.removeEventListener("keydown", cb);
	});

	return (
		<GameContext.Provider
			value={{
				time,
				BLOCK_SIZE: 50,
			}}
		>
			<TetrisBoard blocks={blocks}></TetrisBoard>
			{/* <Widgets currentBlock={currentBlock}></Widgets> */}
		</GameContext.Provider>
	);
}

const WIDTH = 10;

function getRandomBlock() {
	return new Block(
		[new Point(0, 0), new Point(0, 1), new Point(1, 0), new Point(1, 1)],
		Math.floor(Math.random() * WIDTH),
		0
	);
}

export default App;
