import React, { Component } from 'react'
import { View, Text, StyleSheet,Button,TextInput,ImageBackground } from "react-native";
import { connect } from 'react-redux'
import { gray, purple,white,lightPurp } from "../utils/color";
import { addQuestionToDeck } from '../actions';

class AddQuiz extends Component{
    state = {
        question: '',
        answer: ''
      };
      handleQuestionChange = question => {
        this.setState({ question });
      };
      handleAnswerChange = answer => {
        this.setState({ answer });
      };

      handleSubmit = () => {
        const { addQuestionToDeck, title, navigation } = this.props;
        const card = {
          question: this.state.question,
          answer: this.state.answer
        };
    
        addQuestionToDeck(title, card);
    
        this.setState({ question: '', answer: '' });
        navigation.goBack();
      };

    render() {
        return (
            <View style={styles.container}>
              <ImageBackground source={require('../assets/question.png')} style={styles.image}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              onChangeText={this.handleQuestionChange}
              placeholder="Question"
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              onChangeText={this.handleAnswerChange}
              placeholder="Answer"
            />
          </View>
          <Button
          title="Add Question"
          onPress={this.handleSubmit}
        />
        </View>
        <View style={{ height: '30%' }} />
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
      backgroundColor: lightPurp,
      justifyContent: 'space-around'
    },
    block: {
      marginBottom: 20
    },
    image: {
      flex: 1,
      justifyContent: "center",
      resizeMode:'contain'
    },
    title: {
      textAlign: 'center',
      fontSize: 32,
      color:white
    },
    input: {
      borderWidth: 1,
      borderColor: purple,
      backgroundColor: '#fff',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 40
    }
  });

  const mapStateToProps = (state, { route }) => {
    const title = route.params.title
    return {
      title
    };
  };

  export default connect(mapStateToProps,{addQuestionToDeck})(AddQuiz)