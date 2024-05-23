import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
  Keyboard,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../types/navigation';
import {useFetchRecipe} from '../middleware/hooks/useFetchRecipe';
import {useCreateRecipe} from '../middleware/hooks/useCreateRecipe';
import {useUpdateRecipe} from '../middleware/hooks/useUpdateRecipe';
import {useHandleError} from '../middleware/hooks/useHandleError';
import CustomTextInput from '../components/TextInput';

type RecipeFormRouteProp = RouteProp<RootStackParamList, 'RecipeForm'>;

type ingredientsProps = {
  ingredients: string[];
  removeValue: (value: string) => void;
};

const Ingredients = ({ingredients, removeValue}: ingredientsProps) => {
  if (ingredients.length) {
    return (
      <>
        <Text style={styles.fieldText}>Ingredients List: </Text>
        {ingredients.map((ingredient, index) => (
          <View style={styles.ingredientName} key={index}>
            <Text>{ingredient}</Text>
            <Button title="Remove" onPress={() => removeValue(ingredient)} />
          </View>
        ))}
      </>
    );
  } else {
    return (
      <>
        <Text>No Ingredients!</Text>
      </>
    );
  }
};

export default function RecipeForm() {
  const navigation = useNavigation();
  const route = useRoute<RecipeFormRouteProp>();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState('');

  const {fetchRecipe, getRecipeData} = useFetchRecipe();
  const {handleCreateRecipe, createRecipeError} = useCreateRecipe();
  const {handleUpdateRecipe, updateRecipeError} = useUpdateRecipe();
  const {handleError} = useHandleError();

  const fetchRecipeCallback = useCallback(fetchRecipe, [fetchRecipe]);

  useEffect(() => {
    if (route.params?.id) {
      fetchRecipeCallback(route.params.id);
    }
  }, [fetchRecipeCallback, route.params?.id]);

  useEffect(() => {
    if (getRecipeData) {
      setTitle(getRecipeData.getRecipe.title);
      setAuthor(getRecipeData.getRecipe.author);
      setInstructions(getRecipeData.getRecipe.instructions);
      setIngredients(getRecipeData.getRecipe.ingredients);
    }
  }, [getRecipeData]);

  const handleErrorCallback = useCallback(handleError, [handleError]);

  useEffect(() => {
    if (createRecipeError) {
      handleErrorCallback(createRecipeError, 'Create Recipe');
    }
    if (updateRecipeError) {
      handleErrorCallback(updateRecipeError, 'Update Recipe');
    }
  }, [createRecipeError, updateRecipeError, handleErrorCallback]);

  const onValueChange = (type: string, value: string) => {
    switch (type) {
      case 'recipeName':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'instructions':
        setInstructions(value);
        break;
      default:
        break;
    }
  };

  const addIngredient = () => {
    if (ingredient.length) {
      if (ingredients.includes(ingredient)) {
        Alert.alert('Value Exists', 'The value you entered already exists!');
      } else {
        setIngredients([...ingredients, ingredient]);
        setIngredient('');
      }
    } else {
      Alert.alert('Field Empty', 'Please enter a value');
    }
  };

  const removeIngredient = (value: string) => {
    if (!ingredients.includes(value)) {
      Alert.alert(
        'Not Found!',
        "The value you are trying to delete doesn't exist!",
      );
    } else {
      setIngredients(ingredients.filter(ing => ing !== value));
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const submitForm = () => {
    if (route.params?.id) {
      handleUpdateRecipe(
        route.params.id,
        title,
        ingredients,
        instructions,
        navigation,
      );
    } else {
      handleCreateRecipe(title, ingredients, instructions, author, navigation);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Button title={'Back'} onPress={goBack} />
          <Text style={styles.screenHeader}>Recipe</Text>
        </View>

        <CustomTextInput
          title={'Recipe Name'}
          type={'recipeName'}
          textValue={title}
          onValueChange={onValueChange}
        />

        <CustomTextInput
          title={'Author'}
          type={'author'}
          textValue={author}
          onValueChange={onValueChange}
        />

        <CustomTextInput
          title={'Instructions'}
          type={'instructions'}
          textValue={instructions}
          onValueChange={onValueChange}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Ingredients</Text>
          <View style={styles.ingredientsTextInputContainer}>
            <TextInput
              style={styles.textInput}
              value={ingredient}
              onChangeText={setIngredient}
              onSubmitEditing={Keyboard.dismiss}
            />
            <Button title={'Add'} onPress={addIngredient} />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Ingredients
            ingredients={ingredients}
            removeValue={removeIngredient}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
          <Text style={styles.textSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 10,
    width: '56%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },
  screenHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  fieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  fieldText: {
    marginBottom: 2,
    width: '90%',
    textAlign: 'left',
    fontSize: 15,
  },
  ingredientsTextInputContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  textInput: {
    width: '90%',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: 40,
  },
  ingredientName: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  submitButton: {
    backgroundColor: 'red',
    width: 300,
    borderRadius: 10,
    padding: '5%',
  },
  textSubmit: {
    textAlign: 'center',
  },
});
