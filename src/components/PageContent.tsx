import { useState, KeyboardEvent } from 'react';
import { Container, Row, Col, Alert, Accordion } from 'react-bootstrap';
import SearchBox from './SearchBox';
import WordAccordionItem from './WordAccordionItem';
import { useToast } from '../context/ToastContext';

// Starting eventKey for WordAccordionItem
const firstEventKeyOfWordAccordionItems = 1;

interface WordHistoryItem {
    definitions: string[];
    word: string;
}

const PageContent = () => {
    const [keyOfActiveWordAccordionItem] = useState(firstEventKeyOfWordAccordionItems.toString());
    const [inputSearchWord, setInputSearchWord] = useState('');
    const [searchedAndWordNotFound, setSearchedAndWordNotFound] = useState(false);
    const [wordSearched, setWordSearched] = useState('');
    const [wordsHistory, setWordsHistory] = useState<WordHistoryItem[]>([]);
    const { setMessage } = useToast();

    const moveDuplicateToTheTop = () => {
        const wordsHistoryWithoutSearchWord = wordsHistory.filter((word) => {
            return inputSearchWord !== word.word;
        });

        if (wordsHistoryWithoutSearchWord.length === wordsHistory.length) {
            // Word is not in history
            return false;
        }

        const wordInArray = wordsHistory.filter((word) => {
            return inputSearchWord === word.word;
        });

        setWordsHistory([
            ...wordsHistoryWithoutSearchWord,
            ...wordInArray,
        ]);
        return true;
    };

    const getInputSearchWordDefinition = () => {
        if (moveDuplicateToTheTop()) {
            return;
        }

        // Reset to defaults and wordSearched to the word being search
        setSearchedAndWordNotFound(false);
        setWordSearched(inputSearchWord);

        setMessage(`Searching for word '${inputSearchWord}'...`);

        const url = `${import.meta.env.VITE_API_URL}/?a=dictionary&word=${inputSearchWord}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const wordDefinitions = json.reduce((acc: string[], curr: any) => {
                    if (curr.shortdef) return acc.concat(curr.shortdef);
                    return acc;
                }, []);

                const wordFound = (wordDefinitions.length > 0);

                if (wordFound) {
                    const newHistory = [
                        ...wordsHistory,
                        {
                            definitions: wordDefinitions,
                            word: inputSearchWord,
                        },
                    ];
                    setWordsHistory(newHistory);
                }

                setSearchedAndWordNotFound(!wordFound);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setMessage('');
            });
    };

    const handleClickSearch = () => {
        getInputSearchWordDefinition();
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            getInputSearchWordDefinition();
            // Highlight text again for easy next input
            (e.currentTarget as HTMLInputElement).select();
        }
    };

    // An alert div to show error message
    let elementAlertMessage = null;
    if (searchedAndWordNotFound) {
        elementAlertMessage = (
            <Alert variant="danger">
                "{wordSearched}" is not a valid word!
            </Alert>
        );
    }

    // An array of Bootstrap Cards
    let elementAllWordsSearched = null;
    if (wordsHistory.length) {
        const wordAccordionItems = wordsHistory.slice().reverse().map((word, index) => {
            return (
                <WordAccordionItem
                    definitions={word.definitions}
                    eventKey={(index + firstEventKeyOfWordAccordionItems).toString()}
                    key={word.word}
                    word={word.word}
                />
            );
        });

        elementAllWordsSearched = (
            <Accordion
                className="text-left mt-3"
                defaultActiveKey={keyOfActiveWordAccordionItem}
            >
                {wordAccordionItems}
            </Accordion>
        );
    }

    return (
        <Container
            className="mt-5 flex-grow-1"
        >
            <Row>
                <Col />
                <Col sm={10} lg={8} className="text-center">
                    {elementAlertMessage}
                    <SearchBox
                        handleChange={setInputSearchWord}
                        handleClickSearch={handleClickSearch}
                        handleKeyPress={handleKeyPress}
                    />
                    {elementAllWordsSearched}
                </Col>
                <Col />
            </Row>
        </Container>
    );
};

export default PageContent;
