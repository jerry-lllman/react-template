import { Suspense, lazy } from 'react';
import { RouteTreeItem } from './routes.d'

const Home = lazy(() => import('@/pages/Home'))
const Test = lazy(() => import('@/pages/Test'))

const routes: RouteTreeItem[] = [
  {
    path: '/',
    element: <Suspense fallback={<div>loading</div>}><Home /></Suspense>,
  },
	{
		path: 'test',
		element: <Suspense fallback={<div>loading</div>}><Test /></Suspense>,
	},
	{
		path: '*',
		title: 'Not Found',
		element: <div>Not Found</div>
	}
]

export default routes