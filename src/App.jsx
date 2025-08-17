import React from 'react'
import Header3 from './components/Navbar'
import TriangleBackgroundView from './components/Home'
import Header from './components/Navbar'
import About from './components/About'
import PdfUploader from './components/PDFuploader'
import ContactPage from './components/ContactPage'
import Footer2 from './components/Footer'


const App = () => {
  return (
    <div>
      <Header/>
      <div> <TriangleBackgroundView/></div>
     <div><About/></div>
     <div>
      <PdfUploader />
    </div>
    <div><ContactPage/></div>
    <Footer2/>
    </div>
  )
}

export default App
