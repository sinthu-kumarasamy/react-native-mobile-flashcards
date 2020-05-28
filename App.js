import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/index'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import middleware from './middleware'
import  DeckView from './components/DeckView'
import  TakeQuiz from './components/TakeQuiz'
import  AddQuiz from './components/AddQuiz'
import { setLocalNotification } from './utils/helper'
import { Notifications } from 'expo';



export const store = createStore(
  reducers,
  middleware
)


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks"  component={DeckList} />
      <Tab.Screen name="Add"  component={AddDeck} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="Deck" component={DeckView} />
      <Stack.Screen name="Quiz" component={TakeQuiz} />
      <Stack.Screen name="AddQuestion" component={AddQuiz} />
    </Stack.Navigator>
  );
}


export default class App extends React.Component {
   componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    )
  }
}

