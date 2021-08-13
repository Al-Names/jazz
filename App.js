import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Layout } from '@ui-kitten/components';
import * as eva from "@eva-design/eva";

import Upload from "./screens/Upload"
import Browse from "./screens/Browse"
import Favorites from "./screens/Favorites"
import Chat from "./screens/Chat"
import RooomsScreen from "./screens/RoomsScreen"
const { Navigator, Screen } = createBottomTabNavigator();


const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='UPLOAD'/>
    <BottomNavigationTab title='BROWSE'/>
    <BottomNavigationTab title='FAVORITES'/>
    <BottomNavigationTab title='CHAT'/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Upload' component={Upload}/>
    <Screen name='Browse' component={Browse}/>
    <Screen name='Favorites' component={Favorites}/>
    <Screen name='Chat' component={RooomsScreen}/>
  </Navigator>
);

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}> 
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
