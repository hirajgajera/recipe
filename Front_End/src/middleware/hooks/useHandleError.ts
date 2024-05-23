import {Alert} from 'react-native';
import {ApolloError} from '@apollo/client';

export const useHandleError = () => {
  const handleError = (error: ApolloError, type: string) => {
    console.log('Here....', error, type);

    if (error) {
      Alert.alert(`${type} Error`, error.message);
    }
  };

  // console.log('error in auth.ts', JSON.stringify(error, null, 2));

  return {handleError};
};
