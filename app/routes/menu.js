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
  static navigationOptions = {
    header: () => ({
      title: <Text style={styles.header}> NEWS </Text> ,
      style: {
        backgroundColor: '#50E3C2',
        shadowColor: '#979797',
        shadowOpacity: 5,
        shadowRadius: 2,
        shadowOffset: {width: 2, height: 2},
      },
    }),
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['world', 'sport', 'cultur', 'lifestyle', 'fashion', 'tech', 'travel', 'environment']),
    };
  }
  render() {
      return(
        <ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </ScrollView>
      );
  }

}

const styles = StyleSheet.create({
  articleContainer: {
    margin: 10,
  },

});
