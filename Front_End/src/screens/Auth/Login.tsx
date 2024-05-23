import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import authStore from '../../store/authStore';
import {observer} from 'mobx-react-lite';
import CustomTextInput from '../../components/TextInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onValueChange = (type: string, value: string) => {
    switch (type) {
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
      authStore.login(convertToLowerCase, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenHeader}>Login</Text>

      <CustomTextInput
        title={'Email'}
        type={'email'}
        textValue={email}
        onValueChange={onValueChange}
      />

      <CustomTextInput
        title={'Password'}
        type={'password'}
        textValue={password}
        onValueChange={onValueChange}
      />

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

export default observer(Login);

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
