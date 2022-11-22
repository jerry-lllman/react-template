
import { RouteObject } from 'react-router-dom';

type DeepChildrenType<T extends Record<string, unknown>> = {
	[Key in keyof T]: Key extends 'children' ? AddRouteTitle : T[Key]
}

type AddRouteTitle<P extends RouteObject> = DeepChildrenType<P> & { title?: string }

declare type RouteTreeItem = AddRouteTitle<RouteObject>
