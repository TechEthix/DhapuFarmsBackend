const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const fixIndexes = async () => {
  try {
    // Try to connect to the configured DB, fallback to test if that's what's happening
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/dhapufarms';
    console.log(`Connecting to: ${uri}`);
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    const collection = mongoose.connection.collection('products');
    
    // List indexes
    try {
        const indexes = await collection.indexes();
        console.log('Existing indexes:', indexes.map(i => i.name));
        
        // Drop slug_1 if exists
        if (indexes.find(i => i.name === 'slug_1')) {
          console.log('Found problematic index "slug_1". Dropping it...');
          await collection.dropIndex('slug_1');
          console.log('Successfully dropped "slug_1" index.');
        } else {
          console.log('Index "slug_1" not found in this DB.');
        }
    } catch (err) {
        console.log("Could not list indexes (collection might not exist yet):", err.message);
    }

    // If the error mentioned 'test.products', we should also check the 'test' database just in case
    if (!uri.includes('/test')) {
        console.log('Checking "test" database as well due to error message...');
        const testConn = mongoose.createConnection('mongodb://localhost:27017/test');
        const testColl = testConn.collection('products');
        try {
            const testIndexes = await testColl.indexes();
            if (testIndexes.find(i => i.name === 'slug_1')) {
                console.log('Found "slug_1" in "test" database. Dropping...');
                await testColl.dropIndex('slug_1');
                console.log('Dropped "slug_1" from "test" database.');
            }
        } catch (e) {
            // Ignore if test db/collection doesn't exist
        }
    }

    console.log('Done.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

fixIndexes();
