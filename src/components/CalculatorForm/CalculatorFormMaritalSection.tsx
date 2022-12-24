import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

export function CalculatorFormMaritalSection({
    spouseCanadianWorkExperienceCriteria,
    exams,
    spouseOfficialLanguageCriteria
}) {

    const [isMarried, setIsMarried] = useState(false);
    const [spouseOfficialLanguageExam, setSpouseOfficialLanguageExam] = useState(false);

    function handleMarriedStatus(event) {
        const isMarried = event.target.checked;
        setIsMarried(isMarried);

        if (!isMarried) {
            setSpouseOfficialLanguageExam(false);
        }
    }

    function handleSpouseOfficialLanguageExam(event) {
        const officialLanguage = event.target.value;

        if (officialLanguage === "None")
            setSpouseOfficialLanguageExam(false);
        else
            setSpouseOfficialLanguageExam(true);
    }

    return (
        // {/* <h3 className="display-6 pb-3 mb-3 border-bottom">marital</h3> */}
        // {/* <figure>
        //     <blockquote className="blockquote">
        //         <p>MARITAL</p>
        //     </blockquote>
        // </figure> */}
        <>
            <Row className='mb-3'>
                <Form.Group as={Col} controlId="formGridIsMarried">
                    <Form.Check
                        name="isMarried"
                        onChange={handleMarriedStatus}
                        type="switch"
                        id="marital-switch"
                        label={"Married (leave unset if not apply)"}
                    />
                </Form.Group>
            </Row>
            {isMarried ? (
                <>
                    <Row className='mb-3'>
                        <Form.Group as={Col} sm={6} controlId="formGridSpouseCanadianWorkExperience">
                            <Form.Label>Spouse work experience <strong>in Canada</strong>  (if applicable)</Form.Label>
                            <Form.Select
                                name="spouseCanadianWorkExperience"
                            >
                                <option>None</option>
                                {spouseCanadianWorkExperienceCriteria.map(criteria => (
                                    <option key={criteria.id} value={criteria.id}>
                                        {criteria.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="formGridSpouseOfficialLanguageExam">
                            <Form.Label>Spouse official language exam (if applicable)</Form.Label>
                            <Form.Select
                                name="spouseOfficialLanguageExam"
                                onChange={event => handleSpouseOfficialLanguageExam(event)}
                            >
                                <option>None</option>
                                {exams.map(exam => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {spouseOfficialLanguageExam ? (
                            <Form.Group as={Col} controlId="formGridSpouseOfficialLanguage">
                                <Form.Label>Grade</Form.Label>
                                <Form.Select
                                    name="spouseOfficialLanguage"
                                >
                                    <option>Select</option>
                                    {spouseOfficialLanguageCriteria.map(criteria => (
                                        <option key={criteria.id} value={criteria.id}>
                                            {criteria.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        ) : (
                            <Form.Group as={Col} controlId="" />
                        )}
                    </Row>
                </>
            ) : (
                ''
            )}
        </>
    )
}