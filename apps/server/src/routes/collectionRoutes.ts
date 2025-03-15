import { Router, Request, Response } from "express";
import { CollectionService } from '../services/CollectionServices';

const router: Router = Router();

const collectionService = new CollectionService();


router.get('/collections', async (req: Request, res: Response) => {
    try {
        const collections = await collectionService.getCollections();
        res.json(collections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching collections' });
    }
});

export default router;