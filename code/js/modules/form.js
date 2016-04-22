/*
 * Take and store an Account token and Account URL
 */

var $ = require('../libs/jquery'),
  request = require('../modules/request');

module.exports = function(callback) {
  $(function() {
    var $form = $('#popup-form'),
      $token = $('#token'),
      $url = $('#url'),
      originalToken, originalUrl;

    chrome.storage.local.get(['accountToken', 'accountUrl'], function(o) {
      o.accountToken && $token.val(o.accountToken) && (originalToken = o.accountToken);
      o.accountUrl && $url.val(o.accountUrl) && (originalUrl = o.accountUrl) && setTimeout(function() { $url.focus(); }, 10) && setTimeout(function() { $url.focus(); }, 50);
    });

    $form.on('submit', function(e) {
      e.stopPropagation(); e.preventDefault();

      var token = $token.val(),
        url = $url.val(),
        options = {},
        close = function(t) { setTimeout(window.close.bind(window), t || 850) };

      token && (token !== originalToken) && (options.accountToken = token) && (options.accountTokenAt = new Date().toISOString());
      url   && (url !== originalUrl) && (options.accountUrl = url) && (options.accountUrlAt = new Date().toISOString());

      if(Object.keys(options).length) {
        chrome.storage.local.set(options, close);

        $('button').text('Saved...');
      } else {
        close(150);
      }
    });
  });
};
