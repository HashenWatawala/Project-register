import React from 'react'
import Header3 from './components/Navbar'
import TriangleBackgroundView from './components/Home'
import Header from './components/Navbar'
import About from './components/About'
import PdfUploader from './components/PDFuploader'


const App = () => {
  return (
    <div>
      <Header/>
      <div> <TriangleBackgroundView/></div>
     <div><About/></div>
     <div><PdfUploader/></div>
    </div>
  )
}

export default App
