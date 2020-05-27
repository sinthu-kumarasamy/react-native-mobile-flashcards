import {getDeck, saveDeckTitle} from '../utils/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function handleInitialData(){
    return (dispatch) =>{
       return getDeck().then((decks)=>{
           dispatch(receiveDecks(decks))
       }) 
    }
}

export function addNewDeck(title){
  return (dispatch)=>{
    return saveDeckTitle(title).then((deck)=>{
      dispatch(addDeck(deck))
    })
  }
}