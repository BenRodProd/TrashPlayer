import "./css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App main_content">
      <header className="App-header">Trash Player</header>

      <Main />

      <Footer />
    </div>
  );
}

export default App;
