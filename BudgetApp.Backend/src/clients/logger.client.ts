import { createLogger, Logger, format as WinstonFormat, transports as WinstonTransports, transport as WinstonTransport } from "winston";
import { SeqTransport } from "@datalust/winston-seq";

import { WINSTON_APPLICATION_NAME, WINSTON_DEFAULT_DATE_FORMAT, WINSTON_DEFAULT_LOG_LEVEL, NODE_ENV } from "src/config";
import { WinstonConfig } from "src/types";

export class LoggerClient {
    private _logger: Logger

    constructor(
        settings: WinstonConfig = {
            applicationName: WINSTON_APPLICATION_NAME,
            formats: [
                WinstonFormat.errors({ stack: true }),
                WinstonFormat.timestamp({ format: WINSTON_DEFAULT_DATE_FORMAT }),
                WinstonFormat.json()
            ],
            logLevel: WINSTON_DEFAULT_LOG_LEVEL,
            // seq: {
            //     serverURL: WINSTON_DEFAULT_SEQ_URL,
            //     apiKey: WINSTON_DEFAULT_SEQ_API_KEY
            // }
        }
    ) {
        const transports: Array<WinstonTransport> = []

        if (NODE_ENV === 'development')
            transports.push(
                new WinstonTransports.Console({
                    format: WinstonFormat.simple()
                })
            )

        // SET SEQ URL
        if (settings?.seq?.serverURL) {
            transports.push(
                new SeqTransport({
                    serverUrl: settings.seq.serverURL,
                    apiKey: settings.seq.apiKey || '',
                    onError: (error) => {
                        console.error('[ERROR][LOGGER] ', error)
                    },
                    handleExceptions: settings.seq?.handleExceptions || true,
                    handleRejections: settings.seq?.handleRejections || true
                })
            )
        }

        this._logger = createLogger({
            format: WinstonFormat.combine(...settings.formats),
            defaultMeta: { application: settings.applicationName },
            transports,
            level: settings.logLevel
        })
    }

    error(message: string, meta?: Record<string, any>) {
        this._logger.error(message, meta)
    }

    warn(message: string, meta?: Record<string, any>) {
        this._logger.warn(message, meta)
    }

    info(message: string, meta?: Record<string, any>) {
        this._logger.info(message, meta)
    }

    http(message: string, meta?: Record<string, any>) {
        this._logger.http(message, meta)
    }
};