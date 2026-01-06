import { Container, Row, Col } from 'react-bootstrap';

interface PageFooterProps {
    appName: string;
    appVersion: string;
}

const PageFooter = ({ appName, appVersion }: PageFooterProps) => {
  return (
    <Container fluid className="text-right mt-5 py-1 border-top">
      <Row>
        <Col>
          <small>{appName} v.{appVersion}. Proudly brought to you by <a href="https://ivan-lim.com" target="_blank">Ivan Lim</a></small>
        </Col>
      </Row>
    </Container>
  );
}

export default PageFooter;
