import { FunctionComponent, HTMLAttributes, createElement, memo } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { IoShieldSharp } from 'react-icons/io5';
import { PiSwordBold } from 'react-icons/pi';
import { Characteristics } from '../../../typings/character';

type Indicator = keyof Characteristics;

const indicatorToIconMap: Record<Indicator, FunctionComponent> = {
	hp: FaHeart,
	damage: PiSwordBold,
	armor: IoShieldSharp,
};

interface Props {
	size?: number;
	color?: string;
	indicator: Indicator;
}

export const CharacterIndicator = memo(
	({ indicator, size = 20, color = 'white' }: Props) => {
		return createElement<HTMLAttributes<SVGElement> & { size: number }>(
			indicatorToIconMap[indicator],
			{ size, color },
		);
	},
);
