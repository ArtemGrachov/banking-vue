export const ROUTE_NAMES = {
  HOME: 'HOME',
};

export interface IRouteItem {
  name: string;
  path: string;
}

export const ROUTES: IRouteItem[] = [
  {
    name: ROUTE_NAMES.HOME,
    path: '/',
  },
];

export const ROUTES_MAP = ROUTES.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {} as Record<string, IRouteItem>);
