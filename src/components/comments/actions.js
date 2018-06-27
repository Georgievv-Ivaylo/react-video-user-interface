import * as actionTypes from './actionTypes';

export function comment(value) {
  return {
      type: actionTypes.COMMENT,
      videoId: value.videoId,
      value
  };
}

export function reply(value) {
  return {
      type: actionTypes.REPLY,
      videoId: value.videoId,
      commentId: value.parent,
      id: value.id,
      value
  };
}

export function save(value) {
  return {
    type: actionTypes.SAVE,
    data: value
  };
}

export function importComments(value) {
  return {
    type: actionTypes.IMPORT_COMMENTS,
    data: value
  };
}
