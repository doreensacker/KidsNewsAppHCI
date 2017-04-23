import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  ListView,
  View,
  Image,
  TouchableHighlight,
} from 'react-native'

export default class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'TEST',
      headerRight: (
        <Button
          title='menu'
          onPress={() => this.props.navigation.navigate('DrawerOpen') }
        >Menu</Button>
      )
    };
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loaded: false,
    };
  }
  render() {
    if(this.state.loaded){
      return(
        <ScrollView>
          {this.wholeNews()}
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <Text>
          loading...
        </Text>
      </ScrollView>
    );
  }

  wholeNews() {
    const { navigate } = this.props.navigation;
    return this.state.dataSource.map(function(news, i){
      return(
        <TouchableHighlight
        key={i}
        onPress={() => navigate('Article', { articleURL: news.apiUrl }) }
        underlayColor='lightgrey'
        >
        <View
          style= {styles.articleContainer}>
          <Text
          style={styles.headline}
          onPress={() => navigate('Article', { articleURL: news.apiUrl }) }>{news.fields.headline}</Text>
          <Image
            style={styles.image}
            source={{uri: news.fields.thumbnail}}
            onPress={() => navigate('Article', { articleURL: news.apiUrl }) }
          />
            <Text style={styles.sectionName}>{news.sectionName}</Text>
        </View>
        </TouchableHighlight>
      );
    });
  }

  header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    this.getArticlesFromApiAsync()
    .then( (response) => this.setState({
      dataSource: response,
      loaded: true,
    })
    );
  }

  getArticlesFromApiAsync() {
    return fetch('https://content.guardianapis.com/search?q=lifestyle&show-fields=thumbnail,headline&api-key=ffc6bb6f-72e2-4c3d-9b5a-c14f1889f46d')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.response.results;
      })
      .catch((error) => {
        console.error(error);
      });
  }


}

const styles = StyleSheet.create({
  articleContainer: {
    margin: 10,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#cccfd2',
    backgroundColor: '#ffffff',

    elevation: 2,

    shadowColor: '#d3d3d3',
    shadowOpacity: 2,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
  },
  header: {
    fontSize: 50,
    color: 'yellow',
  },
  headline: {
    color: '#5D5D5D',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
  },
  image: {
    height: 150,
  },
  sectionName: {
    color: 'red',
    fontSize: 13,
    margin: 2,
  }
});
