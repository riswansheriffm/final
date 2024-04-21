import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";

// const QA = [1, 2, 3, 4, 5, 6];
export default function FAQ() {
  const [QA, setQA] = useState();
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQA(data.results);
      });
  }, []);

  console.log(QA);

  return (
    <Container fluid className="mt-2">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-1">
          <div className="text-center text-muted mb-1">
            <h2 className=" text-lg font-weight-bold">
              Frequently Asked Questions
            </h2>
          </div>
        </CardHeader>
        <CardBody className="px-lg-2 py-lg-2">
          <Accordion allowZeroExpanded={true}>
            {QA?.map((elem) => {
              return (
                <AccordionItem key={elem.correct_answer}>
                  <AccordionItemHeading>
                    <AccordionItemButton
                      style={{ backgroundColor: "#587ea7ff", color: "white" }}
                    >
                      {elem.question}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <h3> {elem.correct_answer}</h3>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardBody>
      </Card>
    </Container>
  );
}
