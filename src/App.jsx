import { PortfolioProvider } from './context/PortfolioContext';
import Builder from './pages/Builder';
import PublicPortfolio from './pages/PublicPortfolio';

function App() {
  const pathname = window.location.pathname;

  let content;
  if (pathname.startsWith('/p/')) {
    const slug = pathname.split('/p/')[1];
    content = slug ? <PublicPortfolio slug={slug} /> : <Builder />;
  } else {
    content = <Builder />;
  }

  return (
    <PortfolioProvider>
      {content}
    </PortfolioProvider>
  );
}

export default App;
