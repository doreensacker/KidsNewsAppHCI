import { StackNavigator } from 'react-navigation';
import HomeScreen from './routes/home';
import ArticleScreen from './routes/article';

const KidsNewsApp = StackNavigator({
  Home: { screen: HomeScreen },
  Article: { screen: ArticleScreen },

});

export default KidsNewsApp;
