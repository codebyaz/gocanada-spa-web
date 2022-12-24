import { useEffect, useState } from 'react';
import { Button, Card, Container, Form, FormGroup } from 'react-bootstrap';

import styles from './CalculatorForm.module.css';
import { CalculatorFormAgeEducationSection } from './CalculatorFormAgeEducationSection';
import { CalculatorFormAdaptabilitySection } from './CalculatorFormAdaptabilitySection';
import { CalculatorFormLanguageProficiencySection } from './CalculatorFormLanguageProficiencySection';
import { CalculatorFormMaritalSection } from './CalculatorFormMaritalSection';
import { CalculatorFormWorkSection } from './CalculatorFormWorkSection';

export function CalculatorForm() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [state, setState] = useState({});
    const {
        ageCriteria,
        educationCriteria,
        canadianEducationCriteria,
        workExperienceCriteria,
        canadianWorkExperienceCriteria
    } = state;


    const [exams, setExams] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [officialLanguageCriteria, setOfficialLanguageCriteria] = useState([]);

    async function loadCriteria() {

        fetch
            (
                "http://localhost:3333/criteria",
                {
                    method: 'GET',
                    headers: new Headers({ 'content-type': 'application/json' })
                }
            )
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setState({
                        ageCriteria: getCriteriaByFactor(result, "age"),
                        educationCriteria: getCriteriaByFactor(result, "foreignEducation"),
                        canadianEducationCriteria: getCriteriaByFactor(result, "canadianEducation"),
                        workExperienceCriteria: getCriteriaByFactor(result, "foreignWorkExperience"),
                        canadianWorkExperienceCriteria: getCriteriaByFactor(result, "canadianWorkExperience")
                    })


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
    }

    function loadProvinces() {
        fetch
            (
                "http://localhost:3333/provinces",
                {
                    method: 'GET',
                    headers: new Headers({ 'content-type': 'application/json' })
                }
            )
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
    }

    // function getCriteriaByFactor(items, factorAlias: string) {
    //     return items.filter(
    //         (criteria) =>
    //             criteria.factors.find(
    //                 (factor) => factor.alias === factorAlias
    //             ) != undefined
    //     )
    // }

    function getCriteriaByFactor(items, factorAlias: string) {
        return items.filter(
            (criteria) => criteria.factor.alias === factorAlias
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

    useEffect(() => {
        loadCriteria();
        loadProvinces();
    }, [])

    // todo: improve to send state instead of get values from event
    async function handleSubmit(event) {
        event.preventDefault();

        const selectedCriteria = [];
        selectedCriteria.push(
            event.target.firstOfficialLanguage.value,
            event.target.secondOfficialLanguage?.value,
            event.target.age.value,
            event.target.levelOfEducation?.value,
            event.target.canadianLevelOfEducation?.value,
            event.target.canadianWorkExperience?.value,
            event.target.workExperience?.value,
            event.target.jobOffer.checked,
            event.target.jobOfferProvince?.value,
            event.target.provinceNomination.checked,
            event.target.siblingInCanada.checked,
            event.target.isMarried.checked,
            event.target.spouseCanadianWorkExperience?.value,
            event.target.spouseOfficialLanguage?.value
        )
        const uriQueryParams = selectedCriteria.map(
            selectedCriteria => {
                if (selectedCriteria !== 'None' && selectedCriteria !== undefined)
                    return "&criteria=" + selectedCriteria
            });
        console.log(uriQueryParams.join(""));

        // const selectedFirstOfficialLanguage = event.target.firstOfficialLanguage.value;
        // const selectedSecondOfficialLanguage = event.target.secondOfficialLanguage?.value;
        // const selectedAge = event.target.age.value;
        // const selectedLevelOfEducation = event.target.levelOfEducation?.value;
        // const selectedCanadianLevelOfEducation = event.target.canadianLevelOfEducation?.value;
        // const selectedCanadianWorkExperience = event.target.canadianWorkExperience?.value;
        // const selectedWorkExperience = event.target.workExperience?.value;
        // const haveJobOffer = event.target.jobOffer.checked;
        // const selectedJobOfferProvince = event.target.jobOfferProvince?.value;
        // const haveProvinceNomination = event.target.provinceNomination.checked;
        // const haveSiblingInCanada = event.target.siblingInCanada.checked;
        const isMarried = event.target.isMarried.checked;
        // const selectedSpouseCanadianWorkExperience = event.target.spouseCanadianWorkExperience?.value;
        // const selectedSpouseOfficialLanguage = event.target.spouseOfficialLanguage?.value;

        // const urlQueryParams = new URLSearchParams({
        //     criteria: [selectedFirstOfficialLanguage,
        //         selectedSecondOfficialLanguage,
        //         selectedAge]
        // });
        // const criteriaParams =
        // {
        //     firstOfficialLanguage: selectedFirstOfficialLanguage,
        //     secondOfficialLanguage: selectedSecondOfficialLanguage,
        //     age: selectedAge,
        //     foreignLevelOfEducation: selectedLevelOfEducation,
        //     canadianLevelOfEducation: selectedCanadianLevelOfEducation,
        //     canadianWorkExperience: selectedCanadianWorkExperience,
        //     foreignWorkExperience: selectedWorkExperience,
        //     haveJobOffer: haveJobOffer,
        //     jobOfferProvince: selectedJobOfferProvince,
        //     haveProvinceNomination: haveProvinceNomination,
        //     haveSiblingInCanada: haveSiblingInCanada,
        //     spouseCanadianWorkExperience: selectedSpouseCanadianWorkExperience,
        //     spouseOfficialLanguage: selectedSpouseOfficialLanguage
        // }
        //     ;

        // const criteriaParams = new URLSearchParams(
        //     {
        //         criteria: selectedFirstOfficialLanguage,
        //         selectedSecondOfficialLanguage,
        //         selectedAge,

        //     }
        // );

        const statusParam = isMarried ? "married" : "single";

        await fetch(
            'http://localhost:3333/results?status=' + statusParam + uriQueryParams.join(""),
            { headers: new Headers({ 'content-type': 'application/json' }) }
        );

    }

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Form onSubmit={handleSubmit}>
                <CalculatorFormLanguageProficiencySection
                    officialLanguageCriteria={officialLanguageCriteria}
                />
                <CalculatorFormAgeEducationSection
                    ageCriteria={ageCriteria}
                    educationCriteria={educationCriteria}
                    canadianEducationCriteria={canadianEducationCriteria}
                />
                <CalculatorFormWorkSection
                    provinces={provinces}
                    workExperienceCriteria={workExperienceCriteria}
                    canadianWorkExperienceCriteria={canadianWorkExperienceCriteria}
                />
                <CalculatorFormAdaptabilitySection />
                <CalculatorFormMaritalSection
                    spouseCanadianWorkExperienceCriteria={canadianWorkExperienceCriteria}
                    exams={exams}
                    spouseOfficialLanguageCriteria={officialLanguageCriteria}
                />
                <FormGroup className="mb-3">
                    <Button variant="danger" type="submit">
                        Calculate
                    </Button>
                </FormGroup>
            </Form>
        )
    }
}