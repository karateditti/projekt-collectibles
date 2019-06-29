const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    compilers: {
        solc: {
            version: "^0.5.0", // A version or constraint - Ex. "^0.5.0"
                // Can also be set to "native" to use a native solc
                    settings: {
                        optimizer: {
                        enabled: true,
                        runs: 200   // Optimize for how many times you intend to run the code
                        }
            }
        }
        },
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
   networks: {
     development: {
       host: "localhost",
       port: 7545,
       network_id: "5777",
	gas:99999999999

     }
   }

};
