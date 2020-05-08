function PageFooter(props) {
  return (
    <ReactBootstrap.Container fluid className="text-right mt-5 py-1 border-top">
      <ReactBootstrap.Row>
        <ReactBootstrap.Col>
          <small>{props.appName} v.{props.appVersion}. Proudly brought to you by <a href="https://ivan-lim.com" target="_blank">Ivan Lim</a></small>
        </ReactBootstrap.Col>
      </ReactBootstrap.Row>
    </ReactBootstrap.Container>
  );
}
