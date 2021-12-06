const router = require('express').Router();

const serverResponse = async (_, response) => {
  setTimeout(() => {
    response.json({ response: 'Hello from backend after 5 seconds' });
  }, 5000);
  // response.send('Hello from backend');
  // response.status(404).send('backend says no');
};

router.get('/', serverResponse);

module.exports = router;