/*
 * Take and store a User token, Account token and Account URL
 *
 *   - Use the user token to present authentication as X-User-Id and X-User-Token
 *   - Use the account token to present authentication as X-Account-Id and X-Account-Token
 *
 */

var $ = require('../libs/jquery'),
  request = require('../modules/request');

module.exports = function(callback) {
  console.log('Form init');

  $(function() {
    console.log($('#popup-form'));

    $('#popup-form').on('submit', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var $token = $('#crx-token'),
        $url = $('#account-urls'),
        invalid = false;

      var parts = $token.val().split('|'),
        url = $url.val();

      if(parts.length !== 4) {
        $token.addClass('invalid');
        invalid = true;
      }

      if(!/.+\..+/.test(url)) {
        $url.addClass('invalid');
        invalid = true;
      }

      if(invalid) return;

      var options = {
        userId: parts[0],
        userToken: parts[1],
        accountId: parts[2],
        accountToken: parts[3],
        accountUrl: $url.val()
      };

      console.log('Settings saving', options);

      chrome.storage.local.set(options, function() {
        console.log('Settings saved', options);

        // var xhr = request('POST', 'dashboard', 'users/crx', options);
      });
    });
  });
};
