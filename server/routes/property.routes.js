import express from 'express';

import {getAllProperties,getPropertyDetail,
    createProperty,saveProperty,unsaveProperty,savedProperties,deleteProperty,PropertyTypes,countries,states,cities} from '../controllers/property.controller.js';


    
const router = express.Router();

router.route('/allproperties').get(getAllProperties);
router.route('/propertyinfo').get(getPropertyDetail);
router.route('/create').post(createProperty);

router.route('/saveproperty').post(saveProperty);
router.route('/unsaveproperty').delete(unsaveProperty);

router.route('/mysaved').post(savedProperties);

router.route('/deleteid').delete(deleteProperty);
router.route('/getPropertyTypes').get(PropertyTypes);

router.route('/getCountries').get(countries);
router.route('/getStates').post(states);
router.route('/getCities').post(cities);





export default router;

