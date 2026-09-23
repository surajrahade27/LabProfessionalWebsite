import WhatsAppButton from './components/common/WhatsAppButton'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HomePage />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
