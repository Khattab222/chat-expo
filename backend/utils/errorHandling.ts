import type { NextFunction, Request, Response } from 'express';

let stackVar: string | undefined;

type AsyncHandlerFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const asyncHandler = (API: AsyncHandlerFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        API(req, res, next).catch((err: Error) => {
            stackVar = err.stack;
            return next(new Error(err.message, { cause: 500 }));
        });
    };
};



interface CustomError extends Error {
    cause?: number;
}

const globalResponse = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        if (process.env.ENV_MODE === 'DEV') {
            return res
                .status(err.cause || 500)
                .json({ message: "Fail Response", Error: err.message, stack: stackVar });
        }
        return res
            .status(err.cause || 500)
            .json({ message: "Fail Response", Error: err.message });
    }
}

export { asyncHandler, globalResponse };
