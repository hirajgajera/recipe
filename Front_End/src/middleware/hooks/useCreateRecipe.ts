import {useMutation} from '@apollo/client';
import {CREATE_RECIPE} from '../../common/gql';

export const useCreateRecipe = () => {
  const [createRecipe, {error: createRecipeError}] = useMutation(CREATE_RECIPE);

  const handleCreateRecipe = async (
    title: string,
    ingredients: string[],
    instructions: string,
    author: string,
    navigation: any,
  ) => {
    try {
      await createRecipe({
        variables: {
          title,
          ingredients,
          instructions,
          author,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.error('Create Recipe Error:', error);
    }
  };

  return {handleCreateRecipe, createRecipeError};
};
