import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AppTabNavigator} from './components/AppTabNavigator';
import SignUpLoginScreen from './screens/SignupLoginScreen';
import {createAppContainer,createSwicthNavigator} from 'react-navigation';
export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
const SwicthNavigator = createSwicthNavigator({
  SignUpLoginScreen:{screen:SignUpLoginScreen},
  Drawer:{screen:AppTabNavigator}
})
const AppContainer = createAppContainer(SwicthNavigator)