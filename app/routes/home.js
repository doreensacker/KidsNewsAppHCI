import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  ListView,
  View,
  Image,
} from 'react-native'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
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
        <View key={i}>
          <Text onPress={() => navigate('Article', { articleURL: news.apiUrl }) }>{news.webTitle}</Text>
          <View>
            <Text>{news.webPublicationDate}</Text>
            <Text>{news.sectionName}</Text>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: news.fields.thumbnail}}
            />
          </View>
        </View>
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
    return fetch('https://content.guardianapis.com/search?q=lifestyle&show-fields=thumbnail&api-key=ffc6bb6f-72e2-4c3d-9b5a-c14f1889f46d')
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
