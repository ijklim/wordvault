/**
 * Component: SearchBox
 */
class SearchBox extends React.Component {
  handleChange() {
    // console.log('SearchBox::handleChange(): ' + this.refs.searchWord.value);
    this.props.handleChange(this.refs.searchWord.value);
  }

  render() {
    return (
      <ReactBootstrap.InputGroup>
        <ReactBootstrap.FormControl
          placeholder="Enter search word"
          onChange={() => this.handleChange()}
          onKeyPress={this.props.handleKeyPress}
          ref="searchWord"
          type="text"
        />
        <ReactBootstrap.InputGroup.Append>
          <ReactBootstrap.Button
            variant="success"
            onClick={this.props.handleClickSearch}
          >
            Search
          </ReactBootstrap.Button>
        </ReactBootstrap.InputGroup.Append>
      </ReactBootstrap.InputGroup>

    );
  }
}

/**
 * Functional component: WordAccordion
 *
 * Is a bootstrap Accordion component with a word and it's definitions
 *
 * @param {object} props
 */
function WordAccordion(props) {
  if (!props.wordDefinitions.length) {
    // props.wordDefinitions is an empty array
    // props.wordNotFound true indicates word is not found
    if (props.wordNotFound) {
      return (
        <ReactBootstrap.Alert variant="danger" className="mt-3">
          "{props.wordSearched}" is not a valid word!
        </ReactBootstrap.Alert>
      );
    }

    // Search has not been performed yet
    return null;
  }

  const wordDefinitionListItems = props.wordDefinitions.map((definition, index) => {
    return (
      <ReactBootstrap.ListGroup.Item key={index}>
        {definition}
      </ReactBootstrap.ListGroup.Item>
    );
  });

  return (
    <ReactBootstrap.Accordion defaultActiveKey="0" className="text-left mt-3">
      <ReactBootstrap.Card>
        <ReactBootstrap.Accordion.Toggle as="a" eventKey="0" className="text-left text-light btn-dark btn btn-lg">
          Definition of "{props.wordSearched}"
        </ReactBootstrap.Accordion.Toggle>
      </ReactBootstrap.Card>

      <ReactBootstrap.Accordion.Collapse eventKey="0">
        <ReactBootstrap.ListGroup>
          {wordDefinitionListItems}
        </ReactBootstrap.ListGroup>
      </ReactBootstrap.Accordion.Collapse>
    </ReactBootstrap.Accordion>
  );
}

/**
 * Component: PageContent
 */
class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      wordDefinitions: [],
      wordNotFound: false,
      wordSearched: '',
      words: [],
    };
  }

  /**
   * Call api to find definition of searchWord
   *
   * @param {*} searchWord
   */
  getWordDefinition(searchWord) {
    // Reset to defaults
    this.setState({
      wordDefinitions: [],
      wordNotFound: false,
      wordSearched: this.state.searchWord,
    });

    // Toast message to indicate search is in progress
    RTM.setMessage(`Searching for word '${this.state.searchWord}'...`);

    const url = `https://api.ivan-lim.com/?a=dictionary&word=${searchWord}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // const wordDefinitions = [];
        const wordDefinitions = json.reduce((wordDefinitions, {shortdef}) => {
          // shortdef has content, word is found
          if (shortdef) return wordDefinitions.concat(shortdef);

          return wordDefinitions;
        }, []);

        const wordFound = (wordDefinitions.length > 0);

        if (wordFound) {
          // Add to words array
          const words = [
            ...this.state.words,
            {
              word: this.state.searchWord,
              definitions: wordDefinitions,
            },
          ];

          this.setState({
            words,
          });
        }

        // Definitions found
        this.setState({
          wordDefinitions,
          wordNotFound: !wordFound,
        });
      })
      .catch(error => {
        console.error (error);
      })
      .finally(() => {
        // Remove toast message
        RTM.setMessage();
      });
  }

  /**
   * Handle change event of input field
   *
   * @param {*} searchWord
   */
  handleChange(searchWord) {
    this.setState({
      searchWord,
    });
  }

  /**
   * [Search] button is clicked
   */
  handleClickSearch() {
    this.getWordDefinition(this.state.searchWord);
  }

  /**
   * Handle keypress event in search input field, perform search if ENTER key(13) is pressed
   */
  handleKeyPress(target) {
    if (target.charCode == 13) {
      // Find defitions of the search word
      this.getWordDefinition(this.state.searchWord);

      // Highlight text again for easy next input
      target.currentTarget.select();
    }
  }

  render() {
    return (
      <ReactBootstrap.Container className="mt-5">
        <ReactBootstrap.Row>
          <ReactBootstrap.Col />
          <ReactBootstrap.Col sm={10} md={8} lg={6} className="text-center p-3">
            <SearchBox
              handleChange={(searchWord) => this.handleChange(searchWord)}
              handleClickSearch={() => this.handleClickSearch()}
              handleKeyPress={(target) => this.handleKeyPress(target)}
            />
            <WordAccordion
              wordDefinitions={this.state.wordDefinitions}
              wordNotFound={this.state.wordNotFound}
              wordSearched={this.state.wordSearched}
            />
          </ReactBootstrap.Col>
          <ReactBootstrap.Col />
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    );
  }
}