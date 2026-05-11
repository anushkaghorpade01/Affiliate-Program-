import { FAQPage } from '@/components/faq/FAQPage'
import { LandingPage } from '@/components/landing/LandingPage'

function App() {
  const path = window.location.pathname.replace(/\/$/, '')

  if (path === '/faq') {
    return <FAQPage />
  }

  return <LandingPage />
}

export default App
