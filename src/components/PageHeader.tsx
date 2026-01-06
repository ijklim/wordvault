import { Navbar } from 'react-bootstrap';

interface PageHeaderProps {
    appName: string;
}

const PageHeader = ({ appName }: PageHeaderProps) => {
  return (
    <Navbar className="shadow" bg="warning">
      <Navbar.Brand
        href="/"
        className="text-left"
        style={{lineHeight:'1.2em'}}
      >
        {appName}
      </Navbar.Brand>
    </Navbar>
  );
}

export default PageHeader;
