import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  ListView,
  View,
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
    // const { navigate } = this.props.navigation;
    if(this.state.loaded){
      return(
        <View>
          {this.WholeNews()}
        </View>
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

  WholeNews() {
    return this.state.dataSource.map(function(news, i){
      return(
        <View key={i}>
          <Text>{news.webTitle}</Text>
          <View>
            <Text>{news.webPublicationDate}</Text>
            <Text>{news.sectionName}</Text>
          </View>
        </View>
      );
    });
  }

  WholeMovies() {
    return this.state.dataSource.map(function(movie, i){
      return(
        <View key={i}>
          <Text>{movie.title}</Text>
          <View>
            <Text>{movie.releaseYear}</Text>
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
    return fetch('https://content.guardianapis.com/search?q=lifestyle&api-key=ffc6bb6f-72e2-4c3d-9b5a-c14f1889f46d')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.response.results;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}



// <Text style={styles.welcome}>
//   Welcome to React Native!
// </Text>
// <Button
//   onPress={() => navigate('Article')}
//   title="Chat with Lucy"
// />




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
