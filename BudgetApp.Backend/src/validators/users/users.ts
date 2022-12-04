import { genericStringRule } from "../../helpers/validator";


export const createUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericStringRule(
            ['name','lastName','email','password','role'],
            {
                requiredType: "string",
                warnings    : "This field doesn't exist, is not a string or is empty."
            }
        ),
        // genericStringRule(
        //     'role',
        //     {
        //         requiredType: "string",
        //         warnings    : "This is not a string or is empty"
        //     },
        //     null,
        //     false
        // ),
        ...newRules
    ];
};