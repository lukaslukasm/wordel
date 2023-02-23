import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import StateContext from "./StateContext";
import * as types from "../types/types";

function Switcher() {
	const [state, setState] =
		useContext<
			[types.state, React.Dispatch<React.SetStateAction<types.state>>]
		>(StateContext);

	const sliderVariants = {
		i: { x: 2 },
		a: {
			x: state.language === "sk" ? 0 : 64,
			transition: { type: "power", duration: 0.2 },
		},
	};

	return (
		<button
			onClick={() =>
				setState((prev) => ({
					...prev,
					language: (prev.language === "sk" ? "en" : "sk") as types.Lang,
				}))
			}
			className='w-34 relative rounded-md p-1 h-10 bg-neutral-800 inline-flex'
		>
			<motion.span
				className={`${state.language === "sk" ? "onlang" : "offlang"}`}
			>
				SK
			</motion.span>
			<motion.span
				className={`${state.language === "sk" ? "offlang" : "onlang"}`}
			>
				EN
			</motion.span>
			<motion.span
				variants={sliderVariants}
				initial='i'
				animate='a'
				className='slider-switcher'
			></motion.span>
		</button>
	);
}
export default Switcher;
