import {combineReducers} from "redux";
import weather from '../redux/reducers/weather';

export default function createRootReducer() {
	return combineReducers({
		weather
	});
}
