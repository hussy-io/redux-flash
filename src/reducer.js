import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable';
import * as actions from './actions'

const initialState = fromJS({
  messages: []
})

// Reducer
export const reducer = handleActions({
  [actions.FLASH_MESSAGE_ACTION_TYPE]: () => {
    throw new Error('redux-flash: missing middleware. Did you remember to add it when initializing your store?')
  },
  [actions._addMessage]: (state, { payload }) => {
    window.console.log('ADD MESSAGE');
    window.console.log(payload);
    window.console.log(state);
    return state.set('messages', state.get('messages').merge(payload))
  },
  [actions.removeMessage]: (state, { payload: id }) => {
    return state.set('messages', state.get('messages').filter(m => m.id !== id))
  },
  [actions.clearMessages]: (state) => {
    return state.set('messages', fromJS([]))
  },
}, initialState)

// Selectors
export const getFlashMessages = (state) => {
  if (!state.get('flash')) throw new Error('redux-flash: state not found. Did you remember to attach the reducer at key `flash`?')
  return state.getIn(['flash', 'messages'])
}

export const getSuccessMessages = (state) => getFlashMessages(state).filter(m => !m.isError)
export const getErrorMessages = (state) => getFlashMessages(state).filter(m => m.isError)
export const getLatestMessage = (state) => getFlashMessages(state).pop()
