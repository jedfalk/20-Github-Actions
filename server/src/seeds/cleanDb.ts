import models from '../models/index.js';
import db from '../config/connection.js';

export default async function cleanCollection(
  modelName: keyof typeof models,
  collectionName: string
): Promise<void> {
  try {
    const model = models[modelName];
    if (!model?.db?.db) {
      throw new Error(`Model ${modelName} does not have a database connection.`);
    }

    const modelExists = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length > 0) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
