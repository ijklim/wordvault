import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { ChangeEvent, KeyboardEvent } from 'react';

interface SearchBoxProps {
    handleChange: (value: string) => void;
    handleClickSearch: () => void;
    handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.handleChange(e.target.value);
  }

  return (
    <InputGroup>
      <FormControl
        autoFocus
        placeholder="Enter search word"
        onChange={handleChange}
        onKeyPress={props.handleKeyPress}
        type="text"
      />
      <Button
        variant="success"
        onClick={props.handleClickSearch}
      >
        Search
      </Button>
    </InputGroup>
  );
}

export default SearchBox;
