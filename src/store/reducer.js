import { produce } from "immer";
import { initialState } from "./index";

export const reducer = (state, { type, payload }) => {
	switch (type) {
		case "SET_STATE":
			return produce(state, (draft) => {
				Object.assign(draft, payload);
			});
		case "SET_USER":
			return produce(state, (draft) => {
				draft.user = payload ? Object.assign(draft.user || {}, payload) : null;
			});
		case "SET_IS_AUTHENTICATED":
			return produce(state, (draft) => {
				draft.isAuthenticated = payload;
			});
		case "RESET":
			return initialState
		default:
			return state;
	}
};
