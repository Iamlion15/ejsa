// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NewsScreen from '../screens/NewsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import CustomDrawerContent from './CustomDrawerNavigator';
import NewsDetailScreen from '../screens/NewsDetail';
import ReviewScreen from '../screens/ReviewScreen';
import AddCommentScreen from '../screens/addComment';
import LoginScreen from '../screens/LoginScreen';
import UserDetailScreen from '../screens/UserProfileScreen';
import UpdateRegistration from '../screens/updateRegistration';
import NewspaperTable from '../screens/newspaperTable';
import NewspaperInfoScreen from '../screens/NewspaperInfo';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} />}
    initialRouteName='News'
    >
      <Drawer.Screen name="News" component={NewsScreen} />
      <Drawer.Screen name="Statistics" component={StatisticsScreen}/>
      <Drawer.Screen name="account" component={LoginScreen}/>
      <Drawer.Screen name="detail" component={NewsDetailScreen}/>
      <Drawer.Screen name="news review" component={ReviewScreen}/>
      <Drawer.Screen name="add comment" component={AddCommentScreen}/>
      <Drawer.Screen name="user account" component={UserDetailScreen}/>
      <Drawer.Screen name="update" component={UpdateRegistration}/>
      <Drawer.Screen name="Number report" component={NewspaperTable}/>
      <Drawer.Screen name="info" component={NewspaperInfoScreen}/>

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
