import { } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"
import { collection, query, where, getDocs, getFirestore, addDoc, limit, } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { app } from "./Firebase.js";

const db = getFirestore(app);

const getAllNotesFire = async () => {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    const q = query(collection(db, "notas"), limit(5));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const card = document.createElement('div');
        card.classList.add('item');
        card.classList.add('mb-2');
        card.classList.add('mx-2');
        card.classList.add('row');
        card.innerHTML = `
            <div class="col-3 col-lg-1 mt-2 mb-2">
                <img src="https://images.unsplash.com/photo-1610126176343-3e1833a107e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                class="img-fluid rounded-circle avatar" alt="...">
            </div>
            <div class="col-9 col-lg-11 mt-2 mb-2">
                <strong class="d-inline-block text-truncate" style="max-width: 200px;">
                    Receta de pan de limón
                </strong>
                <br />
                <span class="d-inline-block text-truncate" style="max-width: 200px;">
                    ${doc.data().text}
                </span>
            </div>
        `
        card.addEventListener('click', () => {
            console.log(doc.id)
        })
        itemList.appendChild(card)
    });
}

const createNoteFire = async (note) => {
    try {
        const docRef = await addDoc(collection(db, "notas"), note);
        return docRef.id
    } catch (error) {
        console.log(error)
        return 'no-created'
    }
}

export {
    getAllNotesFire, createNoteFire
}