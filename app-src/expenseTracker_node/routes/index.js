const router = require("express").Router();
const { getAllTransactions, addTransaction } = require("../controllers");

/**
 * @access PUBLIC
 * @route GET /api/transactions
 * @desc Get all transactions
 */
router.get("/transactions", getAllTransactions);

/**
 * @access PUBLIC
 * @route POST /api/transactions
 * @desc Add a transaction
 */
router.post("/transactions", addTransaction);

module.exports = router;
