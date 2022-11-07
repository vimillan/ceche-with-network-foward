import { } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"
import { collection, query, where, getDocs, getFirestore} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { app } from "./Firebase.js";

const db = getFirestore(app);

const getAllNotesFire = async () => {
    const q = query(collection(db, "notas"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}

export{
    getAllNotesFire
}