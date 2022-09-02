const { Registration } = require('../models/registration.model');

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.findAll();

    res.status(200).json({
      status: 'success',
      data: {
        registrations,
      },
    });

  } catch (error) {
    console.log(error);
  }
};

const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findOne({ where: { id } });

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        registration,
      },
    });

  } catch (error) {
    console.log(error);
  }
};

const createRegistration = async (req, res) => {
  try {
    const { entranceTime } = req.body;

    const newRegistration = await Registration.create({ entranceTime });

    res.status(201).json({
      status: 'success',
      data: { newRegistration },
    });

  } catch (error) {
    console.log(error);
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { exitTime } = req.body;

    const { id } = req.params;

    const registration = await Registration.findOne({ where: { id } });

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
    } else if (registration.status === 'out') {
      return res.status(400).json({
        status: 'error',
        message: 'A check out time has already been registered.',
      });
    } else if (registration.status === 'cancelled') {
      return res.status(400).json({
        status: 'error',
        message: 'This registration was cancelled',
      });
    } else {
      await registration.update({ exitTime, status: 'out' });
      res.status(200).json({ status: 'success', data: { registration } });
    }

  } catch (error) {
    console.log(error);
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findOne({ where: { id } });

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
    } else if (registration.status === 'cancelled') {
      return res.status(400).json({
        status: 'error',
        message: 'This registration has already been cancelled',
      });
    } else if (registration.status === 'out') {
      return res.status(400).json({
        status: 'error',
        message:
          'A check out time has already been registered. It is not possible to cancel.',
      });
    } else {
      await registration.update({ status: 'cancelled' });
      res.status(204).json({ status: 'success' });
    }
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  cancelRegistration,
};
