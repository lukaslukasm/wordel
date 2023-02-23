"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomInput from "../../../components/CustomInput";
import StateContext from "../../../components/StateContext";
import SubpageHeader from "../../../components/SubpageHeader";
import { MutatingDots } from "react-loader-spinner";
import isEmailValid from "@/tools/isEmailValid";

const EMPTY_ERR = { message: "", type: "" };

function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [errMsg, setErrMsg] = useState(EMPTY_ERR);
	const [password, setPassword] = useState("");
	const [saveLogIn, setSaveLogIn] = useState(false);
	const emailRef = useRef<HTMLElement>();
	const [, setUser] = useContext(StateContext);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrMsg(EMPTY_ERR);
		try {
			if (!isEmailValid(email))
				throw { message: "tento email nie je validný", type: "email" };
			const req = await fetch(`/api/login`, {
				method: "POST",
				mode: "cors",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			const res = await req.json();
			if (req.status !== 200) throw { message: res.message, type: res.type };
			if (saveLogIn) {
				localStorage.setItem("jwt", res.token);
			} else {
				sessionStorage.setItem("jwt", res.token);
			}
			setUser((prev) => ({
				...prev,
				language: res.user.language,
				user: res.user,
			}));
			router.push("/");
		} catch (error: any) {
			setLoading(false);
			setErrMsg(error);
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
		}
	};

	useEffect(() => {
		emailRef.current = document.getElementsByName("email")[0];
		emailRef.current.focus();
	}, []);

	return (
		<div className='login-wrap'>
			<SubpageHeader />
			<h3 className='mb-2 text-xl'>Prihlásenie</h3>
			<form className='flex flex-col items-center gap-3'>
				<label htmlFor='email'>Email</label>
				<CustomInput
					name='email'
					placeholder='email'
					errMsg={errMsg}
					type='email'
					value={email}
					onChange={handleChange}
				/>
				<label htmlFor='email'>Heslo</label>
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
						disabled={!email || !password}
						onClick={handleSubmit}
					>
						Prihlásiť sa
					</button>
				)}
			</form>
			<Link href='/signin' className='underline text-neutral-400'>
				Registrácia
			</Link>
		</div>
	);
}
export default Login;
