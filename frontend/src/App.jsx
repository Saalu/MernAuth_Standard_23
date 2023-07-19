import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
// import HomeScreen from "./screens/HomeScreen";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      {/* <HomeScreen /> */}

      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
