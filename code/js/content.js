;(function() {
  console.log('Chameleon Extension booting on: ');

  var settings = ['userId', 'userToken', 'accountId', 'accountToken', 'accountUrl'];

  chrome.storage.local.get(settings, function(o) {
    console.log('Content settings', window.location.href, document.location.href);

    if(!o.accountUrl || document.location.href.indexOf(o.accountUrl) === -1) {
      return;
    }

    var string = "(function(doc,win) { \
      var chmln = 'chmln', \
        names = 'setup identify alias track set show on off custom help _data'.split(' '); \
 \
      console.log('setting up chameleon', win, doc); \
 \
      win[chmln] || (win[chmln] = {}); \
      win[chmln].accountToken = '"+o.accountToken+"'; \
      win[chmln].location = win.location.href.toString(); \
      win[chmln].adminPreview = true; \
      win[chmln].auth = { \
        user: { id: '"+o.userId+"', token: '"+o.userToken+"' }, \
        account: { id: '"+o.accountId+"' } \
      }; \
 \
      for(var i = 0; i<names.length; i++) { \
        (function() { \
          var calls = win[chmln][names[i]+'_a'] = []; \
          win[chmln][names[i]] = function() { \
            calls.push(arguments); \
          }; \
        })(); \
      } \
 \
      var script = doc.createElement('script'); \
      script.src = 'https://hyoid.trychameleon.com/messo/'+'"+o.accountToken+"'+'/messo.min.js?user-id='+'"+o.userId+"'+'&admin-preview=true'; \
      script.async = true; \
      doc.head.appendChild(script); \
    })(document,window);";

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = string;
    document.head.appendChild(script);
  });
})();
