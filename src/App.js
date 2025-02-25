import { Container, Grid } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Portfolio from "./pages/Portfolio/Portfolio";
import Resume from "./pages/Resume/Resume";
import Contact from "./pages/Contact/Contact";
import { Navbar } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container className="container_margin">
        <Grid container gap={6}>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Navbar sticky="top">
              <Profile />
            </Navbar>
          </Grid>
          <Grid item xs>
            <Header />
            <div className="main-content container_shadow">
              <Routes>
                <Route path="/" element={<Resume />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
