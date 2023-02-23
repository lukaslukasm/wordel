import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { motion, useAnimationControls } from "framer-motion";
import Tile from "./Tile";

function Line({
	word,
	solution,
	type,
	error,
	backspace,
	setBackspace,
	setStatText,
	win,
}: {
	word?: string;
	solution?: string;
	type: string;
	error?: boolean;
	backspace?: boolean;
	setBackspace?: Function;
	setStatText?: Function;
	win?: boolean;
}) {
	const [tiles, setTiles] = useState([] as any[]);
	let ids = [];
	let arr: any = [];
	const controls = useAnimationControls();

	useEffect(() => {
		if (!error) return;
		controls.start({
			x: [0, -15, 15, -10, 10, -5, 5, 0],
			transition: { duration: 0.2 },
		});
		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		// eslint-disable-next-line
		arr = [];
		let WIPsolution = solution || "";
		let WIPword = word || "";
		let statTxt: string[] = [];
		if (type === "guess") {
			for (let i = 0; i < 5; i++) {
				if (WIPword[i] === WIPsolution[i]) {
					WIPsolution = WIPsolution.replace(WIPword[i], " ");
					if (word) {
						WIPword = WIPword.replace(word[i], "_");
						arr[i] = { char: word[i], tileClass: "green-tile" };
					}
					statTxt[i] = "🟩";
				}
			}
		}
		for (let i = 0; i < 5; i++) {
			switch (type) {
				case "guess":
					// uz napisane riadky
					let tileClass = "";

					// if (WIPsolution[i] === ' ')
					//   break;
					if (WIPsolution.indexOf(WIPword[i]) !== -1) {
						tileClass = "yellow-tile";
						WIPsolution = WIPsolution.replace(WIPword[i], " ");

						statTxt[i] = "🟨";
					} else {
						tileClass = "noluck-tile";
						statTxt[i] = "⬛️";
					}
					if (!arr[i] && word) arr[i] = { char: word[i], tileClass };
					break;
				case "current":
					// pocas pisania
					if (word && word[i])
						if (i === word.length - 1 && !backspace)
							arr.push(
								<motion.span
									initial={{ scale: 1.1 }}
									animate={{ scale: 1 }}
									key={uuid()}
									className='current-tile'
								>
									{word[i]}
								</motion.span>
							);
						else
							arr.push(
								<motion.span key={uuid()} className='current-tile'>
									{word[i]}
								</motion.span>
							);
					else {
						arr.push(<span key={uuid()} className='empty-tile' />);
						// console.log(i);
					}
					break;
				case "empty":
					arr.push(<span key={uuid()} className='empty-tile' />);
					break;
			}
		}
		if (backspace && setBackspace) setBackspace(false);

		setTiles(arr);
		if (type === "guess" && setStatText) {
			setStatText((prev: string[]) => [...prev, statTxt]);
		}
		//eslint-disable-next-line
	}, [word]);

	return (
		<motion.div
			animate={controls}
			className={`flex mt-1.5 flex-row gap-1.5 ${
				type === "guess" ? "justify-self-start" : "justify-self-end"
			}`}
		>
			{type !== "guess"
				? tiles
				: tiles.map((tile, i) => (
						<Tile
							key={uuid()}
							win={win}
							char={tile.char}
							index={i}
							tileClass={tile.tileClass}
						/>
				  ))}
		</motion.div>
	);
}
export default Line;
