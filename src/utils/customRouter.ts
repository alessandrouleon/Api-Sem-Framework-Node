// customRouter.ts
import { IncomingMessage, ServerResponse } from 'http';

type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export class CustomRouter {
    private routes: { [key: string]: Handler[] } = {};

    public use(path: string, handler: Handler): void {
        this.routes[path] = this.routes[path] || [];
        this.routes[path].push(handler);
    }

    public async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const matchingRoutes = Object.keys(this.routes).filter((route) =>
            req.url?.startsWith(route)
        );

        if (matchingRoutes.length > 0) {
            const handlers = this.routes[matchingRoutes[0]];
            for (const handler of handlers) {
                await handler(req, res);
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    }
}
