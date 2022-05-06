const actionBase = "repair-notes ";

const defaultState = [
	{ id: 1, type: "Screen", cost: "$30" },
	{ id: 2, type: "Front camera", cost: "$40" },
	{ id: 3, type: "Main camera", cost: "$20" }
];

function save(state, note) {
	if (note.id === 0) {
		const newId = Math.max(0, ...state.map(n => n.id)) + 1;
		note.id = newId;
		return [...state, note];
	}
	const indexInState = state.findIndex(n => n.id === note.id);
	if (indexInState === -1) return [...state, note]; // just in case

	const newState = [...state];
	newState.splice(indexInState, 1, note);
	return newState;
}

export default (state = defaultState, action) => {
	if (!action.type.startsWith(actionBase)) return state;
	const actConcat = action.type.substring(actionBase.length);

	switch (actConcat) {
		case "save": return save(state, action.payload);
		case "remove": return state.filter(note => note.id !== action.payload);
		default: return state;
	}
};