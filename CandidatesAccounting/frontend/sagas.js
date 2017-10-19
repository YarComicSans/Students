import { takeEvery, all, put, call} from 'redux-saga/effects';
import { addCandidate, deleteCandidate, editCandidate} from './candidateService.js';
import { addComment, deleteComment } from './commentService';

export default function* rootSaga() {
  yield all([
    watchCandidateAdd(),
    watchCandidateDelete(),
    watchCandidateEdit(),
    watchCommentAdd(),
    watchCommentDelete()
  ])
}

export function* watchCandidateAdd() {
  yield takeEvery('ADD_CANDIDATE', addCandidateSaga);
}

export function* watchCandidateDelete() {
  yield takeEvery('DELETE_CANDIDATE', deleteCandidateSaga);
}

export function* watchCandidateEdit() {
  yield takeEvery('EDIT_CANDIDATE', editCandidateSaga);
}

export function* watchCommentAdd() {
  yield takeEvery('ADD_COMMENT', addCommentSaga);
}

export function* watchCommentDelete() {
  yield takeEvery('DELETE_COMMENT', deleteCommentSaga);
}

export function* addCandidateSaga(action) {
  try {
    yield call(addCandidate, action.candidate);
    yield put({type: 'ADD_CANDIDATE_SUCCESS', candidate: action.candidate});
  }
  catch (error) {
    yield put({type: 'SET_ERROR_MESSAGE', message: error + '. Add candidate error. Please, refresh the page.'});
  }

   /* addCandidate(action.candidate) // TODO: addCandidate should cast a promise
    .then(() => {
      put({type: 'ADD_CANDIDATE_SUCCESS', candidate: action.candidate});
    })
    .catch((error) => {
      put({type: 'SERVICE_FAILURE', message: error + ' Add candidate server error'});
    })
    */
}

export function* deleteCandidateSaga(action) {
  try {
    yield call(deleteCandidate, action.id);
    yield put({type: 'DELETE_CANDIDATE_SUCCESS', id: action.id});
  }
  catch(error) {
    yield put({type: 'SET_ERROR_MESSAGE', message: error + '. Delete candidate error. Please, refresh the page.'});
  }
}

export function* editCandidateSaga(action) {
  try {
    yield call(editCandidate, action.id, action.candidateNewState);
    yield put({type: 'EDIT_CANDIDATE_SUCCESS', id: action.id, candidateNewState: action.candidateNewState});
  }
  catch(error) {
    put({type: 'SET_ERROR_MESSAGE', message: error + '. Edit candidate error. Please, refresh the page.'});
  }
}

export function* addCommentSaga(action) {
  try {
    yield call(addComment, action.candidateId, action.comment);
    yield put({type: 'ADD_COMMENT_SUCCESS', candidateId: action.candidateId, comment: action.comment});
  }
  catch(error) {
    yield put({type: 'SET_ERROR_MESSAGE', message: error + '. Add comment error. Please, refresh the page.'});
  }
}

export function* deleteCommentSaga(action) {
  try {
    yield call(deleteComment, action.candidateId, action.commentId);
    yield put({type: 'DELETE_COMMENT_SUCCESS', candidateId: action.candidateId, commentId: action.commentId});
  }
  catch(error) {
    yield put({type: 'SET_ERROR_MESSAGE', message: error + '. Delete comment error. Please, refresh the page.'});
  }
}