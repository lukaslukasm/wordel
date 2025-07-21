"use client";
import * as types from "@/types/types";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import gsap from "gsap";

function LoggedUserSidebarCard({ user }: { user: types.user }) {
	const [isMinimalised, setIsMinimalised] = useState(false);

	const animation = gsap
		.timeline({ paused: true })
		.addLabel("start")
		.fromTo(
			".profile-card-board",
			{ scale: 1, y: 0, x: 0 },
			{ scale: 0.35, x: -99, y: -53, duration: 0.1 },
			"start"
		)
		.fromTo(
			".profile-card",
			{
				height: 282,
				width: "208px",
				padding: "24px 0",
			},
			{
				height: 90,
				width: "280px",
				padding: "16px",
				duration: 0.1,
			},
			"start"
		)
		.fromTo(
			".profile-card-text > p",
			{ textAlign: "center" },
			{ textAlign: "left" },
			"start"
		)
		.fromTo(
			".profile-card-text",
			{ x: 0, y: 0 },
			{ x: 32, y: -180, duration: 0.1 },
			"start"
		)
		.addLabel("end");

	useEffect(() => {
		if (isMinimalised) {
			animation.play();
		} else {
			animation.reverse(0);
		}

		//eslint-disable-next-line
	}, [isMinimalised]);

	return (
		<div
			className='profile-card'
			onClick={() => setIsMinimalised((prev) => !prev)}
		>
			<div className='profile-card-board'>
				{user.icon.map((color) => (
					<span key={uuid()} color={color} className='user-icon-tile' />
				))}
			</div>
			<div className='profile-card-text '>
				<p className='text-xl max-w-[180px] overflow-hidden'>{user.name}</p>
				<p className='italic overflow-hidden max-w-[180px] text-neutral-600'>
					{user.email}
				</p>
			</div>
		</div>
	);
}
export default LoggedUserSidebarCard;
