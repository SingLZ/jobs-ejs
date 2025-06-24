const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs');

// Assuming auth middleware sets req.user for logged-in user
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', jobsController.getJobs);
router.get('/new', jobsController.getNewJobForm);
router.post('/', jobsController.createJob);
router.get('/edit/:id', jobsController.getEditJobForm);
router.post('/update/:id', jobsController.updateJob);
router.post('/delete/:id', jobsController.deleteJob);

module.exports = router;
