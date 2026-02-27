// scripts/import-to-supabase.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://zubfjhpxqhjlomxtxsmn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YmZqaHB4cWhqbG9teHR4c21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzQzNzgsImV4cCI6MjA4Nzc1MDM3OH0.Iztk5wohzcwpgydoa6c0Ap3WTDM8cqqSqbAszQW9Y9w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importData() {
  try {
    console.log('📁 Reading data.json...');
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data.json'), 'utf8'));
    console.log('✅ JSON loaded');
    
    const content = {
      version: 1,
      data: jsonData,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    console.log('📤 Inserting into Supabase...');
    const { data, error } = await supabase
      .from('content')
      .insert([content])
      .select();
    
    if (error) throw error;
    
    console.log('✅ Data imported successfully!');
    console.log('Imported ID:', data[0].id);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

importData();