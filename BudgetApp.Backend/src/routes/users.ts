import { Router } from "express";

// CONTROLLERS
import { createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers";

const router = Router();

router.post('/createUser', createUser);
router.get('/getUser', getUser);
router.get('/getUsers', getUsers);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

export default router;