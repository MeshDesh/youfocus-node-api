import app from './app';
import configEnv from './config';

const PORT = configEnv.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
