const fs = require('fs');
const path = require('path');

const files = [
  'src/app/(pages)/(properties)/postproperty/page.tsx',
  'src/app/(pages)/(properties)/editproperty/page.tsx',
  'src/app/(pages)/(properties)/addproperties/page.tsx',
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix env variables
  content = content.replaceAll('`process.env.NEXT_PUBLIC_APP_URIgetvariables`', '`${process.env.NEXT_PUBLIC_APP_URI}/getvariables`');
  content = content.replaceAll('`process.env.NEXT_PUBLIC_APP_URIgetbuildings`', '`${process.env.NEXT_PUBLIC_APP_URI}/getbuildings`');
  content = content.replaceAll('`process.env.NEXT_PUBLIC_APP_URIaddproperties`', '`${process.env.NEXT_PUBLIC_APP_URI}/addproperties`');
  content = content.replaceAll('`process.env.NEXT_PUBLIC_APP_URIupdateproperty`', '`${process.env.NEXT_PUBLIC_APP_URI}/updateproperty`');
  content = content.replaceAll('`process.env.NEXT_PUBLIC_APP_URIgetspecificproperty`', '`${process.env.NEXT_PUBLIC_APP_URI}/getspecificproperty`');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed: ${file}`);
});

console.log('\n✨ All property form files updated!');
