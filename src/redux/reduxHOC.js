import { createStore } from "../redux/configureStore";
import { withRedux } from '../Hooks'

const [ store, persistor ] = createStore()

export const reduxConnnect = withRedux(store, persistor)