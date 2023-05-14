import Meals from './components/Meals';
import Favorites from './components/Favorites';
import Modal from './components/Modal';
import Search from './components/Search';
import './App.css';
import { useGlobalContext } from "./context"


function App() {
  const {showModal, favorites} = useGlobalContext();
  return (
    <main>
      <Search/>
      {console.log(favorites)}
      {favorites.length > 0 && <Favorites/>}
      <Meals/>
      {showModal && <Modal/>}
    </main>
  )
}

export default App;
