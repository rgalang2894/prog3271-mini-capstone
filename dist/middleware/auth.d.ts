import { Request, Response, NextFunction } from "express";
interface JwtPayload {
    id: number;
    email: string;
    name: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authenticateToken;
//# sourceMappingURL=auth.d.ts.map