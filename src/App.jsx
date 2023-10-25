import './App.css'
import Footer from './components/Footer'
import MyForm from './components/MyForm'

function App() {
    return (
        <>
            <div className='block'>
                <div className='block__column'>
                    <div>
                        <h1>
                            Learn to code by <br /> watching others
                        </h1>

                        <p>
                            See how experienced developers solve problems in real-time. Watching scripted tutorials is
                            great, but understanding how developers think is invaluable.
                        </p>
                    </div>
                </div>

                <div className='block__column'>
                    <h2 className='block__banner'>
                        <span className='bold'>Try it free 7 days</span> then $20/mo. thereafter
                    </h2>
                    <MyForm />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default App
