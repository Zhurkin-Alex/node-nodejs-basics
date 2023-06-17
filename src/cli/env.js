process.env.RSS__Test=1;
process.env.RSS__Test2=2;

const parseEnv = () => {
  const envVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(envVars);
};

parseEnv();