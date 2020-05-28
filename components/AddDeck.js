import React,{Component} from 'react'
import {View,Text,StyleSheet,TextInput,Button,ImageBackground} from 'react-native'
import { gray, purple,white,lightPurp } from "../utils/color";
import { addNewDeck } from '../actions';
import {connect} from 'react-redux'

class AddDeck extends Component{
    state = {
        deck_title: ''
      };
      handleChange = value => {
        this.setState({ deck_title : value });
      }
    handleSubmit = ()=>{
        const { addNewDeck, navigation } = this.props;

        addNewDeck(this.state.deck_title);
    this.setState(() => ({ deck_title: '' }));
    navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
               <ImageBackground source={require('../assets/quiz.png')} style={styles.image}>
            <View style={{ height: 60 }} />
            <View style={styles.block}>
              <Text style={styles.title}>What is the title of your new deck?</Text>
            </View>
            <View style={[styles.block]}>
              <TextInput
                style={styles.input}
                value={this.state.deck_title}
                onChangeText={this.handleChange}
              />
            </View>
            <Button
          title="Create Deck"
          onPress={this.handleSubmit}
          disabled = {this.state.deck_title===''}
        >
              
            </Button>
            </ImageBackground>
          </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      resizeMode:'contain'
    },
    block: {
      marginBottom: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 32,
    },
    input: {
      borderWidth: 1,
      borderColor: purple,
      backgroundColor: white,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 40,
      marginBottom: 20
    }
  });

export default connect(null,{addNewDeck})(AddDeck)