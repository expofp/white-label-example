# white-label-example
This code is an example of how to use a service that requires a signature for authentication.

The version of ```Node.js``` must be at least ```18.0.0```

Getting Started
To run this example, follow these steps:

1. Clone this repository.

2. Install the dependencies by running ```npm install```.

3. Start the server by running ```npm start```.

4. Navigate to http://localhost:5000 in your browser.

# Usage
The code in this example demonstrates how to use the ```signWithScopeSecret``` https://github.com/expofp/white-label-example/blob/master/src/crypto.js#L3 function to create a signature that can be used to authenticate with a service. The signature is created using a private key obtained from the service.

To use your example based on this, you need to:

1. Get the private key to https://white-label.herokuapp.com/api/generateKey/:scope, where ```:scope```, your unique scope to create expo.

2. Replace the privateKey variable in server.js with your private key.

3. Replace the scope variable with yours, with which you created the private key.

4. Run the server using ```npm start```.

5. Navigate to http://localhost:5000 in your browser to see the result.
