import { Outlet } from 'react-router-dom';

import backgroundImageUrl from '../../assets/images/main_background.jpg';

export const AppLayout = () => {
	return (
		<div
			className='w-full h-screen'
			style={{
				backgroundSize: 'cover',
				background: `
				linear-gradient(
				rgba(0, 0, 0, 0.7)
				,rgba(0, 0, 0, 0.6)
				), url(${backgroundImageUrl})`,
			}}
		>
			<Outlet />
		</div>
	);
};
