import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layouts/AppLayout';
import { AuthorizedLayout } from './components/layouts/AuthorizedLayout';
import { AppRoute } from './routes';
import { AuthRoute } from './routes/auth';
import { CardsRoute } from './routes/cards';
import { CardRoute } from './routes/cards/id';
import { GameRoute } from './routes/game';
import { ManageRoute } from './routes/manage';
import { FuseRoute } from './routes/manage/fuse';
import { SummonRoute } from './routes/manage/summon';
import { ShopRoute } from './routes/shop';

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				element: <AuthorizedLayout />,
				children: [
					{
						path: '/',
						element: <AppRoute />,
					},
					{
						path: '/cards',
						element: <CardsRoute />,
						children: [
							{
								path: '/cards/:cardId',
								element: <CardRoute />,
							},
						],
					},
					{
						path: '/manage',
						element: <ManageRoute />,
					},
					{
						path: '/manage/fuse',
						element: <FuseRoute />,
					},
					{
						path: '/manage/summon',
						element: <SummonRoute />,
					},
					{
						path: '/shop',
						element: <ShopRoute />,
					},
					{
						path: '/game/:id',
						element: <GameRoute />,
					},
				],
			},
			{
				path: '/auth',
				element: <AuthRoute />,
			},
		],
	},
]);
