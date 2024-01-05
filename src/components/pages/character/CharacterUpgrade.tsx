import { memo } from 'react';
import { prices } from '../../../models/upgrade.model';

import gemCoin from './../../../assets/images/coins/gem.svg';
import goldCoin from './../../../assets/images/coins/gold.svg';
import silverCoin from './../../../assets/images/coins/silver.svg';

const priceKeyToCoinMap: Record<string, string> = {
	gem: gemCoin,
	gold: goldCoin,
	silver: silverCoin,
};

const mock_wallet = 500;

export const CharacterUpgrade = memo(({ level }: { level: number }) => {
	const price = prices[level];

	return (
		<div className='flex justify-center gap-4'>
			{Object.entries(price).map(([key, value]) => (
				<div key={key} className='flex items-center space-x-2'>
					<img src={priceKeyToCoinMap[key]} alt='' className='w-8' />
					<div className='flex items-center space-x-1'>
						<h6>{value}</h6> <span>/</span> <h6>{mock_wallet}</h6>
					</div>
				</div>
			))}
		</div>
	);
});
