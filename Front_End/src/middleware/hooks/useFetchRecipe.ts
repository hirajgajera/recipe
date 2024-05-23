import {useLazyQuery} from '@apollo/client';
import {useCallback} from 'react';
import {GET_RECIPE} from '../../common/gql';

export const useFetchRecipe = () => {
  const [getRecipe, {data: getRecipeData, error: getRecipeError}] =
    useLazyQuery(GET_RECIPE);

  const fetchRecipe = useCallback(
    (id: string) => {
      getRecipe({variables: {id}});
    },
    [getRecipe],
  );

  return {fetchRecipe, getRecipeData, getRecipeError};
};
