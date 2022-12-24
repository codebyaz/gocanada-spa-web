import { Card, Col, Container, Form, Row } from "react-bootstrap";

export function CalculatorFormAdaptabilitySection() {
    return (
        // {/* <h3 className="display-6 pb-3 mb-3 border-bottom">adaptability</h3> */}
        // {/* <figure>
        //     <blockquote className="blockquote">
        //         <p>ADAPTABILITY</p>
        //     </blockquote>
        // </figure> */}
        <>
            <Row className='mb-3' >
                <Form.Group as={Col} controlId="formGridProvinceNomination">
                    <Form.Check
                        name="provinceNomination"
                        type="switch"
                        id="provinceNomination-switch"
                        label={"Nomination certificate from a province or territory"}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formGridSiblingInCanada">
                    <Form.Check
                        name="siblingInCanada"
                        type="switch"
                        id="sibling-switch"
                        label={"Sibling who is a Canadian Citizen or Permanent Resident living in Canada"}
                    />
                </Form.Group>
            </Row>
        </>
    )
}