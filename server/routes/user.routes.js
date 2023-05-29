import express from 'express';

import authenticate from '../middleware/authenticate.js';
import {createUser , userLogin , userProfile ,reqContact, reqUpdate,userLogout,verifyOtp,resetPassword,changePassword,updatePhone,profileImage} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/signup').post(createUser);
router.route('/signin').post(userLogin);
router.route('/myprofile').get(authenticate,userProfile);
router.route('/logout').get(userLogout);
router.route('/requestinfo').post(reqContact);
router.route('/requpdate').put(reqUpdate);
router.route('/verifyotp').post(verifyOtp);
router.route('/resetpass').post(resetPassword);
router.route('/changepass').put(changePassword);
router.route('/updatephone').put(updatePhone);
router.route('/profileimage').post(profileImage);

export default router;


