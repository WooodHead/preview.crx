;(function() {
  var settings = ['accountUrl', 'accountToken'];

  chrome.storage.local.get(settings, function(o) {
    if(!o.accountUrl || !o.accountToken) {
      return;
    } else if(document.location.hostname.indexOf(o.accountUrl) === -1) {
      return;
    }

    var string = "(function(doc,win) { \
      var chmln = 'chmln', \
        names = 'setup identify alias track set show on off custom help _data'.split(' '); \
 \
      win[chmln] || (win[chmln] = {}); \
      win[chmln].accountToken = '"+o.accountToken+"'; \
      win[chmln].adminPreview = true; \
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
      script.src = 'https://fast.trychameleon.com/messo/'+'"+o.accountToken+"'+'/messo.min.js'; \
      script.async = true; \
      doc.head.appendChild(script); \
    })(document,window);";

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = string;
    document.head.appendChild(script);
  });
})();
