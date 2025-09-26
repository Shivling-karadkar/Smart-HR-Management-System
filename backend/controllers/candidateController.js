const Candidate = require('../models/Candidate');
const resumeParser = require('../utils/resumeParser');
const { sendEmail } = require('../utils/email');

// Create Candidate
const createCandidate = async (req, res, next) => {
  try {
    const { name, email, phone, notes } = req.body;
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    let skills = [];
    if (req.file) {
      try {
        skills = await resumeParser.parseResume(req.file.path);
      } catch (err) {
        console.error('Resume parsing error:', err);
      }
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      notes,
      resumeUrl,
      skills,
      createdBy: req.user.id
    });

    if (req.io) req.io.emit('candidate_created', candidate);

    sendEmail({
      to: candidate.email,
      subject: 'Application Received',
      text: 'Thank you for applying. We will contact you soon.'
    }).catch(err => console.error('Email error:', err));

    res.status(201).json({ success: true, data: candidate });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ msg: 'Candidate Not Found' });
    res.json(candidate);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const list = await Candidate.find().sort({ appliedAt: -1 });
    res.json({ data: list });
  } catch (err) {
    next(err);
  }
};

const updateCandidate = async (req, res, next) => {
  try {
    const updates = req.body;
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!candidate) return res.status(404).json({ msg: 'Candidate Not Found' });

    if (req.io) req.io.emit('candidate_updated', candidate);
    res.json(candidate);
  } catch (err) {
    next(err);
  }
};

const deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ msg: 'Candidate Not Found' });

    if (req.io) req.io.emit('candidate_deleted', { id: req.params.id });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCandidate,
  getOne,
  getAll,
  updateCandidate,
  deleteCandidate
};
