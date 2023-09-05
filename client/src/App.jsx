import { Route, Routes } from "react-router-dom";
import { Add_Info, Footer, Header, Home } from "./index";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Add_Info" element={<Add_Info/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
