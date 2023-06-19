import { validateJWT, validateRoles } from "src/middlewares";

export const protectAdminRoute = () => {
    return [
        validateJWT,
        validateRoles(["ADMIN_ROLE"])
    ];
};