// scripts/import-data.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection URL with proper options
const url = 'mongodb+srv://ammansoor0077_db_user:3DspE2LvHra285C3@cluster0.ywnqffv.mongodb.net/';
const dbName = 'christmas-cms';

async function importData() {
    try {
        // Read your JSON file
        const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data.json'), 'utf8'));

        // Connection options
        const client = new MongoClient(url, {
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });

        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('contents');

        // Prepare document with version
        const document = {
            version: 1,
            publishedAt: new Date(),
            data: jsonData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Clear existing data and insert new
        await collection.deleteMany({});
        const result = await collection.insertOne(document);

        console.log('✅ Data imported successfully!');
        console.log('Document ID:', result.insertedId);

        await client.close();
        console.log('Done!');

    } catch (error) {
        console.error('❌ Error importing data:', error);

        // More detailed error
        if (error.code === 'ECONNREFUSED') {
            console.log('\n🔴 Connection refused! This usually means:');
            console.log('1. Your IP is not whitelisted in MongoDB Atlas');
            console.log('2. Go to https://cloud.mongodb.com → Network Access → Add IP Address');
            console.log('3. Add 0.0.0.0/0 to allow all IPs');
            console.log('4. Wait 2-3 minutes and try again');
        }
    }
}

importData();