import { motion } from 'framer-motion';
import { Fragment, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CharacterPresitige } from '../../components/card/character/CharacterPresitige';
import { CharacterType } from '../../components/card/character/CharacterType';
import { Button } from '../../components/common/button/Button';
import { CloseLayout } from '../../components/layouts/CloseLayout';
import { CharacterIndicator } from '../../components/pages/character/CharacterIndicator';
import { CharacterRarity } from '../../components/pages/character/CharacterRarity';
import { CharacterSkill } from '../../components/pages/character/CharacterSkill';
import { CharacterUpgrade } from '../../components/pages/character/CharacterUpgrade';
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
			className='h-screen p-4 w-4/12 relative'
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

				{/* level upgrade */}
				<div className='flex w-full justify-start space-x-8'>
					<div
						className='flex justify-center items-center rounded-full w-20 h-20'
						style={{
							backgroundColor: 'var(--color-bg-gold)',
							border: '1px solid var(--color-bg-gold-darken)',
						}}
					>
						<div className='flex flex-col items-center justify-center text-white w-14 h-14'>
							<h4 className='font-normal text-xs uppercase'>Уровень</h4>
							<h6 className='font-bold text-3xl'>{level}</h6>
						</div>
					</div>
					<div>
						<CharacterUpgrade level={59} />
						<div className='flex mt-2'>
							<Button
								variant='primary'
								size='lg'
								style={{
									borderRadius: 24,
									paddingLeft: 32,
									paddingRight: 32,
								}}
							>
								Улучшить
							</Button>
						</div>
					</div>
				</div>

				{/* character indicators */}
				<div
					className='flex flex-col rounded-md justify-center items-center p-6'
					style={{
						backgroundColor: 'var(--color-bg-gold-light)',
					}}
				>
					<div>
						<h4 className='text-2xl text-gray-100 mb-4'>
							Характеристики
						</h4>
						<div className='flex gap-6 relative'>
							<span
								className='absolute h-0.5 w-full top-6 left-1/2 -translate-x-1/2 z-0'
								style={{
									backgroundColor: 'var(--color-bg-gold-darken)',
								}}
							/>
							{(
								['hp', 'damage', 'armor'] as (keyof Characteristics)[]
							).map((v) => (
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
							))}
						</div>
					</div>

					{/* skill */}
					{character.skill && (
						<Fragment>
							{/* gold line between sections */}
							<span
								className='w-10/12 rounded-lg my-4'
								style={{
									backgroundColor: 'var(--color-bg-gold-darken)',
									height: 1,
								}}
							/>
							<CharacterSkill
								skill={character.skill}
								characterType={character.type}
							/>
						</Fragment>
					)}
				</div>
			</CloseLayout>
		</motion.div>
	);
};
