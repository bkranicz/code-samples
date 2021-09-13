import Hero from '../components/Hero'
import About from '../components/About'
import MarqueeComponent from '../components/MarqueeComponent'
import Methodology from '../components/Methodology'
import Showcase from '../components/Showcase'
import Reference from '../components/Reference'
import Process from '../components/Process'
import Contact from '../components/Contact'

function Home() {
    return (
        <>
            <Hero />
            <About />
            <Process/>
            <MarqueeComponent />
            <Methodology />
            <Showcase />
            <Reference />
            <Contact />
        </>
    )
}

export default Home;