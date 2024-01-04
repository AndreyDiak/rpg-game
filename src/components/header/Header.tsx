import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Link = {
	title: string;
	to: string;
};

const LINKS: Link[] = [
	{
		title: 'Карты',
		to: '/cards',
	},
	{
		title: 'Играть',
		to: '/',
	},
	{
		title: 'Магазин',
		to: '/shop',
	},
];

export const Header = memo(() => {
	const { signOut } = useAuth();

	return (
		<div className='absolute top-2 w-full flex justify-center'>
			<div className='flex space-x-2'>
				{LINKS.map(({ title, to }) => (
					<Link to={to} key={title} className='header-item'>
						{title}
					</Link>
				))}
				<button onClick={signOut} className='header-item'>
					Выйти
				</button>
			</div>
		</div>
	);
});
