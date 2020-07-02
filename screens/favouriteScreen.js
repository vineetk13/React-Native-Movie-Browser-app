import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FavRows from "../components/favRows";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class FavScreen extends React.Component {
  render() {
    if (this.props.gState.favs.length !== 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Your Favourites</Text>
          <FlatList
            data={this.props.gState.favs}
            renderItem={
              this.props.gState.favs !== null
                ? ({ item }) => (
                    <FavRows
                      title={item.title}
                      year={item.year}
                      img={item.img}
                      id={item.id}
                    />
                  )
                : null
            }
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.noFavs}>No favourites yet...</Text>
          <Icon name="emoticon-sad-outline" size={35} color="#99AAAB" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom:5,
  },
  noFavs: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#99AAAB",
  },
});

const mapStateToProps = (state) => {
  return {
    gState: state,
  };
};
export default connect(mapStateToProps)(FavScreen);
 