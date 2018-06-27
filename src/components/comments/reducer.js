import * as actionTypes from './actionTypes';

export default function handelComment(comments = {comment: {}, reply: {}}, action) {
	switch (action.type) {
		case actionTypes.COMMENT:
			const newData = processComment(comments, action);
			return {
				...comments,
				comment: {
					...comments.comment = newData.comment
				},
				reply: {
					...comments.reply = newData.reply
				}
			}
		case actionTypes.REPLY:
			const addReply = processReply(comments, action);
			return {
				...comments,
				comment: {
					...comments.comment
				},
				reply: {
					...comments.reply = addReply.reply
				}
			}
		case actionTypes.SAVE:
			saveComment(action.data);
			return comments;
		case actionTypes.IMPORT_COMMENTS:
			return {
				...comments,
				comment: {
					...comments.comment = action.data.comment
				},
				reply: {
					...comments.reply = action.data.reply
				}
			}
		default: return comments;
	}
}

function processComment(comments, action) {
	let commentsUpdate = comments.comment;
	let commentId = 1;
	if (commentsUpdate[action.videoId]) {
		commentId = commentsUpdate[action.videoId].length + 1;
	} else {
		commentsUpdate[action.videoId] = [];
	}
	action.value['id'] = commentId;
	commentsUpdate[action.videoId].push(action.value);
	comments['comment'] = commentsUpdate;
	let createReplies = comments.reply;
	if (!createReplies[action.videoId]) createReplies[action.videoId] = {};
	createReplies[action.videoId][commentId] = [];
	comments['reply'] = createReplies;
	return comments;
}

function processReply(comments, action) {
	let replies = comments.reply;
	let data = {};
	if (!replies[action.videoId]) replies[action.videoId] = {};
	if (!replies[action.videoId][action.commentId]) replies[action.videoId][action.commentId] = [];
	replies[action.videoId][action.commentId].push(action.value);
	data['reply'] = replies;
	return data;
}

function saveComment(comment) {
	fetch('/data/post/comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(comment)
	})
	.then(response => response.json())
	.then(
		(data) => {},
		(error) => {}
	);
}
