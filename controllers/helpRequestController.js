const HelpRequest = require('../models/HelpRequest');

exports.createHelpRequest = async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;
    const helpRequest = new HelpRequest({ title, description, category, userId });
    await helpRequest.save();
    res.status(201).json({ success: true, data: helpRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: helpRequests, count: helpRequests.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getHelpRequestById = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findById(req.params.id);
    if (!helpRequest) return res.status(404).json({ success: false, error: 'Help request not found' });
    res.status(200).json({ success: true, data: helpRequest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateHelpRequest = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const helpRequest = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { ...(title && { title }), ...(description && { description }), ...(category && { category }), ...(status && { status }) },
      { new: true, runValidators: true }
    );
    if (!helpRequest) return res.status(404).json({ success: false, error: 'Help request not found' });
    res.status(200).json({ success: true, data: helpRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByIdAndDelete(req.params.id);
    if (!helpRequest) return res.status(404).json({ success: false, error: 'Help request not found' });
    res.status(200).json({ success: true, message: 'Help request deleted', data: helpRequest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
