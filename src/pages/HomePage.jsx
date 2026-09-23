import lab from '../data/lab.json'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Facilities from '../sections/Facilities'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import Recognition from '../sections/Recognition'
import Research from '../sections/Research'
import Team from '../sections/Team'
import Vision from '../sections/Vision'
import Workflow from '../sections/Workflow'

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={lab.keywords} label="Research keywords" />
      <About />
      <Vision />
      <Research />
      <Team />
      <Facilities />
      <Workflow />
      <Recognition />
      <Contact />
    </>
  )
}

export default HomePage
