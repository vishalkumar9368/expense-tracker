import express from "express";

const router = express.Router();
import Transaction from "../models/transactionModel.js";

router.post("/transaction", async (req, res) => {
  const { type, amount, category, description } = req.body;

  try {
    const newTransaction = {
      userId: req.user.id,
      type,
      amount,
      category,
      description,
    };

    // we will send this to frontend otherwise we will not get id of the record
    const savedTransaction = await new Transaction(newTransaction).save();

    res
      .status(200)
      .json({ message: "Data saved successfully", savedTransaction });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// get all transaction record that belongs to current user
router.get("/transaction", async (req, res) => {
  const id = req.user.id;
  try {
    const userTransactions = await Transaction.find({ userId: id });

    res.status(200).json(userTransactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// endpoint to delete the transaction record
router.delete("/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const transaction = await Transaction.findById(id);

    // if no transaction found
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // check if transaction belongs to the user

    if (transaction.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can't delete this transaction" });
    }

    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// in default exports we can use alias
export default router;
