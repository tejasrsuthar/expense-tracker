const transationResolver = {
  Query: {
    transactions: () => {
      return true;
    },
  },
  Mutation: {},
};

export default transationResolver;
