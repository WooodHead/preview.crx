/*
 * Take and store an Account token and Account URL
 */

var $ = require('../libs/jquery'),
  request = require('../modules/request');

module.exports = function(callback) {
  $(function() {
    $('#popup-form').on('submit', function(e) {
      e.stopPropagation(); e.preventDefault();

      $(this).blur();

      var $token = $('#token'),
        $url = $('#url'),
        token = $token.val(),
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
