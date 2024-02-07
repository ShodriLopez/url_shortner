import MessageBanner from "./components/MessageBanner"
import ShareModal from "./components/ShareModal"
import Searcher from "./components/Searcher"

function App() {

  return (
    <>
      <MessageBanner></MessageBanner>
      <div className='flex flex-col w-full h-screen items-center justify-center'>
      <Searcher>
        SHORTEN YOUR LINK!
      </Searcher>
      </div>
      <ShareModal></ShareModal>
    </>
  )
}

export default App
