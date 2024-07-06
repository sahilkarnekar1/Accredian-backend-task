const Refer = require('../models/Refer');

exports.createRefer = async (req, res) => {
  try {
    const newRefer = new Refer(req.body);
    const savedRefer = await newRefer.save();
    res.status(201).json(savedRefer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRefers = async (req, res) => {
  try {
    const refers = await Refer.find();
    res.status(200).json(refers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
