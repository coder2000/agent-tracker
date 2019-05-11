import * as React from "react";
import { Container, Col, Navbar, Row } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

export function Layout(props: Props) {
  const { children } = props;

  return (
    <>
      <Navbar>
        <Navbar.Brand>24-7 Intouch Airbnb</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
}
