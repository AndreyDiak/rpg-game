import { Session, User } from '@supabase/supabase-js';
import { Fragment, createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { AuthContextData } from '../../typings/auth';
import { Header } from '../header/Header';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthorizedLayout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				if (!session) {
					window.location.reload();
					navigate('/auth');
				}
			})
			.catch(() => {
				navigate('/auth');
			});
	}, [navigate]);

	return (
		<Fragment>
			<Header />
			<Outlet />
		</Fragment>
	);
};
