import React from 'react';
import { Card, Accordion, ListGroup } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

interface WordAccordionItemProps {
    definitions: string[];
    eventKey: string;
    word: string;
}

function CustomToggle({ children, eventKey }: { children: React.ReactNode, eventKey: string }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('custom toggle!')
  );

  return (
    <div
      className="text-left text-light btn-dark btn btn-lg w-100"
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}


function WordAccordionItem(props: WordAccordionItemProps) {
  if (!props.definitions.length) {
    // props.definitions is an empty array
    return null;
  }

  const wordDefinitionListItems = props.definitions.map((definition, index) => {
    return (
      <ListGroup.Item key={index}>
        {definition}
      </ListGroup.Item>
    );
  });

  return (
    <React.Fragment>
      <Card>
        <Card.Header className="p-0">
             <CustomToggle eventKey={props.eventKey}>
                 Definition of "{props.word}"
             </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={props.eventKey}>
           <ListGroup variant="flush">
              {wordDefinitionListItems}
           </ListGroup>
        </Accordion.Collapse>
      </Card>
    </React.Fragment>
  );
}

export default WordAccordionItem;
