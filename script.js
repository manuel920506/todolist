var TodoList = function(){
	let doc = document;
	let todos = [
		'Call my Doctor1',
		'Call my Doctor2',
		'Call my Doctor2'
	];
	let createLi = function(text){
		let li = doc.createElement('li');
		li.appendChild(doc.createTextNode(text)); 
		return li;
	}
	return {
		getTodos: function(){
			return todos;
		},
		addTodo: function(todo) {
			todos.push(todo)
		},
		createLi: createLi
	}
};

document.addEventListener('DOMContentLoaded', function(){
	var myApp = TodoList();
	myApp.addTodo('Go to school');
	console.log(myApp.getTodos()[0]); 
	let doc = document;
	let showCompleted = false;
 
	let todolist = doc.querySelector('#todolist');
	let showCompletedBtn = doc.querySelector('#showCompletedBtn');

	showCompletedBtn.addEventListener('click', function(e){  
		showCompleted = !showCompleted;
		e.target.innerHTML = showCompleted ? 'Hide Completed' : 'Show Completed';
		let checkedElements = todolist.getElementsByClassName('checked');
		for(let i=0; checkedElements[i]; i++){
			//checkedElements[i].style.display = 'inline-block';
			checkedElements[i].classList.toggle('hidden');
		}
	});

	todolist.addEventListener('click', function(e){
		if(e.target.id != 'addElementLi' && e.target.nodeName.toLowerCase() === 'li' && e.offsetX > 5 && e.offsetX < 18){
			e.target.classList.toggle('checked');
			if(!showCompleted){
				e.target.classList.add('hidden');
			}
		}
		//console.dir(e);
	});

	let todoInput = doc.querySelector('#todo');
	todoInput.addEventListener('keypress', function(e){
		if(e.keyCode === 13 && e.target.value && e.target.value.length>=3){
			let todo = e.target.value;
			myApp.addTodo(todo); 
			e.target.value = "";
			let li = myApp.createLi(todo); 
			todolist.insertBefore(li, todolist.firstElementChild.nextElementSibling);
		}
		//console.dir(e);
	});


	let todos = myApp.getTodos();
	/*
	let elementi = todos.map(function(todo){
		return '<li>'+todo+'</li>';

	}); 
	todolist.innerHTML = elementi;
	*/ 
	todos.forEach(function(todo){ 
		todolist.appendChild(myApp.createLi(todo));
	});
});

