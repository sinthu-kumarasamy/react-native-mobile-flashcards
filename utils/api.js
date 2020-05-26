import { AsyncStorage } from 'react-native'
import {decks} from './_DATA'

export const DECK_STORAGE_KEY = 'Flashcards:decks'


export function getDeck () {
    const deck_data = AsyncStorage.getItem(DECK_STORAGE_KEY)
    if (deck_data === null) {
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
      }
  
    return deck_data === null ? decks : JSON.parse(deck_data);
}

// export function getDeck(id) {
 
// }

// export function saveDeckTitle (title) {
  
// }

// export function addCardToDeck(title,card){

// }