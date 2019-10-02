
getAnswers = () => {
    var result = storage.get('userAnswers');
    return (result != null && result != '') ? result : null;
}

setAnswers = (answers) => {
    var key = 'userAnswers';
    storage.set(key, answers);
}