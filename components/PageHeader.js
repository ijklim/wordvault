function PageHeader(props) {
  return (
    <ReactBootstrap.Navbar className="shadow" bg="warning">
      <ReactBootstrap.Navbar.Brand
        href="/"
        className="text-left"
        style={{lineHeight:'1.2em'}}
      >
        {props.appName}
      </ReactBootstrap.Navbar.Brand>
    </ReactBootstrap.Navbar>
  );
}
