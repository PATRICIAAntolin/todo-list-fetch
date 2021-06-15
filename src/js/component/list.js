import React, { useState } from "react";
import PropTypes from "prop-types";

export function Todo(props) {
	const [showButton, setShowButton] = useState(false);

	return (
		<>
			{props.todo.label !== "sample task" && (
				<div
					className="listBody"
					onMouseEnter={() => setShowButton(true)}
					onMouseLeave={() => setShowButton(false)}>
					<p>{props.todo.label}</p>
					{showButton ? (
						<span onClick={() => props.deleteTodo(props.todo.id)}>
							X
						</span>
					) : null}
				</div>
			)}
		</>
	);
}
Todo.propTypes = {
	todo: PropTypes.shape({
		label: PropTypes.string,
		id: PropTypes.number
	}),
	deleteTodo: PropTypes.func
};
