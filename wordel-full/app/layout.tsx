'use client';

import StateContextProvider from '@/components/StateContextProvider';
import './globals.css';
import Head from './head';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head />
			<body>
				<StateContextProvider>{children}</StateContextProvider>
			</body>
		</html>
	);
}
