import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
};
const ShoppingIcon = ({
  focused,
  color,
}: {
  focused: boolean;
  color: string;
}) => {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{ tabBarLabel: '홈', tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="shopping"
        options={{ tabBarLabel: '쇼핑', tabBarIcon: ShoppingIcon }}
      />
    </Tabs>
  );
}
