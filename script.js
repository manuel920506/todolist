var TodoList = function(){
	let doc = document;
	let todos = [];
	let showCompleted = false;
 
	let hasLocalStorage = function(){
		return 'localStorage' in window
	};
	if(hasLocalStorage){
		showCompleted = JSON.parse(localStorage.getItem('showCompleted')); 
		doc.querySelector('#showCompletedBtn').innerHTML = showCompleted ? 'Hide Completed' : 'Show Completed'; 
	};
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
	let toggleComplete = function(id, async = false){
		todos[id].completed = !todos[id].completed;
		if(async){
			syncLocalStorage();
		}
	};
	let syncLocalStorage = function(id){
		localStorage.setItem('todos', JSON.stringify(todos));
	}; 
	let toggleViewCompleteCheckedElements = function(checkedElements){ 
		for(let i=0; checkedElements[i]; i++){
			//checkedElements[i].style.display = 'inline-block';
			checkedElements[i].classList.toggle('hidden');
		} 
	};

	let showTodos = function(todolist){ 
		let todos = getTodos(); 
		if(todos && todos.length > 0){ 
			todos.forEach(function(todo, index){ 
				todolist.appendChild(createLi(todo, id=index));
			});
		}  
	};

	let toggleViewComplete = function(){ 
		showCompleted = !showCompleted;
		if(hasLocalStorage()){
			localStorage.setItem('showCompleted', showCompleted);
		} 
	};

	let removeTodo = function(){ 
		todos.splice(id, 1);
		syncLocalStorage();
	};

	let getTodos = function(){ 
		if(todos.length){
			return todos;
		}
		if(hasLocalStorage() && localStorage.getItem('todos')){
			todos = JSON.parse(localStorage.getItem('todos'));
			return todos;
		} 
	};

	let addTodo = function(todo){ 
		todos.unshift({name: todo, completed: false});
		syncLocalStorage();
	};

	let initListener = function(myApp){
		let doc = document; 
		let todolist = doc.querySelector('#todolist');
		let showCompletedBtn = doc.querySelector('#showCompletedBtn');
	
		showCompletedBtn.addEventListener('click', function(e){    
			myApp.toggleViewComplete();
			e.target.innerHTML = showCompleted ? 'Hide Completed' : 'Show Completed'; 
			myApp.toggleViewCompleteCheckedElements(todolist.getElementsByClassName('checked'));
		});
	
		todolist.addEventListener('click', function(e){
			let ele = e.target;
			if(ele.id != 'addElementLi' && ele.nodeName.toLowerCase() === 'li'){  
				let offset = ele.clientWidth - e.offsetX; 
				if(offset <= 14 && offset >= 7 && e.offsetY >= 8 && e.offsetY <= 18){
					ele.parentNode.removeChild(ele);
					myApp.removeTodo(ele.id);
				}else if(e.offsetX > 5 && e.offsetX < 18 && e.offsetY >= 5 && e.offsetY <= 18){
					myApp.toggleComplete(ele.id, true);
				
					ele.classList.toggle('checked');
					if(!showCompleted){
						ele.classList.add('hidden');
					} 
				} 
			} 
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
		});  

		showTodos(todolist)
	};
 
	return {
		init: initListener,
		removeTodo: removeTodo,
		toggleViewComplete: toggleViewComplete, 
		getTodos: getTodos,
		addTodo: addTodo,
		createLi: createLi,
		showTodos: showTodos,
		orderList: orderList,
		toggleComplete: toggleComplete,
		toggleViewCompleteCheckedElements: toggleViewCompleteCheckedElements
	} 
};

document.addEventListener('DOMContentLoaded', function(){
	let myApp = TodoList();  
	myApp.init(myApp); 
});

/*
let elementi = todos.map(function(todo){
	return '<li>'+todo+'</li>';

}); 
todolist.innerHTML = elementi;

	// myApp.toggleViewCompleteCheckedElements(todolist.getElementsByClassName('checked'));

	// showCompletedBtn.innerHTML = myApp.getShowCompleted() ? 'Hide Completed' : 'Show Completed';  
*/

