"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import generateIcon from "../../../tools/generateIcon";
import CustomInput from "../../../components/CustomInput";
import StateContext from "../../../components/StateContext";
import SubpageHeader from "../../../components/SubpageHeader";
import { MutatingDots } from "react-loader-spinner";
import isEmailValid from "@/tools/isEmailValid";

const EMPTY_ERR = { message: "", type: "" };
const VALID_EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Signin() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [nickname, setNickname] = useState("");
	const [errMsg, setErrMsg] = useState(EMPTY_ERR);
	const [password, setPassword] = useState("");
	const [saveLogIn, setSaveLogIn] = useState(false);
	const nicknameRef = useRef<HTMLElement>();
	const [, setUser] = useContext(StateContext);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrMsg(EMPTY_ERR);
		try {
			if (!isEmailValid(email))
				throw { message: "tento email nie je validný", type: "email" };
			if (nickname.length > 16)
				throw { message: "nickname môže mať max 16 znakov", type: "name" };
			const req = await fetch(`/api/signin`, {
				method: "POST",
				mode: "cors",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: nickname,
					email: email,
					password: password,
					icon: generateIcon(),
				}),
			});
			const res = await req.json();
			if (req.status !== 200) throw { message: res.message, type: res.type };
			if (saveLogIn) {
				localStorage.setItem("jwt", res.token);
			} else {
				sessionStorage.setItem("jwt", res.token);
			}
			setUser((prev) => ({ ...prev, user: res.user }));
			router.push("/");
		} catch (error: any) {
			setErrMsg(error);
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
			case "saveUserLogIn":
				setSaveLogIn(e.target.checked);
				break;
			case "name":
				setNickname(e.target.value);
				break;
		}
	};

	useEffect(() => {
		nicknameRef.current = document.getElementsByName("name")[0];
		nicknameRef.current.focus();
	}, []);

	return (
		<div className='login-wrap'>
			<SubpageHeader />
			<h3 className='mb-2 text-xl'>Registrácia</h3>
			<form className='flex flex-col items-center gap-3'>
				<label htmlFor='nickname'>Name</label>
				<CustomInput
					name='name'
					placeholder='name'
					errMsg={errMsg}
					type='text'
					value={nickname}
					onChange={handleChange}
				/>
				<label htmlFor='email'>Email</label>
				<CustomInput
					name='email'
					placeholder='email'
					errMsg={errMsg}
					type='email'
					value={email}
					onChange={handleChange}
				/>
				<label htmlFor='password'>Heslo</label>
				<CustomInput
					name='password'
					placeholder='password'
					errMsg={errMsg}
					type='password'
					value={password}
					onChange={handleChange}
				/>
				<label htmlFor='saveUserLogIn'>
					<input
						className='cekboks'
						name='saveUserLogIn'
						type='checkbox'
						checked={saveLogIn}
						onChange={handleChange}
					/>{" "}
					Neodhlasuj ma
				</label>
				<p className='h-2 mt-2 font-normal text-red-700'>{errMsg.message}</p>
				{loading ? (
					<MutatingDots
						height='100'
						width='100'
						color='#4fa94d'
						secondaryColor='#4fa94d'
						radius='12.5'
						ariaLabel='mutating-dots-loading'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
				) : (
					<button
						className='btn mt-4'
						disabled={!email || !password || !nickname}
						onClick={handleSubmit}
					>
						Registrovať sa
					</button>
				)}
			</form>
			<Link href='/login' className='underline text-neutral-400'>
				Prihlásenie
			</Link>
		</div>
	);
}
export default Signin;
