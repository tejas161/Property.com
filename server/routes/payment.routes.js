import express from 'express';
import {checkout,paymentVerification,getRazorKey} from '../controllers/payment.controller.js';






const router = express.Router();



router.route('/checkout').post(checkout);

router.route('/verifypayment').post(paymentVerification);

router.route('/getRazorKey').get(getRazorKey);



export default router;