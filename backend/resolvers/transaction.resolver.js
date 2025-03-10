import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transationResolver = {
  Query: {
    transactions: async (_, __, context) => {
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
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.error("Error in transaction query:", err);
        throw new Error(err.message || "error getting transaction");
      }
    },
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("unauthorized");

      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};
      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category])
          categoryMap[transaction.category] = 0;

        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, amount]) => ({
        category,
        totalAmount: amount,
      }));
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
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
    updateTransaction: async (_, { input }, context) => {
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
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );

        return deletedTransaction;
      } catch (err) {}
    },
  },
  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error getting user: ", err);
        throw new Error("Error getting user");
      }
    },
  },
};

export default transationResolver;
