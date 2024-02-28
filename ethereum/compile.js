const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Path to build folder
const buildPath = path.resolve(__dirname, 'build');

// Remove build folder
fs.removeSync(buildPath);

// Path to contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

// Read contract
const source = fs.readFileSync(campaignPath, 'utf8');

// Compile contract
const output = solc.compile(source, 1).contracts;

// Create build folder
fs.ensureDirSync(buildPath);

// Write output to build folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
