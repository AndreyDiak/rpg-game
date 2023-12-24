import { Outlet } from 'react-router-dom';
import ThemeProvider from '../../providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const AppLayout = () => {
	return (
		<ThemeProvider>
			<Outlet />
			<ToastContainer />
		</ThemeProvider>
	);
};
