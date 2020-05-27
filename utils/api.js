import { AsyncStorage } from 'react-native'
import {decks} from './_DATA'

export const DECK_STORAGE_KEY = 'Flashcards:decks'


export function getDeck () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        const data = JSON.parse(results);
        if(data === null){
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
        }
        return data === null ? decks : data;
    });
}

// export function getDeck(id) {
 
// }

export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
        title,
        questions : []
        }
      }))
}

// export function addCardToDeck(title,card){

// }