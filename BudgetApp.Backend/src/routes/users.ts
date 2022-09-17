import { Router } from "express";

// CONTROLLERS
import { createUser, blockUser, getUser, getUsers, updateUser, deleteAll } from "../controllers";

const router = Router();

router.post('/user', createUser);
router.get('/users', getUsers);
router.get('/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/all', deleteAll)
router.delete('/delete/:id', blockUser);

export default router;