import {useMutation} from '@apollo/client';
import {DELETE_RECIPE} from '../../common/gql';

export const useDeleteRecipe = () => {
  const [deleteRecipe, {error: deleteRecipeError}] = useMutation(DELETE_RECIPE);

  const handleDeleteRecipe = async (id: string) => {
    await deleteRecipe({
      variables: {
        id,
      },
    });
  };

  return {handleDeleteRecipe, deleteRecipeError};
};
