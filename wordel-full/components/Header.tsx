import { useContext, useEffect, useState } from "react";
import flagSk from "/public/assets/flagSK.png";
import flagEn from "/public/assets/flagEN.png";
import HelpModal from "./HelpModal";
import Image from "next/image";
import Sidebar from "./Sidebar";
import barChart from "/public/assets/bar-chart.png";
import StatModal from "./StatModal";
import StateContext from "./StateContext";

function Header() {
	const [showMenu, setShowMenu] = useState(false);
	const [state, stateDispatch] = useContext(StateContext);

	const toggleStats = () => stateDispatch({ type: "toggleStats" });

	const toggleHelp = () => stateDispatch({ type: "toggleHelp" });

	return (
		<header>
			<button
				className='w-10 flex pl-1.5 justify-center items-start flex-col gap-2'
				onClick={() => setShowMenu(true)}
			>
				<span className='bg-ourwhite h-[3px] w-6 rounded-full' />
				<span className='bg-ourwhite h-[3px] w-6 rounded-full' />
			</button>
			<h1 className='flex pl-10 items-center gap-1 sm:gap-2'>
				Wordeľ
				{state.language === "sk" ? (
					<Image src={flagSk} alt='' className='w-6 sm:w-8 inline-block' />
				) : (
					<Image src={flagEn} alt='' className='w-6 sm:w-8 inline-block' />
				)}
			</h1>
			<div className='flex gap-4'>
				<button
					onClick={() => toggleStats()}
					className='flex invert opacity-95 font-black justify-center items-center text-2xl rounded-md w-5 h-8'
				>
					<Image src={barChart} alt='' />
				</button>
				<button
					onClick={() => toggleHelp()}
					className='flex font-black justify-center items-center text-2xl rounded-md w-6 h-8'
				>
					?
				</button>
			</div>

			{state.isHelpOpen && <HelpModal setShowModal={toggleHelp} />}

			{showMenu ? <Sidebar setShowMenu={setShowMenu} /> : ""}

			{state.isStatsOpen && <StatModal setIsStatsOpen={toggleStats} />}
		</header>
	);
}
export default Header;
