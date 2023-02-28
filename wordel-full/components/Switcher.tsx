import { motion } from "framer-motion";
import { useContext } from "react";
import StateContext from "./StateContext";

function Switcher() {
	const [state, stateDispatch] = useContext(StateContext);

	const sliderVariants = {
		i: { x: 2 },
		a: {
			x: state.language === "sk" ? 0 : 64,
			transition: { type: "power", duration: 0.2 },
		},
	};

	return (
		<button
			onClick={() => stateDispatch({ type: "lang" })}
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
