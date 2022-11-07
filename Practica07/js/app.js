/*if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
}*/

import { getAllNotesFire } from "./firebase-functions.js";

const getAllNotes = () => {
    getAllNotesFire();
}

getAllNotes();