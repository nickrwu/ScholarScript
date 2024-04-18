import express from "express";
import scholarshipController from '../controllers/scholarshipController.mjs';

const router = express.Router();

router.get('/getScholarshipDetails', scholarshipController.getScholarshipDetails);
router.get('/getAll/', scholarshipController.getAll);
router.post('/create/', scholarshipController.createScholarship);

export default router;