import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native'
import { DrawerNavigator, DrawerView, StackNavigator} from 'react-navigation';
import HomeScreen from './routes/home';
import ArticleScreen from './routes/article';

const KidsNewsAppDrawer = DrawerNavigator({
  Home: { screen: HomeScreen },
}, {
  drawerWidth: 200,
  drawerPosition: 'right',
  contentComponent: props => <ScrollView><DrawerView.Items {...props} /></ScrollView>
}

);

const KidsNewsApp = StackNavigator({
  Home: { screen: HomeScreen },
  Article: { screen: ArticleScreen },
  Menu: {screen: KidsNewsAppDrawer},
});

export default KidsNewsApp;
