import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class HeaderButton extends Component {

  render() {
    const { route, icon, navigation } = this.props;
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate('DrawerOpen')}
        underlayColor='lightgrey'>
        <Image
          source={icon}
          style={styles.icon} />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    margin: 10,
  }
})

export default withNavigation(HeaderButton);
