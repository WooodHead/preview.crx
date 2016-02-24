var $ = require('../libs/jquery');

module.exports = function(type, sub, path, data, cb) {
  var userId, userToken, accountId, accountToken;

  var sendRequest = function() {
    var xhr = $.ajax({
      type: type,
      url: 'https://'+sub+'.trychameleon.com/'+path,
      data: data,
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function() {
        xhr.setRequestHeader('X-User-Id', userId);
        xhr.setRequestHeader('X-User-Token', userToken);
        xhr.setRequestHeader('X-Account-Id', accountId);
        xhr.setRequestHeader('X-Account-Token', accountToken);
      }
    });

    xhr.done(function() {
      console.log('XHR Done', arguments);
    });

    xhr.fail(function() {
      console.log('XHR Fail', arguments);
    });

    return cb(xhr);
  };

  chrome.storage.local.get(['userId', 'userToken', 'accountId', 'accountToken'], function(o) {
    userId = o.userId; userToken = o.userToken;
    accountId = o.accountId; accountToken = o.accountToken;

    sendRequest();
  });
};
