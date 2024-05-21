import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useLazyQuery, gql, useQuery} from '@apollo/client';

import Recipies from '../components/Recipies';
import SearchBox from '../components/Search';
import {RecipeType} from '../types/recipe';
import AddRecipe from '../components/AddRecipe';

const SEARCH_RECIPES = gql`
  query SearchRecipes($keyword: String!) {
    searchRecipes(keyword: $keyword) {
      id
      title
      ingredients
      instructions
    }
  }
`;

const GET_ALL_RECIPES = gql`
  query GetAllRecipies {
    getAllRecipies {
      id
      title
      ingredients
      instructions
      author
    }
  }
`;

export default function MainScreen() {
  const [searchText, setSearchText] = useState('');
  const [clicked, setClicked] = useState(true);
  // const [searchRecipes, {data, loading, error}] = useLazyQuery(SEARCH_RECIPES);
  const {loading, error, data} = useQuery(GET_ALL_RECIPES);

  console.log('data', data);
  console.log(JSON.stringify(error, null, 2));
  console.log('loading', loading);

  // const handleSearch = () => {
  //   searchRecipes({variables: {searchText}});
  // };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox
        clicked={clicked}
        setClicked={setClicked}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Recipies data={data?.getAllRecipies} setClicked={setClicked} />
      <AddRecipe />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
