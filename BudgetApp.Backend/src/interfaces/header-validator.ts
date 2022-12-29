import { PARAM_LOCATION } from "../typings";

export interface IHeaderValidators {
    errors: IErrorsValidatorMessage[];
}

interface IErrorsValidatorMessage {
    field: string;
    message: {
        location: PARAM_LOCATION,
        warnings: string;
    }
}