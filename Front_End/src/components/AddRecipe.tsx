import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';

export default function AddRecipe() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigateToForm = () => {
    navigation.navigate('RecipeForm');
  };
  return <TouchableOpacity style={styles.button} onPress={navigateToForm} />;
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 70,
    right: 30,
  },
});
