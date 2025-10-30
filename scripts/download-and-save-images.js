#!/usr/bin/env node

/**
 * Download and Save External Images
 * 
 * This script:
 * 1. Scans code for external image URLs
 * 2. Downloads each image
 * 3. Saves to public/images/
 * 4. Creates a manifest file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Create images directory
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const subdirs = ['hero', 'features', 'wearables'];

console.log('🖼️  Setting up image directories...\n');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

subdirs.forEach(subdir => {
  const dir = path.join(imagesDir, subdir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Image URLs to download (extracted from your code)
const imagesToDownload = [
  {
    name: 'voice-coach',
    category: 'features',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-Yd8IVR9RU9JrE3kNUW6EboTW.png?st=2025-10-30T15%3A52%3A13Z&se=2025-10-30T17%3A52%3A13Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T16%3A52%3A13Z&ske=2025-10-31T16%3A52%3A13Z&sks=b&skv=2024-08-04&sig=sPfxRhug7FG2xZkG%2BB7VJk8cc0aw5%2ByKUrk24Epupfs%3D'
  },
  {
    name: 'video-session',
    category: 'features',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-dMIHmBfhRtYLfCoZLpukfRre.png?st=2025-10-30T15%3A51%3A47Z&se=2025-10-30T17%3A51%3A47Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T16%3A10%3A05Z&ske=2025-10-31T16%3A10%3A05Z&sks=b&skv=2024-08-04&sig=SUL%2BsJPg8M2SyHDqagQaDd3PO6L1SoPGhiN58XX5OEY%3D'
  },
  {
    name: 'calendar',
    category: 'features',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-KRB8oyIQuSNPbQEI9Py1HlI9.png?st=2025-10-30T15%3A51%3A23Z&se=2025-10-30T17%3A51%3A23Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T12%3A29%3A58Z&ske=2025-10-31T12%3A29%3A58Z&sks=b&skv=2024-08-04&sig=G/Oi9URkPM1Xe4Z0H53NKbDIeyZfiSorRggk6o6IJHA%3D'
  },
  {
    name: 'tracking',
    category: 'features',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-1BVi2QMNPaZE1W2Z5tq7sSQB.png?st=2025-10-30T15%3A52%3A39Z&se=2025-10-30T17%3A52%3A39Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T12%3A43%3A18Z&ske=2025-10-31T12%3A43%3A18Z&sks=b&skv=2024-08-04&sig=lR1Y0O2SulIj2vCbqlo0r7TVRmzaR3nZQfjXCbG0Lj0%3D'
  },
  {
    name: 'icf-certified',
    category: 'features',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-uAmT3fnYFoNpdmkm7MVMqIck.png?st=2025-10-30T15%3A53%3A06Z&se=2025-10-30T17%3A53%3A06Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T05%3A00%3A28Z&ske=2025-10-31T05%3A00%3A28Z&sks=b&skv=2024-08-04&sig=UTQ9CRXzQxQsj0z0qjFHWYoQHh38AumSPG%2BAIZZR50c%3D'
  },
  {
    name: 'apple-watch',
    category: 'wearables',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-HQ8IqO1Qll7lkJqV7EuSvhi9.png?st=2025-10-30T16%3A02%3A04Z&se=2025-10-30T18%3A02%3A04Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T17%3A02%3A04Z&ske=2025-10-31T17%3A02%3A04Z&sks=b&skv=2024-08-04&sig=8iqjqNy1Y8bV6/W3cwzjfkm29ES%2BK0k/Gj5r%2BmcT7tI%3D'
  },
  {
    name: 'oura-ring',
    category: 'wearables',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-HNLp38xMQsi0yosU0pGt5VCA.png?st=2025-10-30T16%3A02%3A26Z&se=2025-10-30T18%3A02%3A26Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T17%3A02%3A26Z&ske=2025-10-31T17%3A02%3A26Z&sks=b&skv=2024-08-04&sig=S9%2BWOQeNSrDHKQKMoH3KOdwnIm3SYzZuqPLV/Yl/VbA%3D'
  },
  {
    name: 'whoop',
    category: 'wearables',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-L08Foa9oBq75gwK2KVj3Swgx.png?st=2025-10-30T16%3A02%3A46Z&se=2025-10-30T18%3A02%3A46Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T14%3A12%3A18Z&ske=2025-10-31T14%3A12%3A18Z&sks=b&skv=2024-08-04&sig=/MLu5P/hyD7M6eL61yDW3%2BoRk1SZXeQYsf3JicRWu3w%3D'
  }
];

// Download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Main function
async function main() {
  console.log('📥 Starting image downloads...\n');
  
  const manifest = [];
  let successCount = 0;
  let failCount = 0;
  
  for (const image of imagesToDownload) {
    const filename = `${image.name}.png`;
    const filepath = path.join(imagesDir, image.category, filename);
    const publicPath = `/images/${image.category}/${filename}`;
    
    try {
      process.stdout.write(`   Downloading ${image.name}... `);
      await downloadImage(image.url, filepath);
      console.log('✅');
      
      manifest.push({
        name: image.name,
        category: image.category,
        path: publicPath,
        filename: filename
      });
      
      successCount++;
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
      failCount++;
    }
  }
  
  // Save manifest
  const manifestPath = path.join(imagesDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully downloaded: ${successCount} images`);
  console.log(`❌ Failed: ${failCount} images`);
  console.log(`📄 Manifest saved to: ${manifestPath}`);
  console.log('='.repeat(60));
  
  console.log('\n📝 Next steps:');
  console.log('1. Update image references in your code');
  console.log('2. Replace external URLs with: /images/[category]/[filename]');
  console.log('3. Commit images to git: git add public/images/');
  console.log('4. Deploy to Vercel\n');
}

main().catch(console.error);

