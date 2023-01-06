const addNote = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem('notes'))
if(notes){
    notes.forEach(note => addNewNote(note))
}

addNote.addEventListener('click', ()=> {addNewNote()});

function addNewNote(text =""){
    const Note = document.createElement("div");
    Note.classList.add("note");
    Note.innerHTML = `
    <div class="tools">
            <button class="edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class = "${text ?"hidden" : ""}"></textarea>
    `

    const editBtn = Note.querySelector('.edit');
    const deleteBtn = Note.querySelector('.delete');
    const main = Note.querySelector('.main');
    const textarea = Note.querySelector('textarea')


    textarea.value = text;
    main.innerHTML = text
    deleteBtn.addEventListener('click' , ()=>{
        Note.remove();
        updateLs()
    })

    editBtn.addEventListener('click' , ()=>{
        main.classList.toggle('hidden')
        textarea.classList.toggle('hidden')
    })

    textarea.addEventListener('input' , (e)=>{
        const {value} =e.target
        main.innerHTML= value;
        updateLs()

    })
    document.body.appendChild(Note)
}

function updateLs(){
    const notesText = document.querySelectorAll("textarea");
    const notes =[];
    notesText.forEach(note => notes.push(note.value))
    localStorage.setItem('notes' , JSON.stringify(notes))
}