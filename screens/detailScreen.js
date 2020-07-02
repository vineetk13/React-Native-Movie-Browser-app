import React from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";

export default class DetailScreen extends React.Component {
  state = {
    details: null,
  };
  componentDidMount() {
    this.fetchDetails();
    //this.props.navigation.setOptions({title:this.state.details.Production})
  }
  fetchDetails = async () => {
    const id = this.props.navigation.getParam("id");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=e09fdb8f&i=${id}`
      );
      const resultObj = await response.json();

      this.setState({ details: resultObj });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    console.log("Details screen");
    if (this.state.details !== null) {
      return (
        <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.prod}>{this.state.details.Production}'s</Text>
            <View style={styles.shadow}>
              <Image
                source={{ uri: `${this.state.details.Poster}` }}
                style={styles.img}
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
              {this.state.details.Title}
            </Text>
            <Text style={{ fontSize: 17 }}>{this.state.details.Released}</Text>
          </View>
          <View style={styles.lower}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Genre:</Text>{" "}
              {this.state.details.Genre}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Runtime:</Text>
              {this.state.details.Runtime}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Plot:</Text>{" "}
              {this.state.details.Plot}
            </Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Ratings:</Text>
            <Text style={styles.text}>
              {this.state.details.Ratings[0].Source} :{" "}
              {this.state.details.Ratings[0].Value}
            </Text>
            <Text style={styles.text}>
              {this.state.details.Ratings[1].Source} :{" "}
              {this.state.details.Ratings[1].Value}
            </Text>
            <Text style={styles.text}>
              {this.state.details.Ratings[2].Source} :{" "}
              {this.state.details.Ratings[2].Value}
            </Text>
          </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  prod:{
      fontWeight:"bold",
      fontSize:25,
      marginBottom:8,
  },
  lower: {
    alignItems: "flex-start",
    marginLeft: 8,
  },
  text: {
    fontSize: 17,
    padding: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#202020",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.39,
    elevation: 2,
  },
  img: {
    width: 210,
    height: 290,
    borderRadius: 7,
  },
});
