import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/ProductSection/Products";
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
  return (
    <>
      <Navbar />
      <Products />
      <ContactForm />
    </>
  );
}

export default App;
