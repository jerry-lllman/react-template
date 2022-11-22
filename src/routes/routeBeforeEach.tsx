import { RouteObject } from 'react-router-dom';
import { RouteTreeItem } from './routes.d';

interface TempType {
	path?: string,
	title: string,
	children?: React.ReactNode
}

const DEFAULT_TITLE = '默认title'

function RouteTitle(props: TempType) {

	const { title, children } = props

	document.title = title

	return <>{children}</>
}

export function routeBeforeEach(routes: RouteTreeItem[]): RouteObject[] {
	return routes.map((route) => {
		if (route.element) {
			route.element = <RouteTitle path={route.path} title={route?.title ?? DEFAULT_TITLE}>{route.element}</RouteTitle>
		}

		Reflect.deleteProperty(route, 'title')

		if (route.children) {
			route.children = routeBeforeEach(route.children)
		}

		return route
	})
}