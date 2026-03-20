import { DemoProvider } from './state/DemoContext'
import LeftPanel from './components/layout/LeftPanel'
import RightPanel from './components/layout/RightPanel'
import PresenterOverlay from './components/layout/PresenterOverlay'

export default function App() {
  return (
    <DemoProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-950">
        <LeftPanel />
        <RightPanel />
        <PresenterOverlay />
      </div>
    </DemoProvider>
  )
}
