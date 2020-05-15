var wm = new WeakMap();
var privateStore = {};

if (!lock) {
  console.log('Creating Lock');

  var lock = new Auth0Lock(
    'hfxfGQ05mJ4PkaQYjMY6nTiM5MdqY3wq',
    'les-test.auth0.com',
    {
      auth: { responseType: 'id_token' }
    }
  );
  
  wm.set(privateStore, {
    appName: "example"
  });
  
  document.getElementById('btn-login').addEventListener('click', function() {
    lock.show();
  });

  lock.on("authenticated", function(authResult) {
    console.log('get user info');
    // Use the token in authResult to getUserInfo() and save it if necessary
    this.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        // Handle error
        return;
      }
  
      //we recommend not storing Access Tokens unless absolutely necessary
      wm.set(privateStore, {
        accessToken: authResult.accessToken
      });
  
      wm.set(privateStore, {
        profile: profile
      });
  
    });
  });
}

