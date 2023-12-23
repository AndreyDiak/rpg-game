import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { AuthForm } from '../forms/AuthForm';
import { Header } from '../header/Header';

export const AuthorizedLayout = () => {
	const [session, setSession] = useState<null | Session>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	if (!session) {
		return <AuthForm />;
	}

	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};
