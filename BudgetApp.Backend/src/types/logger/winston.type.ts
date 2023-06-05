import { Logform } from "winston";
import { SeqTransportOptions } from "./";

export type WinstonConfig = {
    applicationName: string
    logLevel?: string
    formats: Array<Logform.Format>
    seq?: SeqTransportOptions
};