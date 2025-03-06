import Transaction from "../models/transaction.model.js";

const transationResolver = {
  Query: {
    transactions: async (parent, input, context) => {
      try {
        if (!context.getUser()) throw new Error("unauthorized");
        const userId = context.getUser()._id;

        const transactions = await Transaction.find({ userId });

        return transactions;
      } catch (err) {
        console.error("Error in transactions query:", err);
        throw new Error(err.message || "error getting transactions");
      }
    },
    transaction: async (parent, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.error("Error in transaction query:", err);
        throw new Error(err.message || "error getting transaction");
      }
    },
    // TODO - > add category stats query
  },
  Mutation: {
    createTransaction: async (parent, { input }, context) => {
      try {
        const userId = context.getUser()._id;
        const newTransaction = new Transaction({
          ...input,
          userId,
        });

        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction", err);
        throw new Error("Error creating transaction", err);
      }
    },
    updateTransaction: async (parent, { input }, context) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        return updatedTransaction;
      } catch (err) {
        console.error("Error creating transaction", err);
        throw new Error("Error creating transaction", err);
      }
    },
    deleteTransaction: async (parent, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );

        return deletedTransaction;
      } catch (err) {}
    },
  },
  // TODO: Add the Transaction/User relationship
};

export default transationResolver;
