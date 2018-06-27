import * as actionTypes from './actionTypes';

export function add(value) {
  return {
      type: actionTypes.ADD,
      value
  };
};

export const importVideos = (value) => ({
  type: actionTypes.IMPORT_VIDEOS,
  value
});

export function validateURL(value) {
  return {
      type: actionTypes.VALIDATE_VIDEO,
      value
  };
};

export function clearVideo() {
  return {
      type: actionTypes.CLEAR_VIDEO
  };
};
