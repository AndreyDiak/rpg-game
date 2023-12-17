import { createContext } from 'react';

interface ThemeContextProps {
	theme: Theme;
	setTheme(theme: Theme): void;
}

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);
