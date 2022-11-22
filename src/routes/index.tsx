import { createBrowserRouter } from 'react-router-dom'
import { routeBeforeEach } from './routeBeforeEach';

import routes from './routes';

export default  createBrowserRouter(routeBeforeEach(routes));