import React from 'react';
import {View, TextInput, StyleSheet, Button, Keyboard} from 'react-native';

type searchProps = {
  clicked: boolean;
  searchText: string;
  setSearchText: (value: string) => void;
  setClicked: (value: boolean) => void;
};

export default function SearchBox({
  clicked,
  searchText,
  setSearchText,
  setClicked,
}: searchProps) {
  const onPressCancel = () => {
    Keyboard.dismiss();
    setClicked(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={clicked ? styles.searchBarClicked : styles.searchBarUnClicked}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
      {clicked && (
        <View>
          <Button title="Cancel" onPress={onPressCancel} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBarUnClicked: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    width: '95%',
  },
  searchBarClicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});
