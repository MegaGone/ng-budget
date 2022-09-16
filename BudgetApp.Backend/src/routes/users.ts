import { Router } from "express";

// CONTROLLERS
import { createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers";

const router = Router();

router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/:id', getUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

export default router;