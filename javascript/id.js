import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL : "https://database001-85eb1-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const scoreInDB = ref(database, "score")


const emerField = document.getElementById("name-form")
const logInButton = document.getElementById("login") 
const accountButton = document.getElementById("account")


logInButton.addEventListener("click", function() {
    let inputValue = emerField.value
    push(scoreInDB, inputValue);
});
