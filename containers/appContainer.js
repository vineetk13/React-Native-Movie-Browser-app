import React from 'react';
import SearchScreen from "../screens/searchScreen";
//import { render } from 'react-dom';
//import React from 'react';

export default class AppContainer extends React.Component{
    render(){
        return (
            <SearchScreen onSelectItem={(result) => {
                this.props.navigation.navigate("Details", {
                  id: result.id,
                });
              }}/>
        )
    }
} 