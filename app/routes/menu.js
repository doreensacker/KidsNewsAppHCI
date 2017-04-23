import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  View,
} from 'react-native';
import {Answers} from 'react-native-fabric';

export default class MenuScreen extends Component {
  static navigationOptions = {
    headerTitle: <Text> NEWS </Text>,
    headerStyle: {
      backgroundColor: '#50E3C2',
      shadowColor: '#979797',
      shadowOpacity: 5,
      shadowRadius: 2,
      shadowOffset: {width: 2, height: 2},
    }
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['World', 'Sport', 'Cultur', 'Lifestyle', 'Fashion', 'Tech', 'Travel', 'Environment']),
    };
  }

  render() {
    // const { navigate } = this.props.navigation;
    console.log(this.props);
    return(
        <ScrollView style={styles.list}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.listItemView}
              >
              <Text
                onPress={() => this.props.navigation.navigate('Home', { section: rowData })}
                style={styles.listItem}>{rowData}</Text>
            </View>
          }
          />
        </ScrollView>
    );
  }

  componentDidMount() {
    Answers.logCustom('show menu', { bigData: true });
  }


}

const styles = StyleSheet.create({
  list: {
    paddingTop: 30,
    backgroundColor: '#50E3C2',
  },
  listItemView :{
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#ffffff',
  },
  listItem: {
    fontSize: 25,
    color: 'yellow',
    fontWeight: 'bold',
    margin: 8,
  },
  headerStyle: {
    backgroundColor: '#50E3C2',
    shadowColor: '#979797',
    shadowOpacity: 5,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
  },
  header: {
    fontSize: 50,
    color: 'yellow',
  },

});
