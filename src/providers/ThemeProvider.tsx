import { PropsWithChildren, useEffect, useState } from 'react';

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

const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
