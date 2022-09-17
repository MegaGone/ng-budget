import { Router } from "express";

// CONTROLLERS
import { createUser, blockUser, getUser, getUsers, updateUser} from "../controllers";

const router = Router();

router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', blockUser);

export default router;