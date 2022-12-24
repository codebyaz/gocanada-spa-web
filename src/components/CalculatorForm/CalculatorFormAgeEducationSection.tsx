import { Card, Col, Container, Form, Row } from "react-bootstrap";

export function CalculatorFormAgeEducationSection({
    ageCriteria,
    educationCriteria,
    canadianEducationCriteria
}) {
    return (
        // {/* <h3 className={"display-6 pb-3 mb-3 border-bottom"}>age and education</h3>
        //  {/* <figure>
        //     <blockquote className="blockquote">
        //         <p>AGE AND EDUCATION</p>
        //     </blockquote>
        // </figure> */}
        <>
            <Row className='mb-3'>
                <Form.Group as={Col} sm={3} controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Select name="age">
                        <option>Select</option>
                        {ageCriteria.map(criteria => (
                            <option key={criteria.id} value={criteria.id}>
                                {criteria.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formGridCanadianLevelOfEducation">
                    <Form.Label>Level of education <strong>in Canada</strong></Form.Label>
                    <Form.Select name="canadianLevelOfEducation">
                        <option>None</option>
                        {canadianEducationCriteria.map(criteria => (
                            <option key={criteria.id} value={criteria.id}>
                                {criteria.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLevelOfEducation">
                    <Form.Label>Level of education <strong>outside Canada</strong></Form.Label>
                    <Form.Select name="levelOfEducation">
                        <option>None</option>
                        {educationCriteria.map(criteria => (
                            <option key={criteria.id} value={criteria.id}>
                                {criteria.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
        </>
    )
}