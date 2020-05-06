function PageHeader(props) {
  return (
    <ReactBootstrap.Navbar className="shadow" bg="warning">
      <ReactBootstrap.Navbar.Brand
        href="/"
        className="text-left"
        style={{lineHeight: '1.2em'}}
      >
        {props.appName}<br />
        <small>v.{props.appVersion}</small>
      </ReactBootstrap.Navbar.Brand>
    </ReactBootstrap.Navbar>
  );
}
