import React, { useEffect, useState } from "react";
import "./HomeStyles.css";


const Home = () => {
	const [task, setTask] = useState("")
	const [tasks, setTasks] = useState([])
	const [user, setUser] = useState ("") //variable que recibe el nombre del usuario
	
	

	


	const API_URL= "https://playground.4geeks.com/todo"


	const getUser = async () => {
		const response = await fetch (`${API_URL}/users/${user}`,)
		console.log(response);
		
		if (!response.ok){
			console.log("USUARIO NO ENCONTRADO")
			alert('Usuario no encontrado, cree uno');

			return 
		}

		const data = await response.json()
		console.log(data);
		setTasks(data.todos)
		
	}
//le pide a la api que cree un usuario. si la respuesta es positiva, ejecuta getUser para traer sus tareas
	const createUser = async () => {
		const response = await fetch (`${API_URL}/users/${user}`,{
			method: "POST"
		})
		const data = await response.json()
		if (response.ok){
			alert('Usuario Creado, escriba sus tareas');
			getUser();			
		}
	}

	const createTask = async () => {
		const response = await fetch (`${API_URL}/todos/${user}`,{
			method: "POST",
			body: JSON.stringify({
				label: task,
				is_done: false
			}),
			headers: {
				"content-Type": "application/json"
			}
		})
		if (response.ok) {
			getUser()
		}
		
	}

	const deteteTaskFetch = async (id) => {
		const response = await fetch (`${API_URL}/todos/${id}`,{
			method: "DELETE"
		})
		if (response.ok){
			getUser()
		}
		
	}


	useEffect(() => {
		if(user){ //ejecuta get user su user SI existe user etc.
			getUser()
		}

	}, [])


	
	const handleClick = (e) => {
		e.preventDefault();
		if (task.trim() === '') {
			alert('Please enter a valid task.');
			return;
		}
		createTask()
		setTask('')
	}

//handle para el campus de searchUser. y ejecuta el getUser(getUser ya tiene la condicion de sino existe Crear usuario.)
	const handleSearchUser = (e) => {
		e.preventDefault();
		if (user.trim() === '') {
			alert('Please enter your user.');
			return;
		}

		getUser();
	};
//handl para el boton de crear usuario (create user tambien trae laas tareas de ese usuario porque ejecuta getUser)
	const handleCreateUser = (e) => {
		e.preventDefault();
		if (user.trim() === '') {
			alert('Please put your name');
			return;
		}
		createUser();

	};

	return (
		<div>
			<h1 className="Title">ToDo List</h1>
			<div className="d-flex justify-content-center">
				<form>
					<input
					type="text"
					value={user}
					onChange={(e) => setUser(e.target.value)}
					name="userName"
					placeholder="user name">
					</input>

					<button className="accept" onClick={handleSearchUser}>search user </button>

					<button className="createUser" onClick={handleCreateUser}>create user</button>
				</form>

			</div>

				<div className="d-flex justify-content-center">

					<form onSubmit={handleClick}>

						<input
							type="text"
							value={task}
							onChange={(e) => setTask(e.target.value)}
							name="task"
							placeholder="Enter your task here">
						</input>

						<button className="addButton" onClick={handleClick}> add</button>

					</form>

				</div>


			<div className="card">
				<ul>
					{
						tasks.map((task, index) =>
							<li key={task.id}> {task.label} <button className="deleteButton" onClick={() => deteteTaskFetch(task.id)}>X</button></li>)
					}
				</ul>
			</div>

		</div>
	);
};

export default Home;