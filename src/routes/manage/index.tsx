import { FunctionComponent, createElement } from 'react';
import { GiMagicGate, GiNinjaHeroicStance } from 'react-icons/gi';
import { SiNginxproxymanager } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { classNames } from '../../utils/functions/classNames';

interface Item {
	to: string;
	icon: FunctionComponent;
	text: string;
	className: string;
}

const items: Item[] = [
	{
		icon: GiNinjaHeroicStance,
		text: 'Призвать героя',
		className: 'left-1/2 -top-12 -translate-x-1/2',
		to: 'summon',
	},
	{
		icon: GiMagicGate,
		text: 'Слияние',
		className: '-left-12 top-1/2 -translate-y-1/2',
		to: 'fuse',
	},
];

export const ManageRoute = () => {
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div
				className='rounded-full w-80 h-80 relative'
				style={{
					backgroundColor: 'var(--color-bg-gold-dark)',
					border: '5px solid var(--color-bg-gold-darken)',
				}}
			>
				<span
					className='absolute top-1/2 left-1/2 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'
					style={{
						backgroundColor: 'var(--color-bg-gold)',
					}}
				>
					<SiNginxproxymanager size={50} color='white' />
				</span>

				{items.map((item) => (
					<Link
						key={item.text}
						to={`/manage/${item.to}`}
						className={classNames(
							'flex flex-col justify-center items-center rounded-full absolute text-white hover:text-yellow-100 text-xl',
							item.className,
						)}
					>
						<span className='cursor-pointer border border-white rounded-full p-1'>
							{createElement<{ size: number }>(item.icon, { size: 64 })}
						</span>
						<span>{item.text}</span>
					</Link>
				))}
			</div>
		</div>
	);
};
