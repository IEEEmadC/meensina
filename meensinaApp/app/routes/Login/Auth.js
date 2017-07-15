import Api from '../../config/axios';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const socialAuth = (user) => {
  Api.post('/auth/validate', {
    email: user.email,
  }).then((response) => {
    const value = `Bearer ${response.data.token}`;
    Api.defaults.headers.common['Authorization'] = value;
    AsyncStorage.setItem('token', value);
    Actions.home();
  }).catch(() => {
    alert('Senha ou usuário incorretos');
  })
};
