const Enquiry = require('../models/Enquiry');

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  const { name, email, mobile, productDetails } = req.body;

  const enquiry = new Enquiry({
    name,
    email,
    mobile,
    productDetails
  });

  const createdEnquiry = await enquiry.save();
  res.status(201).json(createdEnquiry);
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
  const enquiries = await Enquiry.find({});
  res.json(enquiries);
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (enquiry) {
    await enquiry.deleteOne();
    res.json({ message: 'Enquiry removed' });
  } else {
    res.status(404).json({ message: 'Enquiry not found' });
  }
};

module.exports = { createEnquiry, getEnquiries, deleteEnquiry };
