import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getDeck } from "../utils/api";
import { handleInitialData } from "../actions/index";
import { gray, purple,white,lightPurp } from "../utils/color";

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { decks } = this.props;
    console.log(decks)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        {Object.values(decks).map((deck) => {
          return (
            <View key={deck.title} style={styles.deckContainer}>
              <View>
                <Text style={styles.deckText}>{deck.title}</Text>
              </View>
              <View>
                <Text style={styles.cardText}>
                  {deck.questions === 'undefined' ? 0 :deck.questions.length} cards
                </Text>
              </View>
            </View>
          );
        })}
      </View>
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
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: white,
    borderRadius: 5,
    width:400,
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
