//ELEMENT TANIMLAMASI
const form=document.querySelector("#todoAddForm")
const inputTodoGiriniz=document.querySelector("#inputTodoGiriniz")
const todoUl=document.querySelector(".list-group")
const buttonTodoTemizle=document.querySelector("#buttonTodoTemizle")
const inputTodoAra=document.querySelector("#inputTodoAra")
const buttonTodoAra=document.querySelector("#buttonTodoAra")

//SAYFA AÇILIŞI
window.addEventListener("DOMContentLoaded",run)
form.addEventListener("submit",backendEkle)
function run(){
    const yapılacaklar=JSON.parse(localStorage.getItem("yapılacaklar")) || []
    yapılacaklar.forEach(function(todoText){
        frontendEkle(todoText)
    })
}

//BACKEND EKLE
function backendEkle(e){
    e.preventDefault()
    const todoText=inputTodoGiriniz.value.trim()
    if(todoText==""){
        console.log("Todo Boş Girildi!")
    }else{
        frontendEkle(todoText)
        localeKaydet(todoText)
        inputTodoGiriniz.value=""
        inputTodoGiriniz.focus()
    }
}

//FRONTEND EKLE
function frontendEkle(todoText) {
    const newTodoLi = document.createElement("li");
    newTodoLi.className = "list-group-item d-flex justify-content-between";
    newTodoLi.innerHTML = `${todoText} <a href="#" class="delete-item"><i class="fa fa-remove"></i></a>`;
    todoUl.appendChild(newTodoLi);
    const newTodoI = newTodoLi.querySelector("i");
    newTodoI.addEventListener("click", sil);
}


//SEÇİLİ SİLME
function sil(e){
    const iToLi=e.target.closest("li")
    const todoText=iToLi.textContent.trim()
    let todos=JSON.parse(localStorage.getItem("yapılacaklar")) || []
    let newTodos=[]
    for(let i=0;i<todos.length;i++){
        if(todos[i]!==todoText){
            newTodos.push(todos[i])
        }else{
            localStorage.removeItem(todos[i])
            iToLi.remove()
        }
    }
    todos=newTodos
    localStorage.setItem("yapılacaklar",JSON.stringify(todos))


}

//LOCAL STORAGE KAYDETME
function localeKaydet(todoText){
    let yapılacaklar = JSON.parse(localStorage.getItem("yapılacaklar")) || [];
    yapılacaklar = yapılacaklar.filter(todo => todo !== todoText);
    
    yapılacaklar.push(todoText);
    localStorage.setItem("yapılacaklar", JSON.stringify(yapılacaklar));

}

//TÜMÜNÜ SİLME
buttonTodoTemizle.addEventListener("click",tümünüSil)

function tümünüSil(){
    const onay=confirm("Tüm Todo'lar Silinecektir! Onaylıyor Musunuz?")
    if(onay){
        todoUl.innerHTML=""
        localStorage.removeItem("yapılacaklar") 
    }else{
        alert("Tüm Todo'ları Silme İşlemi İptal Edildi.")
    }
}


//TODO ARA INPUT
 inputTodoAra.addEventListener("keyup",todoAra)
 function todoAra(e) {
     const filterValue = e.target.value.toLowerCase().trim();
     const yapılacaklar = JSON.parse(localStorage.getItem("yapılacaklar")) || [];

     const filtreliTodo = yapılacaklar.filter(function(todo){
     return todo.toLowerCase().includes(filterValue);
     });
     todoUl.innerHTML = "";
     filtreliTodo.forEach(todoText => frontendEkle(todoText));
     if (filtreliTodo.length === 0 && filterValue !== "") {
    }
 }

//İSTEYEN BUTTON KULLANABİLİR
// //TODO ARA BUTTON
// buttonTodoAra.addEventListener("click",todoAra)
// function todoAra() {
//     const filterValue = inputTodoAra.value.toLowerCase().trim();
//     const yapılacaklar = JSON.parse(localStorage.getItem("yapılacaklar")) || [];

//     const filtreliTodo = yapılacaklar.filter(function(todo){
//     return todo.toLowerCase().includes(filterValue);
//     });
//     todoUl.innerHTML = "";
//     filtreliTodo.forEach(todoText => frontendEkle(todoText));
//     if (filtreliTodo.length === 0 && filterValue !== "") {
//         alert("Eşleşen Bir Todo Bulunamadı!");
//     }
// }


















































