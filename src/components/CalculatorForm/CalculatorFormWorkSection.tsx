import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

export function CalculatorFormWorkSection({
    provinces,
    workExperienceCriteria,
    canadianWorkExperienceCriteria
}) {

    const [haveValidJobOffer, setHaveValidJobOffer] = useState(false);
    const [haveExperienceInCanada, setHaveExperienceInCanada] = useState(false);

    function handleHaveValidJobOffer(event) {
        const haveValidJobOffer = event.target.checked;

        setHaveValidJobOffer(haveValidJobOffer);
    }

    function handleHaveExperienceInCanada(event) {
        const someExperienceInCanada = event.target.value;

        if (someExperienceInCanada === "None")
            setHaveExperienceInCanada(false);
        else
            setHaveExperienceInCanada(true);
    }

    return (
        <>
            {/* <h3 className={"display-6 pb-3 mb-3 border-bottom"}>work</h3> */}
            {/* <figure>
                <blockquote className="blockquote">
                    <p>WORK</p>
                </blockquote>
            </figure> */}
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formGridCanadianWorkExperience">
                    <Form.Label>Work experience <strong>in Canada</strong>  (if applicable)</Form.Label>
                    <Form.Select
                        onChange={event => handleHaveExperienceInCanada(event)}
                        name="canadianWorkExperience"
                    >
                        <option>None</option>
                        {canadianWorkExperienceCriteria.map(criteria => (
                            <option key={criteria.id} value={criteria.id}>
                                {criteria.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {haveExperienceInCanada ? (
                    <Form.Group as={Col} controlId="formGridWorkExperienceProvince">
                        <Form.Label>at Province</Form.Label>
                        <Form.Select name="workExperienceProvince">
                            <option>Select</option>
                            {provinces.map(province => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                ) : (
                    <Form.Group as={Col} controlId="" />
                )}
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} sm={6} controlId="formGridWorkExperience">
                    <Form.Label>Work experience <strong>outside Canada</strong> (if applicable)</Form.Label>
                    <Form.Select
                        name="workExperience"
                    >
                        <option>None</option>
                        {workExperienceCriteria.map(criteria => (
                            <option key={criteria.id} value={criteria.id}>
                                {criteria.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formGridJobOffer">
                    <Form.Check
                        name="jobOffer"
                        onChange={handleHaveValidJobOffer}
                        type="switch"
                        id="custom-switch"
                        label={"Valid job offer from a Canadian employer"}
                    />
                </Form.Group>
            </Row>
            {haveValidJobOffer ? (
                <Row className='mb-3'>
                    <Form.Group as={Col} sm={6} controlId="formGridJobOfferProvince">
                        <Form.Label>Province of the issuer employer</Form.Label>
                        <Form.Select name="jobOfferProvince">
                            <option>Select</option>
                            {provinces.map(province => (
                                <option key={province.id} value={province.id}>
                                    {province.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
            ) : (
                ''
            )}
        </>
    )
}