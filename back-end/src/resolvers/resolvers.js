const User = require("../models/User");
const Recipe = require("../models/Recipe");

const resolvers = {
  Query: {
    getUser: async (_, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        // Check if the password matches
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
          throw new Error("Incorrect Password!");
        }

        // Return the user data if authentication is successful
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      } catch (error) {
        // Handle errors and return a meaningful message
        throw new Error(error.message);
      }
    },
    getRecipe: async (_, { id }) => await Recipe.findById(id),
    getAllRecipies: async () => await Recipe.find({}),
    searchRecipies: async (_, { keyword }) =>
      await Recipe.find({ title: new RegExp(keyword, "i") }),
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      //check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already registered");
      }

      //save a new user
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    createRecipe: async (_, { title, ingredients, instructions, author }) => {
      const recipe = new Recipe({ title, ingredients, instructions, author });
      await recipe.save();
      return recipe;
    },
    updateRecipe: async (_, { id, title, ingredients, instructions }) => {
      const recipe = await Recipe.findById(id);
      if (title) recipe.title = title;
      if (ingredients) recipe.ingredients = ingredients;
      if (instructions) recipe.instructions = instructions;

      await recipe.save();
      return recipe;
    },
    deleteRecipe: async (_, { id }) => {
      const recipe = await Recipe.findByIdAndDelete(id);

      if (recipe) return true;
      else throw new Error("Recipe does n't exisit!");
    },
  },
};

module.exports = resolvers;
