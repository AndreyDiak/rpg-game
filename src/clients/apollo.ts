import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { supabase, supabaseUrl } from './supabase';

const httpLink = createHttpLink({
	uri: supabaseUrl,
});

const authLink = setContext(async (_, { headers }) => {
	const token = (await supabase.auth.getSession()).data.session?.access_token;
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
