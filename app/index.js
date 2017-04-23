import React from 'react';
import {
  ScrollView,
} from 'react-native';
import { DrawerNavigator, DrawerView, StackNavigator} from 'react-navigation';
import HomeScreen from './routes/home';
import ArticleScreen from './routes/article';
import MenuScreen from './routes/menu';

const KidsNewsApp = StackNavigator({
  Home: { screen: HomeScreen },
  Article: { screen: ArticleScreen },
  Menu: { screen: MenuScreen }
});

const KidNewsAppContainer = DrawerNavigator({
  App: { screen: KidsNewsApp },
}, {
  drawerWidth: 200,
  drawerPosition: 'right',
  contentComponent: props => <ScrollView><MenuScreen {...props}/></ScrollView>
}

);

export default KidNewsAppContainer;
