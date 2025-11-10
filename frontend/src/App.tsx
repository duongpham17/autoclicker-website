import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import Navbar from './layouts/navbar';
import Footer from './layouts/footer';
import Global from './global';
import Pages from './pages';

console.log(process.env.NODE_ENV);

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Global />
      <Navbar />
      <Pages />
      <Footer />
    </BrowserRouter>
  </Provider>
);

export default App;