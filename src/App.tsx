import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ThemeProvider from './providers/ThemeProvider';
import { router } from './router';
import { store } from './store';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<RouterProvider router={router} />;
				<ToastContainer />
			</ThemeProvider>
		</Provider>
	);
}

export default App;
