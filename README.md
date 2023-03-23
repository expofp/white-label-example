# white-label-example

# Pages

[Dashboard](https://white-label-example.herokuapp.com/) - example dashboard.

[Designer](https://white-label-example.herokuapp.com/designer) - design floor plan. Add this page to your service.

[View](https://efp-white-label.s3.us-east-1.amazonaws.com/build/testScope/Event1/index.html) - view floor plan. Embed on your website, app or kiosk.

[Send data](https://white-label-example.herokuapp.com/sendData) - example of exhibitor data file (no need to add as a separate page).

# Usage
The version of ```Node.js``` must be at least ```18.0.0```

The code in this example demonstrates how to use the ```signWithScopeSecret``` https://github.com/expofp/white-label-example/blob/master/crypto.js#L3 function to create a signature that can be used to authenticate with a service. The signature is created using a private key obtained from the service.

To use your example based on this, you need to:

1. Get the ```private key``` and your unique ```scope``` from ```ExpoFP```.

2. Create ```.env``` file in root directory.

3. Add ```PRIVATE_KEY=<private key>``` to ```.env```
  
4. Add ```SCOPE=<your unique scope>``` to ```.env```

5. Add ```APP_USERNAME=<username>``` and ```APP_PASSWORD=<password>``` to ```.env``` to set login and password (basic authentication is used)

6. Run the server using ```npm start```.

7. Go to http://localhost:5000 in your browser and enter the username and password you specified earlier.
