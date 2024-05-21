const User = require("../models/User");
const Recipe = require("../models/Recipe");

const resolvers = {
  Query: {
    getRecipe: async (_, { id }) => await Recipe.findById(id),
    getAllRecipies: async () => await Recipe.find({}),
    searchRecipies: async (_, { keyword }) =>
      await Recipe.find({ title: new RegExp(keyword, "i") }),
  },

  Mutation: {
    createUser: async (_, { username, email }) => {
      const user = new User({ username, email });
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
      return true;
    },
  },
};

module.exports = resolvers;
