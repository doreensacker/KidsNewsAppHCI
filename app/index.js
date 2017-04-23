import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import { DrawerNavigator, DrawerView, StackNavigator} from 'react-navigation';
import HomeScreen from './routes/home';
import ArticleScreen from './routes/article';
import MenuScreen from './routes/menu';
import HeaderButton from './components/headerButton';

const KidsNewsApp = StackNavigator({
  Home: { screen: HomeScreen },
  Article: { screen: ArticleScreen },
  Menu: { screen: MenuScreen }
}, {navigationOptions: {
  headerTitle: <Text style={{fontSize: 50, color: 'yellow'}}> NEWS </Text>,
  headerStyle: {
    backgroundColor: '#50E3C2',
    shadowColor: '#979797',
    shadowOpacity: 5,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
  },
  headerRight: <HeaderButton route='DrawerOpen' icon={require('./images/menu.png')} />
}}

);

const KidNewsAppContainer = DrawerNavigator({
  App: { screen: KidsNewsApp },
}, {
  drawerWidth: 200,
  drawerPosition: 'right',
  contentComponent: props => <MenuScreen {...props}/>
}

);

export default KidNewsAppContainer;
