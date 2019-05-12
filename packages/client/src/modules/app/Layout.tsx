import * as React from "react";
import {
  Container,
  Col,
  Nav,
  Navbar,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

type Props = {
  children: React.ReactNode;
};

const NavbarStyle = {
  boxShadow: "0 8px 10px -10px black",
  marginBottom: "1rem"
};

const AirbnbStyle = {
  color: "#FF5A60"
};

export function Layout(props: Props) {
  const { children } = props;

  return (
    <>
      <Navbar style={NavbarStyle}>
        <Navbar.Brand>
          24-7 Intouch <Icon icon={["fab", "airbnb"]} style={AirbnbStyle} />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={<Tooltip id="stats-tooltip">Statistics</Tooltip>}
          >
            <Nav.Link eventKey="statistics">
              <Icon icon="chart-bar" />
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={<Tooltip id="interactions-tooltip">Interactions</Tooltip>}
          >
            <Nav.Link eventKey="interactions">
              <Icon icon="ticket-alt" />
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={<Tooltip id="supcall-tooltip">Supervisor Calls</Tooltip>}
          >
            <Nav.Link eventKey="supcall">
              <Icon icon="level-up-alt" />
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={<Tooltip id="losses-tooltip">Losses</Tooltip>}
          >
            <Nav.Link eventKey="losses">
              <Icon icon="dollar-sign" />
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={<Tooltip id="consult-tooltip">Ticket Consult</Tooltip>}
          >
            <Nav.Link eventKey="consult">
              <Icon icon="question" />
            </Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger
            key={"bottom"}
            placement={"bottom"}
            overlay={<Tooltip id="handoff-tooltip">Handoffs</Tooltip>}
          >
            <Nav.Link eventKey="handoff">
              <Icon icon="handshake" />
            </Nav.Link>
          </OverlayTrigger>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
}
