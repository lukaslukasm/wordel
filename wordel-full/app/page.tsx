'use client';
import StateContext from '@/components/StateContext';
import uuid from 'react-uuid';
import { useContext, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Game from '@/components/Game';

export default function Home() {
	const [key, setKey] = useState(uuid());
	const [state] = useContext(StateContext);

	useEffect(() => {
		setKey(uuid());
	}, [state.language, state.restart]);

	return (
		<div className='max-h-svh overflow-hidden flex flex-col'>
			<Header />
			<Game key={key} />
		</div>
	);
}
