import rootReducer from './reduce/change'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore(
    {
     reducer: rootReducer
    } ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;