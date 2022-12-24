import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

export function CalculatorFormLanguageProficiencySection({
    officialLanguageCriteria
}) {

    const [exams, setExams] = useState([]);
    const [frenchExams, setFrenchExams] = useState([]);
    const [englishExams, setEnglishExams] = useState([]);
    const [selectedFirstOfficialLanguageExam, setSelectedFirstOfficialLanguageExam] = useState([]);
    const [frenchCriteria, setFrenchCriteria] = useState([]);
    const [englishCriteria, setEnglishCriteria] = useState([]);
    const [firstOfficialLanguageCriteria, setFirstOfficialLanguageCriteria] = useState([]);
    const [secondOfficialLanguageCriteria, setSecondOfficialLanguageCriteria] = useState([]);
    const [secondOfficialLanguageExams, setSecondOfficialLanguageExams] = useState([]);

    useEffect(() => {
        const criteria = officialLanguageCriteria;
        const frenchCriteria = getExamLanguageCriteria(criteria, "fr");
        const englishCriteria = getExamLanguageCriteria(criteria, "en");
        const englishExams = getExams(englishCriteria);
        const frenchExams = getExams(frenchCriteria);
        const exams = englishExams.concat(frenchExams);
        setFrenchExams(frenchExams);
        setEnglishExams(englishExams);
        setExams(exams);
        setFrenchCriteria(frenchCriteria);
        setEnglishCriteria(englishCriteria);
    }, [])

    function getExams(criteria) {
        const examsList = [];
        criteria[0].languageExamApplicable.map(
            (exam) => examsList.push(exam)
        );
        return examsList;
    }

    function getExamLanguageCriteria(criteria, language) {
        return criteria.filter(
            (criteria) => criteria.languageExamApplicable.find(
                (exam) => exam.language === language
            ) != undefined
        )
    }

    function handleShowExamCriteria(event) {
        const language = event.target.value;
        const selectedOfficialLanguageExam = event.target.name;

        if (language == "en") {

            if (selectedOfficialLanguageExam === "secondOfficialLanguageExam") {
                setSecondOfficialLanguageCriteria(englishCriteria);
            } else {
                setFirstOfficialLanguageCriteria(englishCriteria);
                setSecondOfficialLanguageExams(frenchExams);

                if (language != selectedFirstOfficialLanguageExam) {
                    setSecondOfficialLanguageCriteria([]);
                }
                setSelectedFirstOfficialLanguageExam(language);
            }
        } else if (language == "fr") {

            if (selectedOfficialLanguageExam === "secondOfficialLanguageExam") {
                setSecondOfficialLanguageCriteria(frenchCriteria);
            } else {
                setFirstOfficialLanguageCriteria(frenchCriteria);
                setSecondOfficialLanguageExams(englishExams);

                if (language != selectedFirstOfficialLanguageExam) {
                    setSecondOfficialLanguageCriteria([]);
                }
                setSelectedFirstOfficialLanguageExam(language);
            }
        } else {

            if (selectedOfficialLanguageExam === "secondOfficialLanguageExam") {
                setSecondOfficialLanguageCriteria([]);
            } else {
                setFirstOfficialLanguageCriteria([]);
                setSecondOfficialLanguageExams([]);
                setSecondOfficialLanguageCriteria([]);
            }
        }
    }

    return (
        // {/* <h3 className={"display-6 pb-3 mb-3 border-bottom"}>calculator</h3> */}

        // {/* <h6 className={"mb-3"}>OFFICIAL LANGUAGE PROFICIENCY</h6> */}
        // {/* <figure>
        //     <blockquote className="blockquote">
        //         <p>OFFICIAL LANGUAGE</p>
        //     </blockquote>
        // </figure> */}
        <>
            <Row className={'mb-3'} >
                <Form.Group as={Col} controlId="formGridFirstOfficialLanguageExam">
                    <Form.Label><strong>First</strong> official language exam</Form.Label>
                    <Form.Select name="firstOfficialLanguageExam" onChange={(e) => handleShowExamCriteria(e)}>
                        <option>Select</option>
                        {exams.map(exam => (
                            <option key={exam.id} value={exam.language}>{exam.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {firstOfficialLanguageCriteria.length > 0 ? (
                    <Form.Group as={Col} controlId="formGridFirstOfficialLanguage">
                        <Form.Label><strong>First</strong> official language grade</Form.Label>
                        <Form.Select name="firstOfficialLanguage">
                            <option>Select</option>
                            {firstOfficialLanguageCriteria.map((criteria) => (
                                <option key={criteria.id} value={criteria.id}>{criteria.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                ) : (
                    <Form.Group as={Col} controlId=""></Form.Group>
                )}
            </Row>
            {secondOfficialLanguageExams.length > 0 ? (
                <Row className={"mb-3"}>
                    {secondOfficialLanguageExams.length > 0 ? (
                        <Form.Group as={Col} controlId="formSecondOfficialLanguageExam">
                            <Form.Label><strong>Second</strong> official language exam (if applicable)</Form.Label>
                            <Form.Select name="secondOfficialLanguageExam" onChange={handleShowExamCriteria}>
                                <option>None</option>
                                {secondOfficialLanguageExams.map(exam => (
                                    <option key={exam.id} value={exam.language}>{exam.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    ) : (
                        ''
                    )}
                    {secondOfficialLanguageCriteria.length > 0 ? (
                        <Form.Group as={Col} controlId="formSecondOfficialLanguage">
                            <Form.Label><strong>Second</strong> official language grade</Form.Label>
                            <Form.Select name="secondOfficialLanguage">
                                <option>Select</option>
                                {secondOfficialLanguageCriteria.map((criteria) => (
                                    <option key={criteria.id} value={criteria.id}>{criteria.label}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    ) : (
                        <Form.Group as={Col} controlId=""></Form.Group>
                    )}
                </Row>
            ) : (
                ''
            )}
        </>
    )
}