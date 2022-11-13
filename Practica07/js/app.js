/*if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
}*/

import { getAllNotesFire, createNoteFire } from "./firebase-functions.js";

const getAllNotes = () => {
    getAllNotesFire();
}

const saveNote = async () => {
    const note = {
        text: '',
        created_at: new Date()
    };
    const textNote = document.getElementById('textNote');
    note.text = textNote.value;

    const generatedId = await createNoteFire(note);

    if (generatedId !== 'no-created') {
        alert('Nota creada!')
        textNote.value = '';
        getAllNotes();
    } else {
        alert('Ocurrió un error')
    }
}

getAllNotes();

const btnSave = document.getElementById('btnSave');
btnSave.addEventListener('click', saveNote);

