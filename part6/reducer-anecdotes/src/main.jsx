import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotificationContext from './NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContext >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationContext> 
)