import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {gql, useQuery} from '@apollo/client';

import Recipies from '../components/Recipies';
import SearchBox from '../components/Search';
// import {RecipeType} from '../types/recipe';
import AddRecipe from '../components/AddRecipe';
import authStore from '../store/authStore';

// const SEARCH_RECIPES = gql`
//   query SearchRecipes($keyword: String!) {
//     searchRecipes(keyword: $keyword) {
//       id
//       title
//       ingredients
//       instructions
//     }
//   }
// `;

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
  const {data} = useQuery(GET_ALL_RECIPES);

  // const handleSearch = () => {
  //   searchRecipes({variables: {searchText}});
  // };

  const handleLogout = async () => {
    await authStore.clearUser();
  };

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
      <Button title={'Log out'} onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
