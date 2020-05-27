import { AsyncStorage } from 'react-native'
import {decks} from './_DATA'

export const DECK_STORAGE_KEY = 'Flashcards:decks'


export function getDeck () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        const data = JSON.parse(results);
        return data === null ? decks : data;
    });
}

// export function getDeck(id) {
 
// }

// export function saveDeckTitle (title) {
  
// }

// export function addCardToDeck(title,card){

// }