import React from 'react';
import {View} from 'react-native'
import {AddEntry} from "./components/AddEntry";
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducer from './store/reducers'
import History from "./components/History";

const App = () => {
  return (
  <Provider store={createStore(reducer)}>
    <View style={{flex:1}}>
      <View style={{height: 20}}/>
        <History/>
    </View>
  </Provider>
  );
}

export default App
