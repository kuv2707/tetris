import { useState, useEffect, useContext } from "react";
import { Block, Point } from "./block";
import TetrisBoard from "./TetrisBoard";
import "./App.css";
import { GameContext } from "./GameContext";

function App() {
	const [blocks, setBlocks] = useState<Block[]>([] as Block[]);
	const [time, setTime] = useState(0);
	const { BLOCK_SIZE } = useContext(GameContext);
	useEffect(
		function () {
			document.documentElement.style.setProperty(
				"--BLOCK_SIZE",
				BLOCK_SIZE + "px"
			);

			const intv = setInterval(function () {
				setBlocks((blocks) => [
					...blocks.map((block) => {
						if (block.alive === false) return block;
						let verdict = true;
						for (const coord of block.coords) {
							if (
								isOccupied(
									coord.x + block.initX,
									coord.y + block.initY + 1,
									blocks,
									block
								)
							) {
								verdict = false;
								break;
							}
						}

						if (verdict)
							return new Block(
								block.coords,
								block.initX,
								block.initY + 1,
								block.color
							);
						else {
							block.alive = false;

							return block;
						}
					}),
				]);
				if (time % 5 === 0) {
					const newb = getRandomBlock();
					setBlocks((blocks) => [...blocks, newb]);
					// setCurrentBlock(blocks[blocks.length - 1]);
				}

				setTime((time) => time + 1);
			}, 800);

			return () => clearInterval(intv);
		},
		[BLOCK_SIZE, time, blocks]
	);
	function isOccupied(x: number, y: number, blocks: Block[], currB: Block) {
		if (y > 12) return true;

		for (const block of blocks) {
			if (block === currB) continue;
			for (const coord of block.coords) {
				if (coord.x + block.initX === x && coord.y + block.initY === y)
					return true;
			}
		}
		return false;
	}
	useEffect(function () {
		function cb(e: KeyboardEvent) {
			let cbb = blocks[0];
			for (let i = 0; i < blocks.length; i++) {
				if (blocks[i].alive) {
					cbb = blocks[i];
					break;
				}
			}
			// setCurrentBlock(cbb)
			const currentBlock = cbb;
			if (e.key === "ArrowLeft") {
				if (
					!isOccupied(
						(currentBlock.initX - 1) % 17,
						currentBlock.initY,
						blocks,
						currentBlock
					)
				) {
					currentBlock.initX = (17+currentBlock.initX - 1) % 17;
					setBlocks((blocks) => [
						currentBlock,
						...blocks.filter((block) => block != currentBlock),
					]);
				}
			} else if (e.key === "ArrowRight") {
				if (
					!isOccupied(
						(currentBlock.initX + 1) % 17,
						currentBlock.initY,
						blocks,
						currentBlock
					)
				) {
					currentBlock.initX = (17+currentBlock.initX + 1) % 17;
					setBlocks((blocks) => [
						currentBlock,
						...blocks.filter((block) => block != currentBlock),
					]);
				}
			}
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
