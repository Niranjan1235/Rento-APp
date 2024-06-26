import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import ChatThreadsScreen from './screens/ChatThreadsScreen';
import ChatScreen from './screens/ChatScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import SurveyScreen from './screens/SurveyScreen';
import ChartScreen from './screens/ChartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SurveyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Press submit for chart " component={SurveyScreen} />
      <Stack.Screen name="Chart" component={ChartScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'ChatThreads') {
            iconName = 'message';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            iconName = 'chat';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Invoice') {
            iconName = 'file-text-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'Survey') {
            iconName = 'poll';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
          return null;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="ChatThreads" component={ChatThreadsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Invoice" component={InvoiceScreen} />
      <Tab.Screen name="Survey" component={SurveyStack} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
