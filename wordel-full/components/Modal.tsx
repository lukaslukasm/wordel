import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import x from '/public/assets/x.png';

function Modal({
	setShowModal,
	children,
}: {
	setShowModal: Function;
	children: React.ReactNode;
}) {
	const [hideModal, setHideModal] = useState(false);

	const handleXClick = () => {
		setHideModal(true);
		const timer = setTimeout(() => {
			setShowModal(false);
		}, 100);
		return () => clearTimeout(timer);
	};

	return (
		// background
		<div
			className='modal-bg overflow-hidden'
			onClick={() => handleXClick()}
		>
			<AnimatePresence>
				{!hideModal && (
					<motion.div
						onClick={(e) => e.stopPropagation()}
						className='modal'
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 100, transition: { duration: 0.1 } }}
						exit={{ y: 20, opacity: 0, transition: { duration: 0.1 } }}
					>
						<button
							className='h-6 absolute right-4 top-3'
							onClick={() => handleXClick()}
						>
							<Image
								src={x}
								alt=''
								className='invert w-4'
							/>
						</button>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
export default Modal;
