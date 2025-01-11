const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
//probably going to import authentication middleware here

//router for middleware here

//get all meds for a user
router.get('/user/:userId', medicationController.getMedications);

//get med schedule for a user
router.get('user/:userId/schedule', medicationController.getMedicationSchedule);

//add a new med
router.get('user/:userId', medicationController.addMedication);

// Update a med
router.put('/:medicationId', medicationController.updateMedication);

// Delete a med
router.delete('/:medicationId', medicationController.deleteMedication);

module.exports = router;
