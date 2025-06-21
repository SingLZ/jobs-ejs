const Job = require('../models/jobs.js');

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.render('jobs', { jobs});
  } catch (err) {
    next(err);
  }
};

exports.getNewJobForm = (req, res) => {
  res.render('job', { job: null});
};

exports.createJob = async (req, res, next) => {
  try {
    const { company, position, status } = req.body;
    await Job.create({ company, position, status, createdBy: req.user._id });
    res.redirect('/jobs');
  } catch (err) {
    next(err);
  }
};

exports.getEditJobForm = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!job) return res.status(404).send('Job not found');
    res.render('job', { job });
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { company, position, status } = req.body;
    await Job.updateOne(
      { _id: req.params.id, createdBy: req.user._id },
      { company, position, status }
    );
    res.redirect('/jobs');
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    await Job.deleteOne({ _id: req.params.id, createdBy: req.user._id });
    res.redirect('/jobs');
  } catch (err) {
    next(err);
  }
};
