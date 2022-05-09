const Transaction = require("../models/Transaction");

const getAllTransactions = async (_, res) => {
  try {
    const allTransactions = await Transaction.find().sort({ created_at: -1 });
    res.status(200).json({ data: allTransactions });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const addTransaction = async (req, res) => {
  const { label, value, nature } = req.body;

  const newTransaction = new Transaction({ label, value, nature });
  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json({ data: savedTransaction });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
};
