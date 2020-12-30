  
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SellScreen from '../screens/SellScreen'
import BuyScreen from '../screens/BuyScreen'



export const AppTabNavigator = createBottomTabNavigator({
  SellBooks : {
    screen: SellScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require('../Asserts/download.jpg')} style={{width:20, height:20}}/>,
      tabBarLabel : "Sell Books",
    }
  },
  BuyBooks: {
    screen: BuyScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require('../Asserts/unamed.png')} style={{width:20, height:20}}/>,
      tabBarLabel : "Buy Books",
    }
  }
});