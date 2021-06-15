import React, { useEffect, useState } from "react";
import { Input } from "./input.js";
import { Todo } from "./list.js";

export function Home() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		updateList();
	}, []);

	const updateList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/patricia", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			params: "none"
		})
			.then(resp => resp.json())
			.then(json => setTodos(json))
			.catch(error => console.log(error));
	};

	const addTodo = tod => {
		setTodos([...todos, tod]);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/patricia", {
			method: "PUT",
			body: JSON.stringify([...todos, tod]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const deleteTodo = id => {
		const listFiltered = todos.filter(item => item.id !== id);
		setTodos(listFiltered);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/patricia", {
			method: "PUT",
			body: JSON.stringify(listFiltered),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const cleanAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/patricia", {
			method: "PUT",
			body: JSON.stringify([
				{
					label: "sample task",
					done: false,
					id: 1
				}
			]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
		location.reload();
	};

	return (
		<div className="container">
			<div className="appTitle">
				<p>todos</p>
			</div>
			<div className="todoListBody">
				<Input addTodo={addTodo} />
				{todos.length === 1 ? <p>No tasks, add a task</p> : null}
				{todos.map(todo => (
					<Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
				))}
				{todos.length > 1 && (
					<div className="todosLength">
						<p>{`${todos.length - 1} items left`}</p>
						<button onClick={cleanAll}>Clean all tasks</button>
					</div>
				)}
			</div>
		</div>
	);
}
