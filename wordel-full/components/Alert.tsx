import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import StateContext from "./StateContext";

const Alert = () => {
	const [showAlert, setShowAlert] = useState(false);
	const [state, stateDispatch] = useContext(StateContext);

	useEffect(() => {
		if (state.alert.message === "") return;
		if (state.alert.permanent) {
			const timer = setTimeout(() => {
				setShowAlert(true);
			}, 1200);
			return () => {
				clearTimeout(timer);
			};
		} else if (!state.alert.instant) {
			const timer = setTimeout(() => {
				setShowAlert(true);
			}, 1600);
			const timer2 = setTimeout(() => {
				setShowAlert(false);
				stateDispatch({
					type: "alert",
					value: { message: "" },
				});
			}, 2600);
			return () => {
				clearTimeout(timer);
				clearTimeout(timer2);
			};
		} else {
			setShowAlert(true);
			const timer = setTimeout(() => {
				setShowAlert(false);
				stateDispatch({
					type: "alert",
					value: { message: "" },
				});
			}, 1000);
			return () => clearTimeout(timer);
		}

		//eslint-disable-next-line
	}, [state.alert]);

	return (
		<>
			<AnimatePresence>
				{showAlert && (
					<motion.div
						initial={{ opacity: 0, y: -10, x: "-50%" }}
						animate={{ opacity: 100, y: 0, transition: { duration: 0.1 } }}
						exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
						className='alert'
					>
						{state.alert.message}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
export default Alert;
