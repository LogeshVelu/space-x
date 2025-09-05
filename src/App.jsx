import Header from './components/Header';
import Launches from './components/Launches';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom'

const client = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <Header />
        <Launches />
      </QueryClientProvider>
    </>
  )
}

export default App
