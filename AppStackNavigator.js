import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import BuyScreen from '../screens/BuyScreen'
import RecieverDetailsScreen  from '../screens/RecieverDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  BuyBookList : {
    screen : BuyScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'BuyBookList'
  }
);

