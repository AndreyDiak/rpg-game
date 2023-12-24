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
		<div>
			{LINKS.map(({ title, to }) => (
				<Link to={to} key={title}>
					{title}
				</Link>
			))}
			<button onClick={signOut}>Выйти</button>
		</div>
	);
});
