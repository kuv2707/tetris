import { Block } from "./block";
import React from "react";
import styles from "./TetrisBlock.module.css";
import { GameContext } from "./GameContext";
function TetrisBlock({
	block,
}: {
	block: Block;
}) {
	const { BLOCK_SIZE } = React.useContext(GameContext);
	

	return (
		<>
			{block.coords.map((coord) => (
				<div
					key={coord.x + " " + coord.y}
					className={styles.block}
					style={{
						left: (coord.x+block.initX) * BLOCK_SIZE,
						top: (coord.y + block.initY) * BLOCK_SIZE,
						// padding:"5px",
						backgroundColor: "red",
					}}
				></div>
			))}

            {/* <div className={styles.block} style={{
                left:block.initX*BLOCK_SIZE,
                top:t*BLOCK_SIZE,
            }}></div> */}
		</>
	);
}

export default TetrisBlock;
