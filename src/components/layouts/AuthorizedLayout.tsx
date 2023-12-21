import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthorizedLayout = () => {
	const navigate = useNavigate();

	const user = false;

	useEffect(() => {
		if (!user) {
			navigate('/auth');
		}
	}, []);

	return <div></div>;
};
