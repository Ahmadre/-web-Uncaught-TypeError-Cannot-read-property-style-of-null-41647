
hasSeeAddSurveyHint = () => {
    var val = storage.get('hasSeeAddSurveyHint');
    return (val != null && val != 'false' && val != '') ? true : false;
}

saveHasSeeAddSurveyHint = () => {
    var key = 'hasSeeAddSurveyHint';
    storage.set(key, 'true');
}