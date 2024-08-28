export function getAge(dateString) {
    const inputDate = new Date(dateString);
    const ageDifMs = Date.now() - inputDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getAgeText(age) {
    let pluralForm;
    const remainder = age % 100;

    if (remainder >= 5 && remainder <= 20) {
        pluralForm = 'лет';
    } else {
        const lastDigit = remainder % 10;
        pluralForm =
            lastDigit === 1 ? 'год' : lastDigit >= 2 && lastDigit <= 4 ? 'года' : 'лет';
    }
    return pluralForm;
}

export function getProjectsText(count) {
    let ProjectsText;
    const remainder = count % 100;

    if (remainder >= 5 && remainder <= 20) {
        ProjectsText = 'выполненных проектов';
    } else {
        const lastDigit = remainder % 10;
        ProjectsText =
            lastDigit === 1 ? 'выполненный проект' : lastDigit >= 2 && lastDigit <= 4 ? 'выполненных проекта' : 'выполненных проектов';
    }
    return ProjectsText;
}
