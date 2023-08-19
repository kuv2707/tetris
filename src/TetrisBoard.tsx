import TetrisBlock from "./TetrisBlock"
import { Block } from "./block"
function TetrisBoard({
	blocks
}: {
	blocks: Block[];
}) {
	return (
		<div>
			{blocks.map((block) => (
				<TetrisBlock block={block} key={block.id}></TetrisBlock>
			))}
		</div>
	);
}

export default TetrisBoard
