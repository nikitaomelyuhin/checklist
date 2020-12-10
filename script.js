const addTask = document.querySelector(".checklist__add");
const task = document.querySelector(".task");
const taskText = document.querySelector(".task__text");
const checklist = document.querySelector(".checklist");
const edit = document.querySelector(".task__edit-btn");

addTask.addEventListener("keyup", addTaskFn);
checklist.addEventListener("click", closeTask);
checklist.addEventListener("click", checkedFn);
checklist.addEventListener("click", editTask);

//==========================================================================================================
// При нажатии нажатии на энтер добавляется задача, под поле с инпутом.
//==========================================================================================================

function addTaskFn(e) {
  if(addTask.value.trim() && e.keyCode === 13) {
    let cloneTask = task.cloneNode(true);
    checklist.appendChild(cloneTask);
    cloneTask.classList.add("task--active");
    let taskTextClone = cloneTask.querySelector(".task__text");
    taskTextClone.innerHTML = addTask.value;
    addTask.value = "";
    task.remove()
    taskText.style.textDecoration = "none";
  }
}
//==========================================================================================================
// При нажатии на крестик, задача удаляется
//==========================================================================================================

function closeTask(e) {

  let close = e.target;
  console.log(close);

  if (close.className != 'task__close') return;

  close.parentElement.remove();
}

//==========================================================================================================
// При нажатии на чекбокс, текст задачи перечеркивается, а чекбокс удаляется
//==========================================================================================================

function checkedFn(e) {

  let checkbox = e.target;

  if (checkbox.className != 'task__checkbox') return;

  checkbox.style.display = "none";

  checkbox.nextElementSibling.style.textDecoration = "line-through";
  
}

//==========================================================================================================
// При нажатии на кнопку ред., задачу можно редактировать.
//==========================================================================================================

function editTask(e) {

  let editButton = e.target;

  if (editButton.className != 'task__edit-btn') return;

  let taskText = editButton.parentElement.querySelector(".task__text");
  let editText = editButton.parentElement.querySelector(".change-text");
  
  editText.value = taskText.innerHTML;
  taskText.style.display = "none";

  editText.classList.add("change-text--active");
  editText.focus()
  
//==========================================================================================================
// при нажатии на энтер или по потере фокуса, задача изменяется
//==========================================================================================================

  editText.addEventListener('blur', editTextBlur);
  editText.addEventListener('keyup', editTextEnter);
  
  function editTextBlur(e) {
    let editTextBlur = e.target;
  
    taskText.style.display = "block";
    taskText.innerHTML = editTextBlur.value; 
  
    editTextBlur.classList.remove("change-text--active");
  }

  function editTextEnter(e) {
    
    if(editText.value.trim() && e.keyCode === 13) {
      let editTextEnter = e.target;
      
      taskText.style.display = "block";
      taskText.innerHTML = editTextBlur.value; 
    
      editTextEnter.classList.remove("change-text--active");
    }
  
  }
}

