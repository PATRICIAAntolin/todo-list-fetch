import React, { useState } from "react";
import PropTypes from "prop-types";

export function Input(props) {
	const [note, setNote] = useState({
		label: "",
		done: "",
		id: ""
	});

	const handleChange = evt => {
		setNote({
			[evt.target.name]: evt.target.value,
			done: false,
			id: Math.floor(Math.random() * 10000)
		});
	};

	const label = note.label;

	const handleSubmit = async evt => {
		await evt.preventDefault();
		if (label === "") {
			return;
		}
		await props.addTodo(note);
		setNote({
			label: "",
			done: false,
			id: ""
		});
	};

	return (
		<form className="inputBody" onSubmit={handleSubmit}>
			<input
				type="text"
				name="label"
				value={label}
				onChange={handleChange}
			/>
		</form>
	);
}

Input.propTypes = {
	addTodo: PropTypes.func,
	setError: PropTypes.func
};
