import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import authStore from '../../store/authStore';
import {observer} from 'mobx-react-lite';

function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onValueChange = (type: string, value: string) => {
    switch (type) {
      case 'username': {
        setUserName(value);
        break;
      }
      case 'email': {
        setEmail(value);
        break;
      }
      case 'password': {
        setPassword(value);
        break;
      }

      default: {
        break;
      }
    }
  };

  const submitForm = () => {
    if (!email.length || !password.length) {
      Alert.alert('Enter all details!');
    } else {
      const convertToLowerCase = email.toLowerCase();

      authStore.signUp(userName, convertToLowerCase, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenHeader}>Sign Up</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Username</Text>
        <TextInput
          value={userName}
          style={styles.textInput}
          onChangeText={value => onValueChange('username', value)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Email</Text>
        <TextInput
          value={email}
          style={styles.textInput}
          onChangeText={value => onValueChange('email', value)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Password</Text>
        <TextInput
          value={password}
          style={styles.textInput}
          onChangeText={value => onValueChange('password', value)}
        />
      </View>

      {authStore.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{authStore.error}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
          <Text style={styles.textSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default observer(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  textInput: {
    width: '90%',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: 40,
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'red',
    width: 350,
    borderRadius: 10,
    padding: '5%',
  },
  textSubmit: {
    textAlign: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2%',
  },
  error: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
