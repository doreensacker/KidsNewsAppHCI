import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native'

export default class ArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      article: {},
      loaded: false,
    };
  }

  render() {
    if(this.state.loaded){
      return(
        <ScrollView>
          {this.showArticle()}
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

  showArticle() {
    return(
      <View>
        <View>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: this.state.article.content.fields.thumbnail}}
          />
          <Text>{this.state.article.content.fields.headline}</Text>
          <Text>{this.state.article.content.fields.bodyText}</Text>
        </View>
      </View>
    );
  }


  header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    this.getArticleFromApiAsync()
    .then( (response) => this.setState({
      article: response,
      loaded: true,
    })
    );
  }

  getArticleFromApiAsync() {
    const { params } = this.props.navigation.state;
    return fetch(params.articleURL + '?show-elements=all&show-fields=all&api-key=ffc6bb6f-72e2-4c3d-9b5a-c14f1889f46d')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.response;
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
