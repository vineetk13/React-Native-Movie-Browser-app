import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateFavs } from '../redux/actions/searchAction';
import { connect } from 'react-redux';

class FavRows extends React.Component {
  addToFavs = () => {
    const tmpFavs = [...this.props.gState.favs]; // clone the array

    // Checking whether the selected "id" exist in the bookmarks list
    if (tmpFavs.find((favId) => favId.id === this.props.id)) {
      // Remove the selected "id" if it existed
      const removeFavs = tmpFavs.filter((favId) => favId.id !== this.props.id);

      // update state
      this.props.updateFavs(removeFavs);
      // this.setState({
      //   bookmarks: [...removeBookmark],
      // });
    } else {
      // otherwise, push it to the bookmarks list
      tmpFavs.push({
        id: this.props.id,
        title: this.props.title,
        year: this.props.year,
        img: this.props.img,
      });
      this.props.updateFavs(tmpFavs);
      // this.setState({
      //   bookmarks: [...tmpBookmarks],
      // });
    }
  };
  render() {
    let icon = 'heart-outline';
    if (this.props.gState.favs.find((favId) => favId.id === this.props.id)) {
      icon = 'heart';
    }
    return (
      <View style={styles.favlist}>
        <TouchableOpacity style={styles.list}>
          <View>
            <Image
              source={{ uri: `${this.props.img}` }}
              style={{
                width: 80,
                height: 120,
                marginRight: 10,
                borderRadius: 7,
              }}
            />
          </View>
          <View style={styles.name}>
            <Text style={styles.details} key={this.props.key}>
              {this.props.title}
            </Text>
            <Text>{this.props.year}</Text>
          </View>
          <View style={styles.fav}>
            <Icon.Button
              name={icon}
              size={32}
              color="red"
              backgroundColor="white"
              onPress={this.addToFavs}
              paddingTop={8}
              paddingLeft={18}
              borderRadius={38}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 20,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    marginRight: 2,
  },
  details: {
    fontSize: 18,
  },
  fav: {
    marginLeft: 6,
    //borderWidth:2,
  },
  favlist: { display: 'flex' },
  name: {
    width: '56%',
  },
});

const mapStateToProps = (state) => {
  return {
    gState: state,
  };
};
export default connect(mapStateToProps, { updateFavs })(FavRows);
