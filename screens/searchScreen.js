import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Rows from "../components/row";
import { handleInput, fetchResults } from "../redux/actions/searchAction";
import { connect } from "react-redux";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearchChange = (name) => {
    this.props.handleInput(name);
  };

  searchApi = () => {
    this.props.fetchResults(this.props.gState.name);
  };
  keyExtractor = (item) => item.id;
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            value={this.props.gState.name}
            onChangeText={this.handleSearchChange}
          />
          <Icon.Button
            name="search"
            size={28}
            color="#0A79DF"
            backgroundColor="white"
            paddingLeft={12}
            paddingBottom={12}
            paddingTop={5}
            borderRadius={39}
            onPress={this.searchApi}
          />
        </View>
        <View style={styles.list}>
        {this.props.gState.results!=null ? 
          <FlatList
            data={this.props.gState.results}
            keyExtractor={this.keyExtractor}
            renderItem={
              this.props.gState.results !== null
                ? ({ item }) => (
                    <Rows
                      title={item.title}
                      year={item.year}
                      img={item.img}
                      id={item.id}
                      onSelectResult={this.props.onSelectItem}
                    />
                  )
                : null
            }
          /> :
          <View style={styles.error}><Text>No results found</Text></View>
        }
        </View>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  input: {
    borderColor: "blue",
    borderWidth: 1,
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 5,
    width: "80%",
    fontSize: 18,
  },
  error:{
     justifyContent:"center",
     flex:1,
     backgroundColor:"red",
  },
  search: {
    justifyContent:"center",
    //alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  list: {
    display: "flex",
  },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const mapStateToProps = (state) => {
  return {
    gState: state,
  };
};
export default connect(mapStateToProps, { handleInput, fetchResults })(
  SearchScreen
);
