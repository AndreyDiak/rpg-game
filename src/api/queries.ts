import { gql } from '@apollo/client';

export const getUsers = gql`
	query AllTodos($cursor: Cursor) {
		todosCollection(first: 10, after: $cursor) {
			edges {
				node {
					nodeId
					title
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;
