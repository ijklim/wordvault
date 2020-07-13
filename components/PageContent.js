/**
 * Component: SearchBox
 */

// Starting eventKey for WordAccordionItem
// Note: eventKey 0 seems to be causing problem since late May 2020
const firstEventKeyOfWordAccordionItems = 1;

class SearchBox extends React.Component {
  handleChange() {
    // console.log('SearchBox::handleChange(): ' + this.refs.inputSearchWord.value);
    this.props.handleChange(this.refs.inputSearchWord.value);
  }

  render() {
    return (
      <ReactBootstrap.InputGroup>
        <ReactBootstrap.FormControl
          autoFocus="true"
          placeholder="Enter search word"
          onChange={() => this.handleChange()}
          onKeyPress={this.props.handleKeyPress}
          ref="inputSearchWord"
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
 * Functional component: WordAccordionItem
 *
 * Is a bootstrap Accordion component with a word and it's definitions
 *
 * @param {object} props
 */
function WordAccordionItem(props) {
  if (!props.definitions.length) {
    // props.definitions is an empty array
    return null;
  }

  const wordDefinitionListItems = props.definitions.map((definition, index) => {
    return (
      <ReactBootstrap.ListGroup.Item key={index}>
        {definition}
      </ReactBootstrap.ListGroup.Item>
    );
  });

  return (
    <React.Fragment>
      <ReactBootstrap.Card>
        <ReactBootstrap.Accordion.Toggle eventKey={props.eventKey} className="text-left text-light btn-dark btn btn-lg">
          Definition of "{props.word}"
        </ReactBootstrap.Accordion.Toggle>
      </ReactBootstrap.Card>

      <ReactBootstrap.Accordion.Collapse
        eventKey={props.eventKey}
      >
        <ReactBootstrap.ListGroup>
          {wordDefinitionListItems}
        </ReactBootstrap.ListGroup>
      </ReactBootstrap.Accordion.Collapse>
    </React.Fragment>
  );
}

/**
 * Component: PageContent
 */
class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyOfActiveWordAccordionItem: firstEventKeyOfWordAccordionItems,     // Controls which word is expanded
      inputSearchWord: '',              // Directly tracks the search input field
      searchedAndWordNotFound: false,   // Whether a search has been performed and the search word is invalid
      wordSearched: '',
      wordsHistory: [],
    };
  }

  /**
   * If word has been searched before, move it to the top of wordsHistory
   */
  moveDuplicateToTheTop() {
    const inputSearchWord = this.state.inputSearchWord;
    const wordsHistoryWithoutSearchWord = this.state.wordsHistory.filter((word) => {
      return inputSearchWord != word.word;
    });

    if (wordsHistoryWithoutSearchWord.length == this.state.wordsHistory.length) {
      // Word is not in history
      return false;
    }

    const wordInArray = this.state.wordsHistory.filter((word) => {
      return inputSearchWord == word.word;
    });
    this.setState({
      wordsHistory: [
        ...wordsHistoryWithoutSearchWord,
        ...wordInArray,
      ],
    });
    return true;
  }

  /**
   * Call api to find definition of this.state.inputSearchWord
   * Add definition(s) to array this.state.wordsHistory if word is found
   */
  getInputSearchWordDefinition() {
    if (this.moveDuplicateToTheTop()) {
      return;
    }

    // Reset to defaults and wordSearched to the word being search (regardless of whether the word is valid)
    this.setState({
      searchedAndWordNotFound: false,
      wordSearched: this.state.inputSearchWord,
    });

    // Toast message to indicate search is in progress
    RTM.setMessage(`Searching for word '${this.state.inputSearchWord}'...`);

    const url = `https://api.ivan-lim.com/?a=dictionary&word=${this.state.inputSearchWord}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        const wordDefinitions = json.reduce((wordDefinitions, {shortdef}) => {
          // shortdef has content, word is found
          if (shortdef) return wordDefinitions.concat(shortdef);

          return wordDefinitions;
        }, []);

        const wordFound = (wordDefinitions.length > 0);

        if (wordFound) {
          // Only add to wordsHistory array if word is found (i.e. valid)
          const wordsHistory = [
            ...this.state.wordsHistory,
            {
              definitions: wordDefinitions,
              word: this.state.inputSearchWord,
            },
          ];

          // Set array to blank first to force React to rerender the accordion to ensure the word is expanded
          this.setState({
            wordsHistory: [],
          });

          this.setState({
            wordsHistory,
          });
        }

        // Definitions found
        this.setState({
          searchedAndWordNotFound: !wordFound,
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
  handleChange(inputSearchWord) {
    this.setState({
      inputSearchWord,
    });
  }

  /**
   * [Search] button is clicked
   */
  handleClickSearch() {
    this.getInputSearchWordDefinition();
  }

  /**
   * Handle keypress event in search input field, perform search if ENTER key(13) is pressed
   */
  handleKeyPress(target) {
    if (target.charCode == 13) {
      // Find defitions of the search word
      this.getInputSearchWordDefinition();

      // Highlight text again for easy next input
      target.currentTarget.select();
    }
  }

  render() {
    // An alert div to show error message
    let elementAlertMessage = null;
    if (this.state.searchedAndWordNotFound) {
      // Invalid search word error message
      elementAlertMessage = (
        <ReactBootstrap.Alert variant="danger">
          "{this.state.wordSearched}" is not a valid word!
        </ReactBootstrap.Alert>
      );
    }

    // An array of Bootstrap Cards, each one contains a word and it's definitions
    let elementAllWordsSearched = null;
    if (this.state.wordsHistory.length) {
      const wordAccordionItems = this.state.wordsHistory.slice().reverse().map((word, index) => {
        return (
          <WordAccordionItem
            definitions={word.definitions}
            eventKey={index + firstEventKeyOfWordAccordionItems}
            key={word.word}
            word={word.word}
          />
        );
      });

      elementAllWordsSearched = (
        <ReactBootstrap.Accordion
          className="text-left mt-3"
          defaultActiveKey={this.state.keyOfActiveWordAccordionItem}
          ref="wordAccordion"
        >
          {wordAccordionItems}
        </ReactBootstrap.Accordion>
      );

    }

    // Note: The negative value in minHeight is the height space occupied by header, footer, margins etc.
    return (
      <ReactBootstrap.Container
        className="mt-5"
        style={{minHeight: 'calc(100vh - 183px)'}}
      >
        <ReactBootstrap.Row>
          <ReactBootstrap.Col />
          <ReactBootstrap.Col sm={10} lg={8} className="text-center">
            {elementAlertMessage}
            <SearchBox
              handleChange={(searchWord) => this.handleChange(searchWord)}
              handleClickSearch={() => this.handleClickSearch()}
              handleKeyPress={(target) => this.handleKeyPress(target)}
            />
            {elementAllWordsSearched}
          </ReactBootstrap.Col>
          <ReactBootstrap.Col />
        </ReactBootstrap.Row>
      </ReactBootstrap.Container>
    );
  }
}