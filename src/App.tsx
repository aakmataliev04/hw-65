import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {Route, Routes} from 'react-router-dom';
import Page from './containers/Page/Page';
import Admin from './containers/Admin/Admin';

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={'/'} element={<Admin />}></Route>
          <Route path={'/pages/admin'} element={<Admin />}></Route>
          <Route path={'/pages/:pageName'} element={<Page />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
