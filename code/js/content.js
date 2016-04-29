;(function() {
  var settings = ['accountUrl', 'accountToken', 'accountUrlAt'],
    onDashboard = /dashboard\.trychameleon/.test(document.location.hostname),
    href = document.location.href,
    accountToken, accountUrl, urlUpdated;

  if(onDashboard) {
    document.addEventListener('dashboard-data', updateSettings);

    addScript('window.dashboard && (dashboard.adminPreview = true) && dashboard.adminPreviewCheck();');
  }

  chrome.storage.local.get(settings, function(o) {
    accountToken = o.accountToken;
    accountUrl = o.accountUrl;
    urlUpdated = o.accountUrlAt;

    if(!onDashboard) {
      start();
    }
  });

  function start() {
    if (!accountToken || !accountUrl) {
      return;
    } else if (href.indexOf(accountUrl.replace(/https?:\/\//, '')) === -1) {
      return;
    }

    addScript(" \
    !function(doc,win,root) { if(root) { return; } \
      win.chmln = { accountToken: '"+accountToken+"', adminPreview: true, identify: function() {} }; \
    \
      var script = doc.createElement('script'); \
      script.src = 'https://fast.trychameleon.com/messo/'+win.chmln.accountToken+'/messo.min.js'; \
      script.async = true; \
      doc.head.appendChild(script); \
    }(document,window,window.chmln);");
  }

  function addScript(string) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = string;
    document.head.appendChild(script);

    setTimeout(function() { document.head.removeChild(script); }, 500);
  }

  function updateSettings() {
    var newConfig = !accountToken,
      account = JSON.parse(document.querySelector('#dashboard-data').getAttribute('data-account')),
      token = account.tokens[account.tokens.length-1],
      url = account.url,
      options = {};

    if(token && accountToken !== token) {
      accountToken = options.accountToken = token;
    }

    if(!urlUpdated && url && accountUrl !== url) {
      accountUrl = options.accountUrl = url;
    }

    if(Object.keys(options).length) {
      var message = newConfig ? 'Automatically set up the Chameleon Preview configuration token and url.' :
        'Automatically updated Chameleon Preview configuration';

      console.log(message, options);
      chrome.storage.local.set(options, function() { });
    }
  }
})();
