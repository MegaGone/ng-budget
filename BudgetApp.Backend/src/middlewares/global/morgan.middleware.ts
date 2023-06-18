import morgan from "morgan";
import { Request, Response } from "express";

import { LoggerClient } from "src/clients";

export const MorganMiddleware = (logger: LoggerClient) => {
    return morgan(
        (tokens, req: Request, res: Response) => {
            return JSON.stringify({
                method: tokens.method(req, res),
                url: tokens.url(req, res),
                status: Number.parseFloat(`${tokens.status(req, res)}`),
                content_length: tokens.res(req, res, 'content-length'),
                response_time: Number.parseFloat(`${tokens['response-time'](req, res)}`),
                body: JSON.stringify(req.body)
            })
        },
        {
            stream: {
                // Configure Morgan to use our custom logger with the http severity
                write: (message) => {
                    const data = JSON.parse(message)
                    logger.http(`[HTTP] [INCOMING REQUEST] [${data?.url || ''}]`, data)
                }
            }
        }
    )
};