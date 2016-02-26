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
  $(function() {
    $('#popup-form').on('submit', function(e) {
      e.stopPropagation();
      e.preventDefault();

      var $token = $('#crx-token'),
        $url = $('#account-urls'),
        parts = $token.val().split('|'),
        url = $url.val(),
        options = {}, invalid = false;

      if(parts.length === 0) {
      } else if(parts.length === 4) {
        options.userId = parts[0];
        options.userToken = parts[1];
        options.accountId = parts[2];
        options.accountToken = parts[3];
      } else if(parts.length === 2) {
        options.accountId = parts[0];
        options.accountToken = parts[1];
      } else {
        $token.addClass('invalid');
        invalid = true;
      }

      if(url && !/.+\..+/.test(url)) {
        $url.addClass('invalid');
        invalid = true;
      } else {
        options.accountUrl = url;
      }

      if(invalid) {
        console.log('Saving did not happen because a field was invalid.\n\n\tThe account token should 2 or 4 parts separated by a vertical pipe (|)\n\n\tThe url should each match /.+\..+/', options, parts, url);

        return;
      }

      chrome.storage.local.set(options, function() {
        console.log('Settings saved', options);

        // var xhr = request('POST', 'dashboard', 'users/crx', options);
      });
    });
  });
};
