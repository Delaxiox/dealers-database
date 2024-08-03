const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const { task } = JSON.parse(event.body);
    await db.collection('todos').add({ task });
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'To-do added successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add to-do' }),
    };
  }
};
