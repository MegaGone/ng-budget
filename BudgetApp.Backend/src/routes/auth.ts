import { Router } from "express";

// CONTROLLERS
import { getSession, loginWithCredentials, loginWithGoogle, register } from "../controllers";

const router = Router();

router.post('/login',       loginWithCredentials);
router.post('/register',    register);
router.post('/google',      loginWithGoogle);
router.post('/session',     getSession);

export default router;