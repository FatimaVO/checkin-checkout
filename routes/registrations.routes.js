const express = require('express');

const {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  cancelRegistration,
} = require('../controllers/registrations.controller');

const registrationsRouter = express.Router();

registrationsRouter.get('/', getAllRegistrations);

registrationsRouter.get('/:id', getRegistrationById);

registrationsRouter.post('/', createRegistration);

registrationsRouter.patch('/:id', updateRegistration);

registrationsRouter.delete('/:id', cancelRegistration);

module.exports = { registrationsRouter };
