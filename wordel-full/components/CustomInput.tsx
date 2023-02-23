import { calcLength, motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as types from "../types/types";

function CustomInput({
	name,
	placeholder,
	type,
	value,
	onChange,
	errMsg,
}: {
	name: string;
	placeholder: string;
	type: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	errMsg: types.formErr;
}) {
	const [isErr, setIsErr] = useState(false);

	useEffect(() => {
		if (errMsg.message === "") setIsErr(false);
		if (errMsg.type === name) setIsErr(true);
		//eslint-disable-next-line
	}, [errMsg]);

	const variants = {
		i: {
			x: 0,
		},
		a: {
			x: [0, 50, -50, 30, -30, 10, -10, 0],
			transition: {
				duration: 0.3,
				type: "spring",
				stiffness: 100,
			},
		},
	};

	return (
		<motion.input
			name={name}
			placeholder={placeholder}
			type={type}
			value={value}
			onChange={onChange}
			className={`form-input ${isErr && "invalid-input"}`}
			variants={isErr ? variants : undefined}
			initial='i'
			animate='a'
		/>
	);
}
export default CustomInput;
