import { useState } from 'react'
import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PrivacyDialog } from './components/PrivacyDialog'
import { ValueProposition } from './components/ValueProposition'

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Capabilities />
        <ValueProposition />
        <Contact />
      </main>
      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyDialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  )
}
