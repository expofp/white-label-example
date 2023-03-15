# white-label-example

https://white-label-example.herokuapp.com/ - See an example on a live server

https://white-label-example.herokuapp.com/designer - Designer, to edit your plans

https://white-label-example.herokuapp.com/sendData - Here you can insert a json object, to create/update the data.js file

# Usage
The version of ```Node.js``` must be at least ```18.0.0```

The code in this example demonstrates how to use the ```signWithScopeSecret``` https://github.com/expofp/white-label-example/blob/master/src/crypto.js#L3 function to create a signature that can be used to authenticate with a service. The signature is created using a private key obtained from the service.

To use your example based on this, you need to:

1. Get the ```private key``` and your unique ```scope``` from ```ExpoFP```.

2. Create ```.env``` file in root directory.

3. Add ```PRIVATE_KEY=<private key>``` to ```.env```
  
4. Add ```SCOPE=<your unique scope>``` to ```.env```

4. Run the server using ```npm start```.

5. Navigate to http://localhost:5000 in your browser to see the result.
