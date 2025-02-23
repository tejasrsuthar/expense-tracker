import bcrypt from "bcryptjs";

import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context, info) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("Please fill all the fields");
        }

        const userExists = User.findOne({ username });
        if (userExists) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (err) {
        console.error("Error in signUp:", err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
    login: async (parent, { input }, context) => {
      try {
        const { username, password } = input;

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        // only required if express-session is used
        context.login(user);

        return { user };
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
    logout: async (parent, input, context) => {
      try {
        await context.logout();

        req.session.destroy((err) => {
          if (err) throw err;
        });

        // clear the cookie
        res.clearCookie("connect.sid");

        return { message: "Logged out successfully." };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
  },

  Query: {
    authUser: async (parent, input, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser:", err);
        throw new Error("Internal Server Error");
      }
    },
    user: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user query:", err);
        throw new Error(err.message || "error getting user");
      }
    },
  },
};

export default userResolver;
