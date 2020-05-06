/**
 * React Toast Message
 *
 * Version: 1.0.4
 * Date Modified: 5/6/20
 *
 * Requires react.js, react-dom.js, react-bootstrap.js
 *
 * Usage:
 * • To set a toast message: RTM.setMessage('...');
 * • To remove the toast message: RTM.setMessage()
 */
class ReactToastMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    }
  }

  render() {
    // No message to show
    const isVisible = (this.state.message.length > 0);
    // if (!this.state.message.length) return null;

    return (
      <ReactBootstrap.Toast
        show={isVisible}
        style={{position:'absolute', left:'10px', bottom:'10px', background:'#333', color:'white', width:'50%'}}
      >
        <ReactBootstrap.Toast.Body>
          {this.state.message}
        </ReactBootstrap.Toast.Body>
      </ReactBootstrap.Toast>
    );
  }
}

// An random id that is unique
const divId = 'root-toast-message-' + Math.random().toString().substr(-5);

// Dynamically add toast <div>
const toastDiv = document.createElement("div");
toastDiv.id = divId;
document.body.appendChild(toastDiv);

// Render the toast component on screen
const RTM = ReactDOM.render(
  <ReactToastMessage />,
  document.getElementById(divId)
);

RTM.setMessage = function (message = '') {
  return this.setState({
    message,
  });
};
