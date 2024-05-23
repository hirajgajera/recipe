import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type CustomTextInput = {
  title: string;
  type: string;
  textValue: string;
  onValueChange: (type: string, value: string) => void;
};

export default function CustomTextInput({
  type,
  title,
  textValue,
  onValueChange,
}: CustomTextInput) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldText}>{title}</Text>
      <TextInput
        style={styles.textInput}
        value={textValue}
        onChangeText={value => onValueChange(type, value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  textInput: {
    width: '90%',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: 40,
  },
});
