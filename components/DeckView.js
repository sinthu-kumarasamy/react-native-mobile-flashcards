import React, { Component } from 'react'
import { View, Text, StyleSheet,Button,ImageBackground } from "react-native";
import {connect} from "react-redux"
import { gray, purple,white,lightPurp } from "../utils/color";
const image = { uri: "./assets/quiz.jpg" };
class DeckView extends Component {
  render() {
      const {deck} =  this.props
     return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
         <ImageBackground source={require('../assets/quiz.jpg')} style={styles.image}>
     <View key={deck.title} style={styles.deckContainer}>
   
       <View>
         <Text style={styles.deckText}>{deck.title}</Text>
       </View>
       <View>
         <Text style={styles.cardText}>
           {deck.questions.length} cards
         </Text>
       </View>
     </View>
     <Text>{`\n`}</Text>
     <Button
          title="Start Quiz"
          onPress={() => this.props.navigation.navigate('Quiz', {title: deck.title})}
        />
        <Text>{`\n`}</Text>
      <Button title="Add Question" onPress={() => this.props.navigation.navigate('AddQuestion', {title: deck.title})}/>
      </ImageBackground>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  
    title: {
      fontSize: 40,
      textAlign: "center",
      marginBottom: 16,
      color: purple,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      resizeMode:'contain'
    },
    deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: white,
    elevation : 20,
    borderRadius: 10,
    width:300,
    marginBottom: 10,
    },
    deckText: {
      fontSize: 28,
    },
    cardText: {
      fontSize: 18,
      color: lightPurp,
    },
  })

function mapStateToProps(decks,{navigation,route}){
    const title = route.params.title;
    const deck = decks[title];
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckView)