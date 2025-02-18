import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ShoppingScreen() {
  const handlePress = () => {
    router.navigate({ pathname: 'browser' });
  };
  return (
    <View>
      <Text>Shopping</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Go To Browser</Text>
      </TouchableOpacity>
      <MaterialCommunityIcons name="shopping" size={50} />
    </View>
  );
}
