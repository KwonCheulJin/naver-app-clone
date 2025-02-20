import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import useLogin from '../hooks/useLogin';
export default function LoginButton() {
  const { isLoggedIn, loadLoggedIn, logout } = useLogin();
  const iconName = isLoggedIn ? 'logout' : 'login';
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(() => {
    setIsFocused(true);
    return () => {
      setIsFocused(false);
    };
  });

  useEffect(() => {
    if (isFocused) {
      loadLoggedIn();
    }
  }, [isFocused, loadLoggedIn]);

  const onPressLogin = () => {
    router.navigate({ pathname: 'login' });
  };
  const onPressLogout = () => {
    logout();
  };
  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
}
