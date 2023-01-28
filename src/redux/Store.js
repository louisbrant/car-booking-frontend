/**
 * store and persistor create
 */
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import persistedReducer from './reducers/persistRedurcers'
import rootSaga from './reducers/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware)
const store = createStore(persistedReducer(rootReducer), middlewares)
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

export { store, persistor }