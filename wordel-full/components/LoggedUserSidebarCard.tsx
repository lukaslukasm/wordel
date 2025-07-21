'use client';
import * as types from '@/types/types';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

function LoggedUserSidebarCard({ user }: { user: types.user }) {
	return (
		<div className='profile-card cursor-default'>
			<div className='profile-card-board'>
				{user.icon.map((color) => (
					<span
						key={uuid()}
						color={color}
						className='user-icon-tile'
					/>
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
