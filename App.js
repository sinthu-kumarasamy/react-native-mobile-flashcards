import React from 'react'
import { View, Platform, StatusBar,Text } from 'react-native'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/index'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { purple, white } from './utils/color'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import middleware from './middleware'

const store = createStore(
  reducers,
  middleware 
)


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

//   return (
// function SettingsScreen() {
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="Add" component={AddDeck} />
    </Tab.Navigator>
  );
}


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
      </Provider>
    )
  }
}