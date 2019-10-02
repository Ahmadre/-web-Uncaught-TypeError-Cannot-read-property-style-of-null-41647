/**
 * Secure Local Storage
 * @usage
 * GETTER
 * ls.get('key-name')
 * SETTER
 * ls.set('key-name', {test: 'secure-ls'})
 * REMOVE
 * ls.remove('key-name')
 * REMOVEALL
 * ls.removeAll()
 * CLEAR
 * ls.clear()
 * GETALLKEYS
 * ls.getAllKeys()
 */

const storage = new SecureLS({ encodingType: 'aes', encryptionSecret: 'pr4XdWSc7jArE86LtwiRistpW3PgMMHpHHQxpA9EozjcpztDgfhQKQAa56kfNnAS' });

firebaseToken = () => {
  var key = 'firebaseToken';
  var firebaseToken = storage.get(key);
  return (firebaseToken != null && firebaseToken != '') ? firebaseToken : null;
}

userData = () => {
  var key = 'userData';
  var userData = storage.get(key);
  return (userData != null && userData != '') ? userData : null;
}

saveUserData = (userData) => {
  var key = 'userData';
  storage.set(key, userData);
}

deleteUserData = () => {
  var key = 'userData';
  storage.remove(key);
}

userToken = () => {
  var key = 'token';
  var userToken = storage.get(key);
  return (userToken != null && userToken != '') ? userToken : null;
}

saveToken = (token) => {
  var key = 'token';
  storage.set(key, token);
}

deleteToken = () => {
  var key = 'token';
  storage.remove(key);
}

isLoggedIn = () => {
  var val = storage.get('token');
  return (val != null && val != 'false' && val != '') ? true : false;
}

hasSeenTour = () => {
  var val = storage.get('hasSeenTour');
  return (val != null && val != 'false' && val != '') ? true : false;
}

saveHasSeenTour = () => {
  var key = 'hasSeenTour';
  storage.set(key, 'true');
}

lockScreenEnabled = () => {
  var val = storage.get('lockScreenEnabled');
  return (val != null && val != 'false' && val != '') ? true : false;
}

localAuthEnabled = () => {
  var val = storage.get('localAuthEnabled');
  return (val != null && val != 'false' && val != '') ? true : false;
}

/*
 * Local App-Lock Pass-Code
 */
localAuthPassCode = () => {
  var val = storage.get('localAuthPassCode');
  if (val != null && val != '') {
    return val;
  } else {
    return null;
  }
}

saveLocalAuthPassCode = (passCode) => {
  storage.set('localAuthPassCode', passCode);
}

userBlankSurvey = () => {
  var val = storage.get('userBlankSurvey');
  if (val != null && val != '') {
    return val;
  } else {
    return null;
  }
}

pausedDuration = () => {
  var val = storage.get('pausedDuration');
  if (val != null && val != '') {
    return val;
  } else {
    return null;
  }
}

savePausedDuration = (duration) => {
  storage.set('pausedDuration', duration);
}

saveUserBlankSurvey = (answers) => {
  storage.set('userBlankSurvey', answers);
}

deletePausedDuration = () => {
  storage.remove('pausedDuration');
}

deleteUserBlankSurvey = () => {
  storage.remove('userBlankSurvey');
}