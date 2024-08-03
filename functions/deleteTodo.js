const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const { id } = event.queryStringParameters;
    await db.collection('todos').doc(id).delete();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'To-do deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to delete to-do' }),
    };
  }
};
