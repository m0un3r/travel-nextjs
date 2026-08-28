const fs = require('fs');
const path = require('path');

const fontDir = path.join(__dirname, '../../cloned_site/assets/fonts');
if (fs.existsSync(fontDir)) {
  const files = fs.readdirSync(fontDir);
  console.log(`Total font files: ${files.length}`);
} else {
  console.log('No fontDir found');
}
