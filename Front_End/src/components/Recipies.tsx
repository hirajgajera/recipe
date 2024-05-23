import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RecipeType} from '../types/recipe';
import {RootStackParamList} from '../types/navigation';
import {useDeleteRecipe} from '../middleware/hooks/useDeleteRecipe';
import {useHandleError} from '../middleware/hooks/useHandleError';

type RecipeProps = {
  data: RecipeType[];
  setClicked: (value: boolean) => void;
};

type RecipeItem = {
  item: RecipeType;
};

type ingredients = {
  ingredients: string[];
};

const Ingredient = ({ingredients}: ingredients) => {
  if (ingredients) {
    return ingredients.map((ingredient: string, ingredientIndex: number) => {
      return (
        <React.Fragment key={ingredientIndex}>
          <Text style={styles.ingredient}>{ingredient}</Text>
        </React.Fragment>
      );
    });
  } else {
    return <></>;
  }
};

export default function Recipies({data, setClicked}: RecipeProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {handleError} = useHandleError();
  const {handleDeleteRecipe, deleteRecipeError} = useDeleteRecipe();

  const handleErrorCallback = useCallback(handleError, [handleError]);

  useEffect(() => {
    if (deleteRecipeError) {
      handleErrorCallback(deleteRecipeError, 'Delete Recipe');
    }
  }, [deleteRecipeError, handleErrorCallback]);

  const editRecipe = (recipeId: string) => {
    navigation.navigate('RecipeForm', {id: recipeId});
  };

  const deleteRecipe = (recipeId: string) => {
    handleDeleteRecipe(recipeId);
  };

  const renderRecipe = ({item}: RecipeItem) => {
    let ingredients = item.ingredients;

    return (
      <View key={item.id} style={styles.container}>
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeName}>{item.title}</Text>
          <View style={styles.buttons}>
            <Button title={'Edit'} onPress={() => editRecipe(item.id)} />
            <Button title={'Delete'} onPress={() => deleteRecipe(item.id)} />
          </View>
        </View>
        <View style={styles.ingredientContainer}>
          <Text style={styles.ingredientTitle}>Ingredients: </Text>
          <Ingredient ingredients={ingredients} />
        </View>
        <Text>
          <Text style={styles.instructionTitle}>Instructions: </Text>
          {item.instructions}
        </Text>
      </View>
    );
  };

  const resetClick = () => {
    setClicked(false);
    return false;
  };

  return (
    <View onStartShouldSetResponder={resetClick}>
      <FlatList data={data} renderItem={renderRecipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  recipeHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  recipeName: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  buttons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ingredientContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ingredientTitle: {fontWeight: 'bold'},
  ingredient: {
    margin: 3,
  },
  instructionTitle: {fontWeight: 'bold'},
});
