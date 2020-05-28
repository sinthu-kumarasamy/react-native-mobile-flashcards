import React, { Component } from 'react';
import { View, Text, StyleSheet,Button,ImageBackground } from 'react-native';
import { red, purple,white,lightPurp } from "../utils/color";
import ViewPager from '@react-native-community/viewpager';
import { connect } from 'react-redux';



 class TakeQuiz extends Component {
  
  state = {
    show: 'question',
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: []
  };
  handlePageChange = evt => {
    this.setState({
      show: 'question'
    });
  };
  handleAnswer = (response, page) => {
    if (response === 'correct') {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, index) => (page === index ? 1 : val))
      }),
      () => {
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: 'result' });
        } else {
          this.viewPager.setPage(page + 1);
          this.setState({
            show: 'question'
          });
        }
      }
    );
  };
  handleReset = () => {
    this.setState( {
      show: 'question',
      correct: 0,
      incorrect: 0,
      answered: []
    });
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === 'result') {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.goodResult : styles.avgResult;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You have completed the Quiz!
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount} 
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Overall Score
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <Button
              onPress={this.handleReset}
              title='Restart Quiz'
            >
            </Button>
            <Text>{`\n`}</Text>
            <Button
             title='Home'
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('Home');
              }}
            >
              
            </Button>
          </View>
        </View>
      );
    }

    return (
      <ViewPager
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {questions.map((question, index) => (
          <View style={styles.pageStyle} key={index}>
              
            <View style={styles.block}>
              <Text style={styles.count}>
                {index + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
            <ImageBackground source={require('../assets/question.jpg')} style={styles.image}>
              <Text style={styles.questionText}>
                {show === 'question' ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === 'question'
                    ? question.question
                    : question.answer}
                </Text>
              </View>
              </ImageBackground>
            </View>
            {show === 'question' ? (
              <Button
              title='Answer'
                onPress={() => this.setState({ show: 'answer' })}
              >
              </Button>
            ) : (
              <Button
              title='Question'
                onPress={() => this.setState({ show: 'question' })}
              >
              </Button>
            )}
                    <Text>{`\n`}</Text>
            <View>
              <Button
                title='Correct'
                onPress={() => this.handleAnswer('correct', index)}
                disabled={this.state.answered[index] === 1}
              >
              </Button>
              <Text>{`\n`}</Text>
              <Button
                title='Incorrect'
                onPress={() => this.handleAnswer('incorrect', index)}
                disabled={this.state.answered[index] === 1}
              >
              </Button>
            </View>
          </View>
        ))}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
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
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: purple,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode:'contain'
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20
  },
  goodResult: {
    color: white,
    fontSize: 46,
    textAlign: 'center'
  },
  avgResult: {
    color: red,
    fontSize: 46,
    textAlign: 'center'
  }
});

const mapStateToProps = (decks, { route }) => {
 const title = route.params.title;
  const deck = decks[title];

  return {
    deck
  };
};

export default connect(mapStateToProps)(TakeQuiz)