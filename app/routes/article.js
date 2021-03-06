import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {Answers} from 'react-native-fabric';

export default class ArticleScreen extends Component {
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
            style={styles.image}
            source={{uri: this.state.article.content.fields.thumbnail}}
          />
          <Text style={styles.sectionName}>{this.state.article.content.sectionName}</Text>
          <Text style={styles.headline}>{this.state.article.content.fields.headline}</Text>
          <HTMLView
            value={this.state.article.content.fields.body}
            addLineBreaks={false}
            stylesheet={htmlStyle}
            style={styles.webView}
          />
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
    .then( (response) => {
      this.setState({
        article: response,
        loaded: true,
      });
      Answers.logCustom('ArticleScreen loaded', { article: this.state.article.content.fields.headline });
    }
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
  webView: {
    margin: 20
  },
  image: {
    height: 200,
  },
  sectionName: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  headline: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    fontSize: 50,
    color: 'yellow',
  },
});

const htmlStyle = StyleSheet.create({
  p: {
    fontSize: 15,
    lineHeight: 25,
    margin: 0,
    padding: 0,
  }
})
