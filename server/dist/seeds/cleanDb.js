import models from '../models/index.js';
import db from '../config/connection.js';

/**
 * Drop a collection if it exists in the database.
 * @param {keyof typeof models} modelName - The name of the model to use.
 * @param {string} collectionName - The collection name to drop.
 * @returns {Promise<void>}
 */
export default async function cleanCollection(modelName, collectionName) {
  const model = models[modelName];

  if (!model) {
    throw new Error(`Model '${modelName}' not found.`);
  }

  if (!model.db || !model.db.db) {
    throw new Error(`Model '${modelName}' does not have a valid db connection.`);
  }

  const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

  if (collections.length > 0) {
    await db.dropCollection(collectionName);
  }
}
