import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore} from 'redux'
import reducers from './reducers'



export default createStore(reducers, composeWithDevTools())