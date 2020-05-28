import React, { Component } from "react";
import { View, Text, StyleSheet ,ImageBackground} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/index";
import { gray, purple,white,lightPurp } from "../utils/color";
import { TouchableOpacity,ScrollView } from "react-native-gesture-handler";

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { decks } = this.props;
    return (
      <ScrollView style={styles.scrollView}>
        <ImageBackground source={require('../assets/quiz.png')} style={styles.image}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        {Object.values(decks).map((deck) => {
          return (
            <TouchableOpacity key={deck.title} onPress={() => this.props.navigation.navigate('Deck',{title :deck.title })} >
            <View  style={styles.deckContainer}>
              <View>
                <Text style={styles.deckText}>{deck.title}</Text>
              </View>
              <View>
                <Text style={styles.cardText}>
                  {deck.questions === 'undefined' ? 0 :deck.questions.length} cards
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          );
        })}
        </ImageBackground>
      </ScrollView>
    );
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

  scrollView:{
    backgroundColor : 'pink'
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
    marginLeft:30,
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
});
function mapStateToProps(decks){
  return{
      decks
  }
}



export default connect(mapStateToProps)(DeckList);
