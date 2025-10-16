// Run this script to find all axios calls that need migration
// Usage: node find-axios-calls.js

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const results = [];

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      searchFiles(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Check for axios import
      const hasAxiosImport = content.includes('import axios from');
      
      if (hasAxiosImport) {
        const axioCalls = [];
        lines.forEach((line, index) => {
          if (line.includes('axios.get') || line.includes('axios.post') || 
              line.includes('axios.put') || line.includes('axios.delete')) {
            axioCalls.push({
              line: index + 1,
              code: line.trim()
            });
          }
        });
        
        if (axioCalls.length > 0) {
          results.push({
            file: filePath.replace(srcDir, 'src'),
            calls: axioCalls
          });
        }
      }
    }
  });
}

console.log('🔍 Searching for axios calls...\n');
searchFiles(srcDir);

console.log(`Found ${results.length} files with axios calls:\n`);
results.forEach(result => {
  console.log(`📄 ${result.file}`);
  result.calls.forEach(call => {
    console.log(`   Line ${call.line}: ${call.code.substring(0, 80)}${call.code.length > 80 ? '...' : ''}`);
  });
  console.log('');
});

console.log(`\n✅ Total files to migrate: ${results.length}`);
console.log('\n📖 See AXIOS_MIGRATION_GUIDE.md for migration instructions');
