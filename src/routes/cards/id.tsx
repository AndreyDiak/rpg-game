import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CharacterPresitige } from '../../components/card/character/CharacterPresitige';
import { CharacterRarity } from '../../components/card/character/CharacterRarity';
import { CharacterType } from '../../components/card/character/CharacterType';
import { Button } from '../../components/common/button/Button';
import { CloseLayout } from '../../components/layouts/CloseLayout';
import { useCard } from '../../hooks/card/useCard';
import { useMotionCallback } from '../../hooks/useMotionCallback';

export const CardRoute = () => {
	const { cardId } = useParams();

	const navigate = useNavigate();

	const { card, loading } = useCard(Number(cardId));

	const onClose = useCallback(() => {
		navigate('/cards');
	}, [navigate]);

	const { styles, motionCallbackFn } = useMotionCallback({
		callbackFn: onClose,
		duration: 500,
		variants: {
			initial: { opacity: 0.7, x: '100%' },
			open: { opacity: 1, x: 0 },
		},
		transition: {
			ease: 'easeIn',
		},
	});

	// TODO @raymix
	// сделать общий компонента лоадера и ошибки

	if (loading) {
		return <span>Загрузка данных...</span>;
	}

	if (!card) {
		return (
			<span>
				Ошибка при загрузке данных карточки, пожалуйста, перезагрузите
				страницу...
			</span>
		);
	}

	const { character, prestige, level } = card;

	return (
		<motion.div
			{...styles}
			className='h-screen p-4 w-3/12 relative'
			style={{
				backgroundColor: 'var(--color-bg-gold-lighten)',
			}}
		>
			<CloseLayout
				onClose={motionCallbackFn}
				className='flex flex-col gap-4'
			>
				<div className='flex justify-between gap-3 items-center'>
					{/* character avatar */}
					<img src={character.imgPathWithBg} className='w-40 rounded-lg' />

					{/* type and rarity */}
					<div className='flex flex-col  gap-2 flex-1 justify-center'>
						<div className='flex items-start gap-4'>
							<div>
								<h4 className='font-semibold'>Тип персонажа</h4>
								<CharacterType type={character.type} />
							</div>
						</div>
						<div>
							<h4 className='font-semibold'>Редкость</h4>
							<CharacterRarity rarity={character.rarity} colored />
						</div>
					</div>
				</div>
				{/* character bio */}
				<div>
					<div className='font-semibold mb-3'>
						<h4 className='text-3xl'>{character.name}</h4>
						<span className='flex'>
							<CharacterPresitige prestige={prestige} />
						</span>
					</div>
					<div className='text-gray-700'>{character.about}</div>
				</div>

				{/* level */}
				<div>
					<div className='flex justify-center items-center border border-gray-700 rounded-full w-32 h-32 mx-auto'>
						<div className='flex flex-col items-center'>
							<h4 className='font-semibold text-xl'>Уровень</h4>
							<h6 className='font-bold text-orange-600 text-4xl'>
								{level}
							</h6>
						</div>
					</div>
					<Button
						variant='outline'
						size='lg'
						color='var(--color-bg-gold-dark)'
					>
						Улучшить
					</Button>
				</div>
				{/* character characteristics */}
			</CloseLayout>
		</motion.div>
	);
};
