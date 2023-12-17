'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
	// запрашиваем пользователя
	// если его нет, то кидаем на страницу авторизации
	// если он есть, то все хорошо

	const router = useRouter();
	const pathname = usePathname();

	const user = false;

	if (!user && pathname !== '/auth') {
		router.push('/auth');
		return;
	}

	return <>{children}</>;
};

export default AuthProvider;
