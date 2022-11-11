import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom'
const Home = React.lazy(() => import('@/pages/Home'))
const Test = React.lazy(() => import('@/pages/Test'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div>loading</div>}><Home /></Suspense>,
  },
	{
		path: 'test',
		element: <Suspense fallback={<div>loading</div>}><Test /></Suspense>,
	}
]);


export default router