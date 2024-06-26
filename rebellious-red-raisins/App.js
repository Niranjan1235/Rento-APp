import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import ChatThreadsScreen from './screens/ChatThreadsScreen';
import ChatScreen from './screens/ChatScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import SurveyScreen from './screens/SurveyScreen';// Adjust the path as needed

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'ChatThreads') {
              iconName = 'message';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            } 
            else if (route.name === 'Invoice') {
              iconName = 'file-text-o';
              return <FontAwesome name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'Survey') {
              iconName = 'poll';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            } 
            else if (route.name === 'Chat') {
              iconName = 'chat';
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
        <Tab.Screen name="Survey" component={SurveyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
