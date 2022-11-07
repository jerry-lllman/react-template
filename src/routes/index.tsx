import Home from '@/pages/Home';
import Test from '@/pages/Test';
import { createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
	{
		path: 'test',
		element: <Test />
	}
]);


export default router