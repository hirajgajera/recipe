import {makeAutoObservable, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, signUp} from '../middleware/auth';

type User = {
  __typename?: string;
  id?: string;
  username: string;
  email: string;
  password?: string;
} | null;

class AuthStore {
  user: User = null;
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromStorage();
  }

  setUser(user: User) {
    this.user = user;
    AsyncStorage.setItem('user', JSON.stringify(user));
  }

  async clearUser() {
    runInAction(() => {
      this.user = null;
    });
    await AsyncStorage.removeItem('user');
  }

  async loadUserFromStorage() {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      runInAction(() => {
        this.user = JSON.parse(userData);
      });
    }
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await login(email, password); // Replace with real API call

      if (response.id) {
        runInAction(() => {
          this.setUser(response);
        });
      } else {
        runInAction(() => {
          this.error = response.message;
        });
      }
    } catch (error: any) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    this.clearUser();
  }

  async signUp(username: string, email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await signUp(username, email, password); // Replace with real API call

      if (response.id) {
        runInAction(() => {
          this.setUser(response);
        });
      } else {
        runInAction(() => {
          this.error = response.message;
        });
      }
    } catch (error: any) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const authStore = new AuthStore();
export default authStore;
