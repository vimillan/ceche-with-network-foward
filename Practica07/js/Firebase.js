import { initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyBqbgcbCW9RLGFUXWtlmXpcSkXp2WqvHbw",
    authDomain: "pwa-10a-vi.firebaseapp.com",
    projectId: "pwa-10a-vi",
    storageBucket: "pwa-10a-vi.appspot.com",
    messagingSenderId: "89518814155",
    appId: "1:89518814155:web:00c5657249bf29b847bc4e"
};

const app = initializeApp(firebaseConfig);

export{
    app
}