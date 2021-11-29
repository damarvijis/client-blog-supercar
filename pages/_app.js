import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { wrapper } from "../store/index"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
// export default MyApp;
export default wrapper.withRedux(MyApp)
