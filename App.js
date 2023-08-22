import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/Navigation/DrawerNavs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiStepRegistration from './src/screens/registrationScreen';
import LoginScreen from './src/screens/LoginScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuthentication() {
      const token = await AsyncStorage.getItem('UserToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
    checkAuthentication();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
        )}
         <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="userlogin" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={MultiStepRegistration} options={{ headerShown: false }} />
      </Stack.Navigator>
        
    </NavigationContainer>
  );
};

export default App;
