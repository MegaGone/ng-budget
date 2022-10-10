export interface IAlert {
    alertAppareance : "border" | "fill" | "outline" | "soft";
    alertType       : "primary" | "accent" | "warn" | "basic" | "info" | "success" | "warning" | "error";
    showIcon        : boolean;
    icon?           : string;
    message         : string;
    dismissible     : boolean;
    dismissed       : boolean;
};