import { createStore, combineReducers } from 'redux';
import videoData from '../video/reducer';
import handelComment from '../comments/reducer';
import user from '../users/reducer';
import { saveState, loadState } from '../storage/local';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(combineReducers({
	videoData,
	handelComment,
	user
}), {
	videoData: {
		videos: [],
		video: { id: 'Embed URL...', embed: false },
	},
	handelComment: {
		comment: {},
		reply: {}
	},
	user: persistedState.user || {}
});

store.subscribe(throttle(() => {
	saveState({
		user: store.getState().user
	});
}), 1000);

export default store;
