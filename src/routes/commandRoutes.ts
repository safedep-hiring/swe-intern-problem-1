import { Router, Request, Response } from 'express';
import {searchCommand,storeCommand} from "../controllers/commandController";

const router = Router();

router.post('/commands', async (req: Request, res: Response) => {
    await storeCommand(req, res);
});
router.get('/commands', async (req: Request, res: Response) => {
    await searchCommand(req, res);
});

export default router;
