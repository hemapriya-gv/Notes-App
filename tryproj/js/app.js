console.log("Welcome to notes app. This is app.js")

function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        output.innerHTML = transcript;
       
    };
  
     // start recognition
     recognition.start();
}



showNotes();

//If a user adds a note, add it to localStorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt","output");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value + output.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    output.value = "";

    //console.log(notesObj);
    showNotes();

})




//Function to show elements from localStorage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text"> ${element}</p>
                    <button id = "${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-primary">Delete Note</button>
                </div>
            </div>   
            `;
    })
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add My Note" section above to add notes.`;
    }
}

//Function to delete a note
function deleteNote(index) {
    //console.log('I am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    //console.log('Input event fired',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardTxt) ;
    })

})