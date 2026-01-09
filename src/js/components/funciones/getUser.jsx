

export 	const getUser = async () => {
		const response = await fetch (`${API_URL}/users/${USER}`,)
		console.log(response);
		
		if (!response.ok){
			console.log("USUARIO NO ENCONTRADO")
			createUser()
			return getUser()
		}

		const data = await response.json()
		console.log(data);
		setTasks(data.todos)
		

	}