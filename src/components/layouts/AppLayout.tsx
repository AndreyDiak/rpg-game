import { Outlet } from 'react-router-dom';
import ThemeProvider from '../../providers/ThemeProvider';

export const AppLayout = () => {
	return (
		<ThemeProvider>
			<Outlet />;
		</ThemeProvider>
	);
};
