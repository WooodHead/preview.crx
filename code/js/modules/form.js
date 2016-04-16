/*
 * Take and store an Account token and Account URL
 */

var $ = require('../libs/jquery'),
  request = require('../modules/request');

module.exports = function(callback) {
  $(function() {
    var $form = $('#popup-form'),
      $token = $('#token'),
      $url = $('#url');

    chrome.storage.local.get(['accountToken', 'accountUrl'], function(o) {
      o.accountToken && $token.val(o.accountToken);
      o.accountUrl && $url.val(o.accountUrl) && setTimeout(function() { $url.focus(); }, 10);
    });

    $form.on('submit', function(e) {
      e.stopPropagation(); e.preventDefault();

      var token = $token.val(),
        url = $url.val(),
        options = {},
        close = function() { setTimeout(window.close.bind(window), 350) };

      token && (options.accountToken = token);
      url   && (options.accountUrl = url);

      if(Object.keys(options).length) {
        chrome.storage.local.set(options, close);
      } else {
        close();
      }
    });
  });
};
