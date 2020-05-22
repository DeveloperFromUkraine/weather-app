import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import createRootReducer from "../root-reducer/rootReducer";

const initialState = {};

export default function configureStore() {
	const enhancers = [];
	if(process.env.NODE_ENV === "development") {
		const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

		if (typeof devToolsExtension === "function") {
			enhancers.push(devToolsExtension());
		}
	}
	const composeEnhancers = compose(
		applyMiddleware(thunk),
		...enhancers
	);

	return createStore(
		createRootReducer(),
		initialState,
		composeEnhancers,
	);
}
