import { AppModeProvider, useAppMode } from './context/AppModeContext'
import AppRouter from './routes/AppRouter'
import TerminalInterface from './components/cli/TerminalInterface'

function AppContent() {
  const { mode } = useAppMode()

  return mode === 'cli' ? <TerminalInterface /> : <AppRouter />
}

function App() {
  return (
    <AppModeProvider>
      <AppContent />
    </AppModeProvider>
  )
}

export default App
