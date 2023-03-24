import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./pages/login"
import ProfileForm from "./pages/profile"
import RegisterForm from "./pages/register"

function App() {
  return (
    <Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
         CRUD Application with Laravel and React
        </Link>
        <Link to={"/login"} className="navbar-brand text-white">
         Login
        </Link>
        <Link to={"/register"} className="navbar-brand text-white">
         Register
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfileForm />} />
          </Routes>
        </Col>
      </Row>
    </Container>
    </Router>
  );
}

export default App;
