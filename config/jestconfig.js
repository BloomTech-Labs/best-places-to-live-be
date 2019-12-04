module.exports = {
    // preset: 'ts-jest', // use this if you are using TypeScript
    globalSetup: './jest.global-setup.js', // optional: will be called once before all tests are executed
    // globalTeardown: './jest.global-teardown.js' // optional: will be called once after all tests are executed
   };



module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest'
      },
      binary: {
        version: '4.0.3',
        skipMD5: true
      },
      autoStart: false
    }
  };