import express from "express";
import essayController from '../controllers/essayController.mjs';

const router = express.Router();

router.post('/upload', essayController.uploadEssay);
router.delete('/delete', essayController.deleteEssay);
router.post('/combineEssays', essayController.combineEssays);
router.get('/getAll', essayController.getAllEssays);
router.get('/:essayId', essayController.getEssayDetail);

export default router;