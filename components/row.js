import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { updateFavs } from "../redux/actions/searchAction";
import { connect } from "react-redux";

class Rows extends React.Component {
  addToFavs = () => {
    const tmpFavs = [...this.props.gState.favs]; // clone the array

    // Checking whether the selected "id" exist in the bookmarks list
    if (tmpFavs.find((favId) => favId.id === this.props.id)) {
      // Remove the selected "id" if it existed
      const removeFavs = tmpFavs.filter((favId) => favId.id !== this.props.id);

      // update state
      this.props.updateFavs(removeFavs);
    } else {
      // otherwise, push it to the bookmarks list
      tmpFavs.push({
        id: this.props.id,
        title: this.props.title,
        year: this.props.year,
        img: this.props.img,
      });
      this.props.updateFavs(tmpFavs);
    }
  };
  render() {
    let icon = "heart-outline";
    if (this.props.gState.favs.find((favId) => favId.id === this.props.id)) {
      icon = "heart";
    }
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          this.props.onSelectResult(this.props);
        }}
      >
        <View>
          <Image
            source={{ uri: `${this.props.img}` }}
            style={{ width: 80, height: 120, marginRight: 10, borderRadius: 7 }}
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
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    display:"flex",
  },

  details: {
    fontSize: 18,
  },
  fav: {
    marginLeft: 0,
  },
  name: {
    width: "56%",
  },
});

const mapStateToProps = (state) => {
  return {
    gState: state,
  };
};
export default connect(mapStateToProps, { updateFavs })(Rows);
