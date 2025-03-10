import { mergeTypeDefs } from "@graphql-tools/merge";

// typeDefs
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;

// reason to merge the typedefs
// Modularity, convinent collaboration, Reuseability, Clear separation of concerns
