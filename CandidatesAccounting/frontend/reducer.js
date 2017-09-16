import {Map} from 'immutable';

export default function reducer(state = Map(), action) {
switch (action.type) {
  case 'SET_STATE':
    return state.merge(action.state);

  case 'ADD_CANDIDATE':
    let lastId = state.get('candidates').last().id;
    let newCandidate = action.candidate;
    newCandidate.id = lastId + 1;
    return state.update('candidates', (candidates) => candidates.push(newCandidate));

  case 'DELETE_CANDIDATE':
    return state.update('candidates', (candidates) => candidates.filterNot((candidate) => candidate.id === action.id));

  case 'EDIT_CANDIDATE':
    return state = state.update('candidates', (candidates) => candidates.splice(candidates.indexOf(candidates.find(c =>
      c.id === action.id)),
      1,
      action.candidateNewState));

  case 'SET_CANDIDATE_EDIT_INFO':
    let candidateInfo = action.candidate;
    candidateInfo.status = action.candidate.constructor.name;
    return state.update('candidateEditInfo', (candidateEditInfo) => candidateInfo);

  case 'CHANGE_CANDIDATE_EDIT_INFO':
    let newCandidateEditInfo = state.get('candidateEditInfo');
    newCandidateEditInfo[action.key] = action.value;
    return state.update('candidateEditInfo', () => newCandidateEditInfo);

  case 'SET_CANDIDATE_EDIT_COMMENT':
    let candidateEditInfo = state.get('candidateEditInfo');
    if (action.index >= candidateEditInfo.comments.length) {
      candidateEditInfo.comments.push(action.comment);
    } else {
      candidateEditInfo.comments[action.index] = action.comment;
    }
    return state.update('candidateEditInfo', () => candidateEditInfo);
}
return state;
}