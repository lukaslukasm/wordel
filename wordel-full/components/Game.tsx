"use client";
import { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import Line from "./Line";
import Alert from "./Alert";
import Keyboard from "./Keyboard";
import StateContext from "./StateContext";

function Game() {
	const [guesses, setGuesses] = useState([] as string[]);
	const [theWord, setTheWord] = useState<string>("");
	const [badOrientation, setBadOrientation] = useState<boolean>(false);
	const [currentGuess, setCurrentGuess] = useState<string>("");
	const [game, setGame] = useState(true);
	const [win, setWin] = useState(false);
	const [guessTiles, setGuessTiles] = useState<React.ReactElement<any, any>[]>(
		[]
	);
	const [backspace, setBackspace] = useState(false);
	const [shake, setShake] = useState(false);
	const [dictionary, setDictionary] = useState([] as string[]);

	const [state, stateDispatch] = useContext(StateContext);
	const [emptyTiles, setEmptyTiles] = useState<React.ReactElement<any, any>[]>(
		[]
	);

	useEffect(() => {
		// setting empty tiles
		let arr = [];
		for (let i = 0; i < 6; i++) {
			arr.push(<Line key={uuid()} type='empty' />);
		}
		setEmptyTiles(arr);
		fetchTheWord();
		fetchDictionary();
		// window resize listener
		window.addEventListener("resize", () =>
			setBadOrientation(
				window.innerHeight < window.innerWidth && window.innerHeight < 450
			)
		);
		return () => window.removeEventListener("resize", () => {});
		//eslint-disable-next-line
	}, []);

	// plnenie guesstiles a empty tiles
	useEffect(() => {
		setEmptyTiles((prev) => prev.slice(0, -1));
		if (guesses.length >= 1)
			setGuessTiles((prev) => [
				...prev,
				<Line
					win={win}
					key={uuid()}
					word={guesses[guesses.length - 1]}
					type='guess'
					solution={theWord}
				/>,
			]);
		//eslint-disable-next-line
	}, [guesses]);

	// shake ked je nesposivne slovo
	useEffect(() => {
		if (!shake) return;
		const timer = setTimeout(() => setShake(false), 500);
		return () => clearTimeout(timer);
	}, [shake]);

	// stats
	useEffect(() => {
		if (game) return;
		if (win) {
			stateDispatch({ type: "win", try: guesses.length });
		} else {
			stateDispatch({ type: "loss", value: theWord });
		}
		const timer = setTimeout(
			() => stateDispatch({ type: "toggleStats" }),
			2000
		);
		return () => clearTimeout(timer);
		//eslint-disable-next-line
	}, [game]);

	const fetchTheWord = async () => {
		let promise;
		if (state.language === "sk") promise = await fetch("/data/slovenske.txt");
		else promise = await fetch("/data/answers.txt");
		const result = await promise.text();
		let answers = [...result.split("\n")];
		let pickedWord =
			answers[Math.floor(Math.random() * answers.length)].toLowerCase();
		setTheWord(pickedWord);
		console.log(pickedWord.toUpperCase());
	};
	const fetchDictionary = async () => {
		let dict;
		if (state.language === "sk") dict = await fetch("/data/slovnik.txt");
		else dict = await fetch("/data/guesses.txt");
		const result = await dict.text();
		setDictionary([...result.split("\n")]);
	};

	// Enter handler
	const enterHandler = async () => {
		if (dictionary.indexOf(currentGuess) === -1) {
			stateDispatch({
				type: "alert",
				value: { message: "Nespisovné", instant: true },
			});
			setShake(true);
			return;
		}
		setGuesses((prev) => {
			if (prev.length === 5) {
				setGame(false);
			}
			return [...prev, currentGuess];
		});
		if (currentGuess === theWord) {
			setWin(true);
			setGame(false);
		}
		setCurrentGuess("");
		if (guesses.length !== 5 && currentGuess !== theWord) return;
		const timer = setTimeout(
			() => stateDispatch({ type: "isStatsOpen" }),
			2000
		);
		return () => clearTimeout(timer);
	};

	// key press handler
	const keyPressedHandler = (e: KeyboardEvent) => {
		if (!isAlpha(e.key) && e.key !== "Enter" && e.key !== "Backspace") return;
		if (!game) return;
		if (e.key === "Enter" && currentGuess.length !== 5) return;
		switch (e.key) {
			case "Enter":
				enterHandler();
				break;
			case "Backspace":
				setCurrentGuess((prev) => prev.slice(0, -1));
				setBackspace(true);
				break;
			default:
				setCurrentGuess((prev) =>
					prev.length === 5 ? prev : prev.concat(e.key.toLowerCase())
				);
				break;
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", keyPressedHandler);
		return () => {
			document.removeEventListener("keydown", keyPressedHandler);
		};
		//eslint-disable-next-line
	}, [currentGuess]);

	const isAlpha = (c: string) => {
		return /^[A-Z]$/i.test(c);
	};

	return (
		<main className='w-full items-center flex justify-center'>
			{badOrientation === true ? (
				<h2 className='absolute text-center bottom-1/2 translate-y-1/2 left-0 right-0'>
					Wordeľ še bavi na vyšku.
				</h2>
			) : (
				<>
					{/* board */}
					<Alert />
					<div className='board'>
						{guesses && (
							<div className='flex flex-col justify-start'>{guessTiles}</div>
						)}
						{/* current guess */}
						<div className='flex flex-col'>
							{guesses.length < 6 && (
								<Line
									word={currentGuess}
									error={shake}
									type='current'
									backspace={backspace}
									setBackspace={setBackspace}
									win={win}
								/>
							)}
							{emptyTiles}
						</div>
					</div>
					<Keyboard
						guesses={guesses}
						solution={theWord}
						keyPressedHandler={keyPressedHandler}
					/>
				</>
			)}
		</main>
	);
}

export default Game;
