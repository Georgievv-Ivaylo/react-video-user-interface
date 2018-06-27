import * as actionTypes from './actionTypes';

export default function videoData(videoData = {videos: [], video: {}}, action) {
	switch (action.type) {
		case actionTypes.ADD:
			videoData.videos.push(action.value);
			videoData.video = action.value;
			return videoData;
		case actionTypes.IMPORT_VIDEOS:
			return {
				...videoData,
				video: {
					...videoData.video
				},
				videos: action.value
			};
		case actionTypes.VALIDATE_VIDEO:
			const newVideo = isVideo(videoData, action.value);
			return {
				...videoData,
				video: {
					...videoData.video = newVideo.video
				},
				videos: newVideo.video.embed ? [...videoData.videos = newVideo.videos] : videoData.videos
			};
		case actionTypes.CLEAR_VIDEO:
			return {
				video: {},
				videos: videoData.videos
			};
		default: return videoData;
	}
}

function isVideo (videoData, data) {
	
	if (data.success) {
		videoData.video = data.video;
		videoData.video['embed'] = true;
		let isAddedVideo = [];
		
		if (videoData.videos.length >= 1) {
			isAddedVideo = videoData.videos.filter( function (video) {

				return video.id === data.video.id;
			});
		}
		if (isAddedVideo.length <= 0) {
			videoData.videos.push(data.video);

			fetch('/data/post/video', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data.video)
			})
			.then(response => response.json())
			.then(
				(data) => {},
				(error) => {}
			);
		}
		
		return videoData;
	};

	if (data.error) {
		videoData.video = {
			id: '',
			embed: false,
			error: 'The video can\'t start!',
			url: data.url,
			vlid: data.vlid
		};
		return videoData;
	}

	let videoID = '';
	let videoPlaylist = '';
	let getParams = {};
	
	if (data.url.indexOf('?') <= -0.01) {
		videoData.video = {
			id: '',
			embed: false,
			error: 'The link address is wrong!',
			url: data.url,
			vlid: data.vlid
		};
		return videoData;
	}
	const getParamsRaw = data.url.split('?')[1].split('&');
	let getParamsLength = getParamsRaw.length;
	while (--getParamsLength >= 0) {
		const getParam = getParamsRaw[getParamsLength].split('=');
		getParams[getParam[0]] = getParam[1];
	}

	if (getParams['v']) {
		videoID = getParams['v'];
		const pattern = /[a-zA-Z0-9_-]{11}/;
		if (!pattern.test(videoID)) return {id: '', embed: false, error: 'Invalid video address!', url: data.url};
	}
	if (getParams['list']) videoPlaylist = getParams['list'];

	videoData.video = {
		id: videoID,
		playlist: videoPlaylist,
		url: data.url,
		image: 'https://img.youtube.com/vi/'+ videoID +'/hqdefault.jpg',
		embed: false,
		vlid: data.vlid
	};
	return videoData;
}
