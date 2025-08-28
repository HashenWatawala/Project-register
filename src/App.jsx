import React from 'react';
import Header from './components/Navbar';
import TriangleBackgroundView from './components/Home';
import About from './components/About';
import PdfUploader from './components/PDFuploader';
import ContactPage from './components/ContactPage';
import Footer2 from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />

      <section id="home">
        <TriangleBackgroundView />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="upload">
        <PdfUploader />
      </section>

      <section id="contact">
        <ContactPage />
      </section>

      <Footer2 />
    </div>
  );
};

export default App;
