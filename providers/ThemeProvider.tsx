'use client';
import { Theme, ThemeContext } from '../contexts/ThemeContext';
import { PropsWithChildren, useEffect, useState } from 'react';

const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
