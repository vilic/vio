import { Express, Router as ExpressRouter } from 'express';
import { ErrorTransformer } from './';
export interface _ExpressLayer {
    handle: ExpressRouter;
}
export interface _ExpressRootRouter {
    stack: _ExpressLayer[];
}
export interface _Express extends Express {
    _router: _ExpressRootRouter;
}
export declare class Router {
    /** Root of route files on file system, ends without '/'. */
    routesRoot: string;
    /** Root of views files on file system, ends without '/'. */
    viewsRoot: string;
    /** Extension of view files. */
    viewsExtension: string;
    /** Error view files folder name. */
    errorViewsFolder: string;
    /** Default sub site. */
    defaultSubsite: string;
    /** Prefix of requesting path, starts with '/' but ends without '/'. */
    prefix: string;
    /** Express application. */
    app: _Express;
    /** Actual router behind the scence. */
    router: ExpressRouter;
    /** Error transformer. */
    errorTransformer: ErrorTransformer;
    constructor(app: Express, {routesRoot, viewsRoot, viewsExtension, errorViewsFolder, defaultSubsite, prefix, json}?: {
        routesRoot?: string;
        viewsRoot?: string;
        viewsExtension?: string;
        errorViewsFolder?: string;
        defaultSubsite?: string;
        prefix?: string;
        json?: boolean;
    });
    /** A map of route file last modified timestamp. */
    private static lastModifiedMap;
    /**
     * Attouch routes synchronously when starting up in production environment.
     */
    private attachRoutes();
    private attachRoutesInFile(routeFilePath);
    /**
     * Attach routes dynamicly and synchronously based on requesting path.
     * Used only at development.
     */
    private attachRoutesDynamicly(requestingPath);
    /**
     * Split request path to parts.
     * e.g., "/abc/def/ghi?query=xyz" would be splitted to:
     * ["/abc", "/def", "/ghi"]
     */
    private static splitRequestPath(path);
    private static splitRoutePath(path);
    private static splitRouteFilePath(path);
    private static splitPath(path, regex);
    private attachSingleRoute(routeFilePath, route);
    private getPossibleRoutePaths(routeFilePath, routePath);
    private resolveViewPath(routeFilePath, route);
    private getPossibleViewPaths(routeFilePath, routePath);
    private getSubsiteName(path);
    private processRequest(req, res, route, next);
    private handleNotFound(req, res);
    private handleServerError(req, res, status?);
    private renderErrorPage(req, res, status);
    private createRouteHandler(route);
}
export default Router;