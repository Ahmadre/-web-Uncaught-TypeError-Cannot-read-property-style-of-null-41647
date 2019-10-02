
getUserLanguage = () => {
    var userLanguage = storage.get('userLanguage');
    return (userLanguage != null && userLanguage != '') ? userLanguage : null;
}

saveUserLanguage = (languageCode) => {
    var key = 'userLanguage';
    storage.set(key, languageCode);
}

getSurveyLanguagePackage = () => {
  var result = storage.get('_surveySentences');
  return (result != null && result != '') ? result : null;
}

setSurveyLanguagePackage = (survey) => {
  var key = '_surveySentences';
  storage.set(key, survey);
}