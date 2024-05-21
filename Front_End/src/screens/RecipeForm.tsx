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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../types/navigation';
import {gql, useLazyQuery, useMutation} from '@apollo/client';

const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      ingredients
      instructions
      author
    }
  }
`;

const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $ingredients: [String]!
    $instructions: String!
    $author: String!
  ) {
    createRecipe(
      title: $title
      ingredients: $ingredients
      instructions: $instructions
      author: $author
    ) {
      id
      title
    }
  }
`;

const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $id: ID!
    $title: String!
    $ingredients: [String]!
    $instructions: String!
  ) {
    updateRecipe(
      id: $id
      title: $title
      ingredients: $ingredients
      instructions: $instructions
    ) {
      id
      title
    }
  }
`;

type RecipeFormRouteProp = RouteProp<RootStackParamList, 'RecipeForm'>;

type ingredientsProps = {
  ingredients: string[];
  removeValue: (value: string) => void;
};

type RecipeError = {
  name: string;
  message: string;
};

const Ingredients = ({ingredients, removeValue}: ingredientsProps) => {
  if (ingredients.length) {
    return (
      <React.Fragment>
        <Text style={styles.fieldText}>Ingredients List: </Text>
        {ingredients.map((ingredient: string, index: number) => {
          return (
            <View style={styles.ingredientName} key={index}>
              <Text>{ingredient}</Text>
              <Button title="Remove" onPress={() => removeValue(ingredient)} />
            </View>
          );
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Text>No Ingredients!</Text>
      </React.Fragment>
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

  //Get Recipe Hook
  const [getRecipe, {data: getRecipeData, error: getRecipeError}] =
    useLazyQuery(GET_RECIPE);

  //Create Recipe Hook
  const [createRecipe, {data: createRecipeData, error: createRecipeError}] =
    useMutation(CREATE_RECIPE);

  //Update Recipe Hook
  const [updateRecipe, {data: updatedRecipeData, error: updatedRecipeError}] =
    useMutation(UPDATE_RECIPE);

  useEffect(() => {
    if (route.params?.id) {
      console.log('recipe', route.params.id);
      getRecipe({variables: {id: route.params.id}});
    }
  }, [route.params?.id, getRecipe]);

  useEffect(() => {
    if (getRecipeData) {
      console.log('getRecipeData', getRecipeData);

      setTitle(getRecipeData.getRecipe.title);
      setAuthor(getRecipeData.getRecipe.author);
      setInstructions(getRecipeData.getRecipe.instructions);
      setIngredients(getRecipeData.getRecipe.ingredients);
    }
  }, [getRecipeData]);

  const fetchRecipeFailedAlert = useCallback(
    (recipeError: RecipeError) => {
      console.log('called......');

      Alert.alert('Get Recipe Error', recipeError.message, [
        {
          text: 'Go Back',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ]);
    },
    [navigation],
  );

  useEffect(() => {
    if (getRecipeError) {
      fetchRecipeFailedAlert(getRecipeError);
    } else if (createRecipeError) {
      Alert.alert('Create Recipe Error', createRecipeError.message);
    } else if (updatedRecipeError) {
      Alert.alert('Update Recipe Error', updatedRecipeError.message);
    }
  }, [
    getRecipeError,
    createRecipeError,
    updatedRecipeError,
    fetchRecipeFailedAlert,
  ]);

  const onValueChange = (type: string, value: string) => {
    switch (type) {
      case 'recipeName': {
        setTitle(value);
        break;
      }
      case 'author': {
        setAuthor(value);
        break;
      }
      case 'instructions': {
        setInstructions(value);
        break;
      }

      default: {
        break;
      }
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
        "The value you are trying to delete doesn't exists!",
      );
    } else {
      let removedValue = ingredients.filter(datum => datum !== value);
      setIngredients(removedValue);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleCreateRecipe = () => {
    createRecipe({
      variables: {
        title,
        ingredients,
        instructions,
        author: '664af203e107b7cb06047635',
      },
    });

    console.log('createRecipeData', createRecipeData);
    console.log(
      'createRecipeError',
      JSON.stringify(createRecipeError, null, 2),
    );
  };

  const handleUpdateRecipe = (id: string) => {
    updateRecipe({
      variables: {
        id,
        title,
        ingredients,
        instructions,
        author: '664af203e107b7cb06047635',
      },
    });

    console.log('updatedRecipeData', updatedRecipeData);
    console.log(
      'updatedRecipeError',
      JSON.stringify(updatedRecipeError, null, 2),
    );
  };

  const submitForm = () => {
    if (route.params?.id) {
      handleUpdateRecipe(route.params.id);
    } else {
      handleCreateRecipe();
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title={'Back'} onPress={goBack} />
        <Text style={styles.screenHeader}>Recipe</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Recipe Name</Text>
        <TextInput
          value={title}
          style={styles.textInput}
          onChangeText={value => onValueChange('recipeName', value)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Author</Text>
        <TextInput
          value={author}
          style={styles.textInput}
          onChangeText={value => onValueChange('author', value)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Instructions</Text>
        <TextInput
          value={instructions}
          style={styles.textInput}
          onChangeText={value => onValueChange('instructions', value)}
        />
      </View>
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
        <Ingredients ingredients={ingredients} removeValue={removeIngredient} />
      </View>

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
