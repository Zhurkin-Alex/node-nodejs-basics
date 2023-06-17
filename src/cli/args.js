const parseArgs = () => {
    const args = process.argv.slice(2);
    const parsedArgs = {};

    for (let i = 0; i < args.length; i += 2) {
      const argName = args[i].replace(/^--/, '');
      const argValue = args[i + 1];
      parsedArgs[argName] = argValue;
    }
    console.log(parsedArgs)
    for (const [argName, argValue] of Object.entries(parsedArgs)) {
      console.log(`${argName} is ${argValue}`);
    }
};
  
  parseArgs();
  