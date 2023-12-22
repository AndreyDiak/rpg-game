import { useQuery } from '@apollo/client';
import { getUsers } from '../../api/queries';

export const CardsRoute = () => {
	const { data } = useQuery(getUsers);
	console.log({ data });
	return <div>cards route</div>;
};
