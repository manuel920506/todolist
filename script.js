var TodoList = function(){
	let doc = document;
	let hasLocalStorage = function(){
		return 'localStorage' in window
	}
	let showCompleted = false;
	if(hasLocalStorage){
		showCompleted = JSON.parse(localStorage.getItem('showCompleted')); 
		doc.querySelector('#showCompletedBtn').innerHTML = showCompleted ? 'Hide Completed' : 'Show Completed'; 
	}
	let todos = [
		// {
		// 	name: 'Go to School',
		// 	completed: false
		// },
		// {
		// 	name: 'Go to bed',
		// 	completed: false

		// }
	];
	let createLi = function(obj, id){
		id = id || 0;
		let li = doc.createElement('li');
		li.id = id;
		li.appendChild(doc.createTextNode(obj.name)); 
		if(obj.completed){
			li.classList.add('checked'); 
			if(!showCompleted){
				li.classList.add('hidden'); 
			}
		}
		return li;
	};
	let orderList = function(todolist){
		let Lis = todolist.getElementsByTagName('li'); 
		for(let i=1;Lis[i];i++){
			Lis[i].id = i-1;
		}
	};
	let toggleComplete = function(id){
		todos[id].completed = !todos[id].completed;
	};
	let syncLocalStorage = function(id){
		localStorage.setItem('todos', JSON.stringify(todos));
	}; 
	let toggleViewCompleteCheckedElements = function(checkedElements){ 
		for(let i=0; checkedElements[i]; i++){
			//checkedElements[i].style.display = 'inline-block';
			checkedElements[i].classList.toggle('hidden');
		} 
	}

	return {
		toggleViewComplete: function(){
			showCompleted = !showCompleted;
			if(hasLocalStorage()){
				localStorage.setItem('showCompleted', showCompleted);
			} 
		},
		getShowCompleted: function(){
			return showCompleted;
		},
		getTodos: function(){
			if(todos.length){
				return todos;
			}
			if(hasLocalStorage() && localStorage.getItem('todos')){
				todos = JSON.parse(localStorage.getItem('todos'));
				return todos;
			} 
		},
		addTodo: function(todo) {
			todos.unshift({name: todo, completed: false});
			syncLocalStorage();
		},
		createLi: createLi,
		orderList: orderList,
		toggleComplete: function(id){
			toggleComplete(id);
			syncLocalStorage();
		},
		toggleViewCompleteCheckedElements: toggleViewCompleteCheckedElements
	}
};

document.addEventListener('DOMContentLoaded', function(){
	var myApp = TodoList();  
	let doc = document; 
	let todolist = doc.querySelector('#todolist');
	let showCompletedBtn = doc.querySelector('#showCompletedBtn');

	showCompletedBtn.addEventListener('click', function(e){    
		myApp.toggleViewComplete();
		e.target.innerHTML = myApp.getShowCompleted() ? 'Hide Completed' : 'Show Completed'; 
		myApp.toggleViewCompleteCheckedElements(todolist.getElementsByClassName('checked'));
	});

	todolist.addEventListener('click', function(e){
		let ele = e.target;
		if(ele.id != 'addElementLi' && ele.nodeName.toLowerCase() === 'li' && e.offsetX > 5 && e.offsetX < 18){
			myApp.toggleComplete(ele.id);
			
			ele.classList.toggle('checked');
			if(!myApp.getShowCompleted()){
				ele.classList.add('hidden');
			}
			console.log(myApp.getTodos());
		}
		//console.dir(e);
	});

	let todoInput = doc.querySelector('#todo');
	todoInput.addEventListener('keypress', function(e){
		if(e.keyCode === 13 && e.target.value && e.target.value.length>=3){
			let todo = e.target.value;
			myApp.addTodo(todo); 
			e.target.value = "";
			let li = myApp.createLi({name:todo, completed:false}); 
			todolist.insertBefore(li, todolist.firstElementChild.nextElementSibling); 
			myApp.orderList(todolist);
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
	if(todos && todos.length > 0){ 
		todos.forEach(function(todo, index){ 
			todolist.appendChild(myApp.createLi(todo, id=index));
		});

		// myApp.toggleViewCompleteCheckedElements(todolist.getElementsByClassName('checked'));

		// showCompletedBtn.innerHTML = myApp.getShowCompleted() ? 'Hide Completed' : 'Show Completed';  
	} 
});

