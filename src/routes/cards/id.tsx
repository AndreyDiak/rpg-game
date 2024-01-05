import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CharacterIndicator } from '../../components/card/character/CharacterIndicator';
import { CharacterPresitige } from '../../components/card/character/CharacterPresitige';
import { CharacterRarity } from '../../components/card/character/CharacterRarity';
import { CharacterType } from '../../components/card/character/CharacterType';
import { Button } from '../../components/common/button/Button';
import { CloseLayout } from '../../components/layouts/CloseLayout';
import { useCard } from '../../hooks/card/useCard';
import { useMotionCallback } from '../../hooks/useMotionCallback';
import { Characteristics } from '../../typings/character';

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
				className='flex flex-col gap-4 h-full'
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

				{/* character indicators */}
				<div
					className='flex flex-col rounded-md justify-center items-center py-6 space-y-4'
					style={{
						backgroundColor: 'var(--color-bg-gold-light)',
					}}
				>
					<h4 className='text-2xl text-gray-100'>Характеристики</h4>
					<div className='flex gap-6 relative'>
						<span
							className='absolute h-0.5 w-full top-6 left-1/2 -translate-x-1/2 z-0'
							style={{
								backgroundColor: 'var(--color-bg-gold-darken)',
							}}
						/>
						{(['hp', 'damage', 'armor'] as (keyof Characteristics)[]).map(
							(v) => (
								<div
									className='flex flex-col items-center z-10'
									key={v}
								>
									<div
										className='flex justify-center items-center rounded-full w-12 h-12'
										style={{
											backgroundColor: 'var(--color-bg-gold)',
											border:
												'1px solid var(--color-bg-gold-darken)',
										}}
									>
										<CharacterIndicator indicator={v} size={26} />
									</div>
									<h4 className='text-xl'>
										{character.characteristics[v]}
									</h4>
								</div>
							),
						)}
					</div>
				</div>

				{/* skill */}
				{character.skill && (
					<div>
						<h4 className='text-2xl text-gray-100'>Навык</h4>
						<h6>{character.skill.about}</h6>
						<div>{character.skill.category}</div>
						<div>{character.skill.type}</div>
						<div>{character.skill.count}</div>
					</div>
				)}

				{/* level upgrade */}
				<div className='flex flex-1 items-center justify-center'>
					<div>
						<div className='flex justify-center items-center border border-gray-700 rounded-full w-24 h-24 mx-auto'>
							<div className='flex flex-col items-center'>
								<h4 className='font-normal text-lg'>Уровень</h4>
								<h6 className='font-bold text-orange-600 text-3xl'>
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
				</div>
			</CloseLayout>
		</motion.div>
	);
};
