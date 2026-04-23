import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { registerStudySession } from "../controller/studySession.js";
import { login } from "../controller/user.js";

const router = Router();

router.post('/login', authMiddleware, login);

//poder testar
router.post('/studySession', authMiddleware, registerStudySession);
router.get('/listSessions', authMiddleware,)

export default router;