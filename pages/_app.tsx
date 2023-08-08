import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { allReducers } from '../components/reducers/reducer'
import { createStore } from 'redux'


const store = createStore(allReducers)

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
        <Component {...pageProps}/>
    </Provider>
  )

}

export default MyApp
