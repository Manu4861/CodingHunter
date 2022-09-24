import Header from '../components/Header'
import '../styles/globals.css'
import { Provider } from "react-redux"
import { store } from '../store'
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from 'react'
import { auth } from '../config'
import { AuthActions } from '../store/auth.slice'
import Loader from '../components/Loader'

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      store.dispatch(AuthActions.setUser(typeof user?.uid == "undefined" ? null : user.uid))
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <Provider store={store}>
      {
        isLoading ? (
          <div className='flex justify-center items-center h-[100vh] w-full'>
            <Loader />
          </div>
        ) : (
          <div>
            <Header />
            <div className='px-5 sm:px-20 lg:px-80'>
              <Component {...pageProps} />
            </div>
          </div>
        )
      }

    </Provider>
  )
}

export default MyApp
