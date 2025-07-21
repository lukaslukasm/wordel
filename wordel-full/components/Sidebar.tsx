import x from "/public/assets/x.png";
import jazyk from "/public/assets/jazyk.png";
import Switcher from "./Switcher";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useContext, useState } from "react";
import StateContext from "./StateContext";
import barChart from "/public/assets/bar-chart.png";
import arrow from "/public/assets/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import LoggedUserSidebarCard from "./LoggedUserSidebarCard";

function Sidebar({ setShowMenu }: { setShowMenu: Function }) {
	const [show, setShow] = useState(true);
	const [state, stateDispatch] = useContext(StateContext);
	const { language, user, isStatsOpen } = state;

	// zatvaranie menu
	useEffect(() => {
		if (show) return;
		const timer = setTimeout(() => {
			setShowMenu(false);
		}, 200);
		return () => clearTimeout(timer);
		//eslint-disable-next-line
	}, [show]);

	// odhlasenie
	const handleSignOut = () => {
		if (localStorage.getItem("jwt")) localStorage.removeItem("jwt");
		if (sessionStorage.getItem("jwt")) sessionStorage.removeItem("jwt");
		stateDispatch({ type: "user", value: null });
	};

	return (
		<AnimatePresence>
			{show && (
				// bg
				<motion.div
					onClick={() => setShow(false)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.1 } }}
					exit={{ opacity: 0 }}
					className='modal-bg justify-start'
				>
					{/* the actual menu */}
					<motion.nav
						onClick={(e) => e.stopPropagation()}
						initial={{ x: -320 }}
						animate={{ x: 0, transition: { type: "ease-in", duration: 0.2 } }}
						exit={{ x: -320 }}
						className='sidebar'
					>
						<button
							className='h-6 absolute flex justify-end top-4 right-2'
							onClick={() => setShow(false)}
						>
							<Image src={x} alt='' className='w-4 mr-2 invert' />
						</button>
						<div className='flex w-full pt-[max(20px,5vh)] flex-col overflow-y-scroll justify-center'>
							{!user ? (
								// karticka not logged user
								<div className='bg-neutral-800 border-t-2 border-neutral-700 rounded-xl mx-3 px-3 mt-4 mb-6 py-6'>
									<p className='italic mb-2 w-full text-center'>
										Registruj sa a získaj možnosť zobrazenia osobných štatistík!
									</p>
									<div className='flex justify-center w-full gap-4'>
										<Link href='/login' className='menu-btn'>
											Prihlásiť
										</Link>
										<Link href='/signin' className='menu-btn'>
											Registrovať
										</Link>
									</div>
								</div>
							) : (
								// karticka a moznosti logged user
								<LoggedUserSidebarCard user={user} />
							)}
							{/* logged + notlogged moznosti */}
							<span className='menu-item-link'>
								<Image src={barChart} className='invert w-6 mr-2' alt='' />
								<span
									onClick={() => {
										setShow(false);
										stateDispatch({ type: "toggleStats" });
									}}
									className='w-full text-left mt-0.5'
								>
									Štatistiky
								</span>
								<Image src={arrow} className='arrow invert w-6' alt='' />
							</span>
							<span className='menu-item-link'>
								<span className='font-black text-2xl leading-none w-8 text-center mr-2'>
									?
								</span>
								<span
									onClick={() => {
										setShow(false);
										stateDispatch({ type: "toggleHelp" });
									}}
									className='w-full text-left mt-0.5'
								>
									Pomocník
								</span>
								<Image src={arrow} className='arrow invert w-6' alt='' />
							</span>
							{/* nastavenia hry */}
							<span className='kategoria mt-8'>Nastavenia hry</span>
							<span className='menu-item'>
								<Image src={jazyk} className='invert w-6 mr-2' alt='' />
								<span className='w-full text-left'>Jazyk</span>
								<Switcher />
							</span>
							<span className='w-full mt-2 flex justify-center items-center'>
								<span
									className='flex text-3xl leading-none 
                rounded-md h-6 w-6 justify-center text-center 
                items-center font-black text-neutral-600'
								>
									!
								</span>
								<span className=' ml-1 italic text-sm text-neutral-600'>
									Zmena jazyka reštartuje hru
								</span>
							</span>
							<div className='h-full flex items-end my-5'>
								{user && (
									<a
										onClick={handleSignOut}
										className='menu-btn bg-neutral-900 hover:bg-neutral-800 hover:bg-opacity-50 text-red-700 mx-auto'
									>
										Odhlásiť sa
									</a>
								)}
							</div>
						</div>
					</motion.nav>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
export default Sidebar;
