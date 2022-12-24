import { useEffect, useState } from 'react';
import { Button, Card, Form, FormGroup } from 'react-bootstrap';

import styles from './CalculatorForm.module.css';
import { CalculatorFormAgeEducationSection } from './CalculatorFormAgeEducationSection';
import { CalculatorFormAdaptabilitySection } from './CalculatorFormAdaptabilitySection';
import { CalculatorFormLanguageProficiencySection } from './CalculatorFormLanguageProficiencySection';
import { CalculatorFormMaritalSection } from './CalculatorFormMaritalSection';
import { CalculatorFormWorkSection } from './CalculatorFormWorkSection';

export function CalculatorForm() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [ageCriteria, setAgeCriteria] = useState([]);
    const [educationCriteria, setEducationCriteria] = useState([]);
    const [canadianEducationCriteria, setCanadianEducationCriteria] = useState([]);
    const [officialLanguageCriteria, setOfficialLanguageCriteria] = useState([]);
    const [workExperienceCriteria, setWorkExperienceCriteria] = useState([]);
    const [canadianWorkExperienceCriteria, setCanadianWorkExperienceCriteria] = useState([]);

    const [exams, setExams] = useState([]);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        fetch(
            "http://localhost:3333/criteria",
            {
                method: 'GET',
                headers: new Headers({ 'content-type': 'application/json' })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAgeCriteria(getCriteriaByFactor(result, "age"));
                    setEducationCriteria(getCriteriaByFactor(result, "education"));
                    setCanadianEducationCriteria(getCriteriaByFactor(result, "canadianEducation"));
                    setWorkExperienceCriteria(getCriteriaByFactor(result, "workExperience"));
                    setCanadianWorkExperienceCriteria(getCriteriaByFactor(result, "canadianWorkExperience"));

                    const officialLanguage = getCriteriaByFactor(result, "firstOfficialLanguage");
                    setOfficialLanguageCriteria(officialLanguage);

                    const frenchCriteria = getExamLanguageCriteria(officialLanguage, "fr");
                    const englishCriteria = getExamLanguageCriteria(officialLanguage, "en");
                    const englishExams = getExams(englishCriteria);
                    const frenchExams = getExams(frenchCriteria);
                    const exams = englishExams.concat(frenchExams);
                    setExams(exams);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    useEffect(() => {
        fetch(
            "http://localhost:3333/provinces",
            {
                method: 'GET',
                headers: new Headers({ 'content-type': 'application/json' })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProvinces(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    function getCriteriaByFactor(items, factorAlias: string) {
        return items.filter(
            (criteria) =>
                criteria.factors.find(
                    (factor) => factor.alias === factorAlias
                ) != undefined
        )
    }

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

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Card>
                <Form>
                    <Card.Body className="bg-light">
                        <CalculatorFormAgeEducationSection
                            ageCriteria={ageCriteria}
                            educationCriteria={educationCriteria}
                            canadianEducationCriteria={canadianEducationCriteria}
                        />
                    </Card.Body>
                    <Card.Body className="bg-white">
                        <CalculatorFormLanguageProficiencySection
                            officialLanguageCriteria={officialLanguageCriteria}
                        />
                    </Card.Body>
                    <Card.Body className="bg-light">
                        <CalculatorFormWorkSection
                            provinces={provinces}
                            workExperienceCriteria={workExperienceCriteria}
                            canadianWorkExperienceCriteria={canadianWorkExperienceCriteria}
                        />
                    </Card.Body>
                    <Card.Body className="bg-white">
                        <CalculatorFormAdaptabilitySection
                        />
                    </Card.Body>
                    <Card.Body className="bg-white">
                        <CalculatorFormMaritalSection
                            spouseCanadianWorkExperienceCriteria={canadianWorkExperienceCriteria}
                            exams={exams}
                            spouseOfficialLanguageCriteria={officialLanguageCriteria}
                        />
                    </Card.Body>
                    <Card.Body className="bg-white">
                        <FormGroup className="mb-3">
                            <Button variant="danger" type="submit">
                                Calculate
                            </Button>
                        </FormGroup>
                    </Card.Body>
                </Form>
            </Card>
        )
    }
}