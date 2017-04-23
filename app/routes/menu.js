import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  View,
} from 'react-native';

export default class MenuScreen extends Component {
  static navigationOptions = {
    headerTitle: <Text> NEWS </Text>,
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
        <ScrollView>
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

}

const styles = StyleSheet.create({
  listItemView :{
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#cccfd2',
    margin: 8,
  },
  listItem: {
    fontSize: 20,
    color: '#000000',
  },
  headerStyle: {
    backgroundColor: '#50E3C2',
    shadowColor: '#979797',
    shadowOpacity: 5,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
  }

});
