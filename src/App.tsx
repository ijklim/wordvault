import PageHeader from './components/PageHeader';
import PageContent from './components/PageContent';
import PageFooter from './components/PageFooter';
import { ToastProvider } from './context/ToastContext';
import packageJson from '../package.json';

function App() {
  const appName = packageJson.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const appVersion = packageJson.version;

  return (
    <ToastProvider>
      <PageHeader appName={appName} />
      <PageContent />
      <PageFooter appName={appName} appVersion={appVersion} />
    </ToastProvider>
  )
}

export default App
