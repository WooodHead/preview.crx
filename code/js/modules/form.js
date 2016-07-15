/*
 * Take and store an Account URL
 */

var $ = require('../libs/jquery');

module.exports = function(callback) {
  $(function() {
    var $form = $('#popup-form'),
      $icon = $('#icon'),
      $url = $('#url'), originalUrl;

    chrome.storage.local.get(['accountUrl', 'accountToken'], function(o) {
      o.accountUrl && $url.val(o.accountUrl) && (originalUrl = o.accountUrl);
      o.accountToken ? $('#token').text(o.accountToken) : $('#navigate-to').removeClass('hidden');
    });

    $icon.on('click', function() {
      chrome.tabs.create({ url: 'https://dashboard.trychameleon.com' });
    });

    $form.on('submit', function(e) {
      e.stopPropagation(); e.preventDefault();

      var url = $url.val(),
        options = {},
        close = function(t) { setTimeout(window.close.bind(window), t || 850) };

      url && (url !== originalUrl) && (options.accountUrl = url) && (options.accountUrlAt = new Date().toISOString());

      if(Object.keys(options).length) {
        chrome.storage.local.set(options, close);

        $('button').text('Saved...');
      } else {
        close(150);
      }

      /https?:\/\//.test(url) || (url = 'http://'+url);

      chrome.tabs.create({ url: url });
    });
  });
};
