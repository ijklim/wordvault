import PageHeader from './components/PageHeader';
import PageContent from './components/PageContent';
import PageFooter from './components/PageFooter';
import { ToastProvider } from './context/ToastContext';

function App() {
  const appName = "Word Vault";
  const appVersion = "1.0.22";

  return (
    <ToastProvider>
      <PageHeader appName={appName} />
      <PageContent />
      <PageFooter appName={appName} appVersion={appVersion} />
    </ToastProvider>
  )
}

export default App
