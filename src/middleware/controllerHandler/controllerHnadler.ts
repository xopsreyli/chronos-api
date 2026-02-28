import type { NextFunction, Request, Response } from 'express'

const controllerHandler =
    (fn: Function) =>
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }

export default controllerHandler
