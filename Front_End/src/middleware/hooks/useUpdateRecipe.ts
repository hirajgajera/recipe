import {useMutation} from '@apollo/client';
import {UPDATE_RECIPE} from '../../common/gql';

export const useUpdateRecipe = () => {
  const [updateRecipe, {error: updateRecipeError}] = useMutation(UPDATE_RECIPE);

  const handleUpdateRecipe = async (
    id: string,
    title: string,
    ingredients: string[],
    instructions: string,
    navigation: any,
  ) => {
    try {
      await updateRecipe({
        variables: {
          id,
          title,
          ingredients,
          instructions,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.error('Update Recipe Error:', error);
    }
  };

  return {handleUpdateRecipe, updateRecipeError};
};
