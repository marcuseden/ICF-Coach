const fs = require('fs');
const path = require('path');
const https = require('https');

// All the active DALL-E URLs from the generation output
const ACTIVE_IMAGES = [
  {
    name: 'voice-coach',
    path: 'public/images/features/voice-coach.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-5pPxufD2Db01njGkSl5ipc2n.png?st=2025-10-30T18%3A16%3A38Z&se=2025-10-30T20%3A16%3A38Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T19%3A16%3A38Z&ske=2025-10-31T19%3A16%3A38Z&sks=b&skv=2024-08-04&sig=4C/ZiAzP8CJfPkGHRh7dWA7TJAJV1a5G9kfJBD7WR0Q%3D'
  },
  {
    name: 'video-session',
    path: 'public/images/features/video-session.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-N92KznmVUshoWvY7IfuAocrl.png?st=2025-10-30T18%3A17%3A00Z&se=2025-10-30T20%3A17%3A00Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-29T23%3A27%3A19Z&ske=2025-10-30T23%3A27%3A19Z&sks=b&skv=2024-08-04&sig=gWVD9m1Q9/tzoIIp5NTHW4PQz7fNJAT9l2mwPqu9qKo%3D'
  },
  {
    name: 'calendar',
    path: 'public/images/features/calendar.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-JWufx3OBg24gDLxc9uESDl53.png?st=2025-10-30T18%3A17%3A22Z&se=2025-10-30T20%3A17%3A22Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T18%3A56%3A42Z&ske=2025-10-31T18%3A56%3A42Z&sks=b&skv=2024-08-04&sig=mASXMPPCdxp6T9bh4aheXsrxQ5pvIizkNNu%2BrvcmDNg%3D'
  },
  {
    name: 'progress-tracking',
    path: 'public/images/features/progress-tracking.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-jCSiYHghcT1MVsndmGZsTeyh.png?st=2025-10-30T18%3A17%3A50Z&se=2025-10-30T20%3A17%3A50Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T13%3A01%3A52Z&ske=2025-10-31T13%3A01%3A52Z&sks=b&skv=2024-08-04&sig=KQA7oQ4MmPogfJXz66HcTgeSwwAAy3aNOS3v9%2BJ05rM%3D'
  },
  {
    name: 'growth-insights',
    path: 'public/images/features/growth-insights.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-SM3odHtleivhq12ghgRi9yIM.png?st=2025-10-30T18%3A18%3A10Z&se=2025-10-30T20%3A18%3A10Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-29T23%3A36%3A18Z&ske=2025-10-30T23%3A36%3A18Z&sks=b&skv=2024-08-04&sig=eIXEpOThtK2krgk/NDVzJ2deJVAb3eys8amAk0LGOyE%3D'
  },
  {
    name: 'icf-certified',
    path: 'public/images/features/icf-certified.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-UAj4A09ndrTEvcMuUoTIX0vf.png?st=2025-10-30T18%3A18%3A32Z&se=2025-10-30T20%3A18%3A32Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T18%3A31%3A41Z&ske=2025-10-31T18%3A31%3A41Z&sks=b&skv=2024-08-04&sig=m2BHsp4Yk3d5uVvnNvvqJi0wuwMBQAVsLcPngUZX5UE%3D'
  },
  {
    name: 'coach-female-1',
    path: 'public/images/coaches/coach-female-1.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-UsI2CL0hPoyB8IkmIN8LppDm.png?st=2025-10-30T18%3A18%3A53Z&se=2025-10-30T20%3A18%3A53Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T14%3A56%3A01Z&ske=2025-10-31T14%3A56%3A01Z&sks=b&skv=2024-08-04&sig=0l7IxcQk8FZWLfEOR1pCCGu4A5ueuEHS9Bfl4mJbvfY%3D'
  },
  {
    name: 'coach-male-1',
    path: 'public/images/coaches/coach-male-1.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-3YyvrUiRFHMyKcNMIcYmcDE7.png?st=2025-10-30T18%3A19%3A14Z&se=2025-10-30T20%3A19%3A14Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=b1a0ae1f-618f-4548-84fd-8b16cacd5485&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T15%3A48%3A24Z&ske=2025-10-31T15%3A48%3A24Z&sks=b&skv=2024-08-04&sig=EMHIosjBytesLz2VM5kfvAiOLdoEyn3UeaxDcfQt6UE%3D'
  },
  {
    name: 'coach-female-2',
    path: 'public/images/coaches/coach-female-2.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-LlRQu9atszeJsm4xlGMjPMtP.png?st=2025-10-30T18%3A19%3A35Z&se=2025-10-30T20%3A19%3A35Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-29T20%3A05%3A41Z&ske=2025-10-30T20%3A05%3A41Z&sks=b&skv=2024-08-04&sig=cA8SMZkFCS%2BUKvYwexGQpfo44gCsiBC9JN0mNaqYfQA%3D'
  },
  {
    name: 'coach-male-2',
    path: 'public/images/coaches/coach-male-2.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-bv1xmjDTF2zWuYfPYZryoMK7.png?st=2025-10-30T18%3A19%3A56Z&se=2025-10-30T20%3A19%3A56Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=ed3ea2f9-5e38-44be-9a1b-7c1e65e4d54f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T17%3A56%3A45Z&ske=2025-10-31T17%3A56%3A45Z&sks=b&skv=2024-08-04&sig=20lhhCBJ/W%2BjDkeazTsxgX0FNKBexe750mxTTwyMVrQ%3D'
  },
  {
    name: 'reading-1',
    path: 'public/images/reading/reading-1.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-79ytx3770kE34RriICHpeWP8.png?st=2025-10-30T18%3A20%3A15Z&se=2025-10-30T20%3A20%3A15Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T19%3A05%3A48Z&ske=2025-10-31T19%3A05%3A48Z&sks=b&skv=2024-08-04&sig=EksltK0RltVlRPWGVwDCqI16/hyFHLimBNqa0WOrYUM%3D'
  },
  {
    name: 'reading-3',
    path: 'public/images/reading/reading-3.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-upV43TdmDkD5Ypvq0uqnLoAM.png?st=2025-10-30T18%3A20%3A58Z&se=2025-10-30T20%3A20%3A58Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T19%3A20%3A58Z&ske=2025-10-31T19%3A20%3A58Z&sks=b&skv=2024-08-04&sig=xIjeTYSZuMYR1T07ZdcLBfxIcE%2Bnq//b5Ms6XkNuTEM%3D'
  },
  {
    name: 'reading-4',
    path: 'public/images/reading/reading-4.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-qQvFBttHvI0YmMLacA6GLXDt.png?st=2025-10-30T18%3A21%3A18Z&se=2025-10-30T20%3A21%3A18Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T18%3A31%3A12Z&ske=2025-10-31T18%3A31%3A12Z&sks=b&skv=2024-08-04&sig=7SyrfWRZpTOyLlnz4Y56Kmo2xpnWAP7ZJ%2BCKJ5wGnCM%3D'
  },
  {
    name: 'oura-ring',
    path: 'public/images/wearables/oura-ring.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-yHO1FvKuAWdxOKCv5N0zcsE3.png?st=2025-10-30T18%3A22%3A02Z&se=2025-10-30T20%3A22%3A02Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=f1dafa11-a0c2-4092-91d4-10981fbda051&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T18%3A43%3A03Z&ske=2025-10-31T18%3A43%3A03Z&sks=b&skv=2024-08-04&sig=y1GJZ04u8RrOQQltps5wj697D4ybFP6edwhRp7Bo4QU%3D'
  },
  {
    name: 'whoop-band',
    path: 'public/images/wearables/whoop-band.jpg',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-f9Em0rNqAYCCGj3R3Vme71nJ/user-dFWLjafRmCzW4LrOX7mbPBRO/img-5zvYXtdIxB2fuulm5OSFluSA.png?st=2025-10-30T18%3A22%3A22Z&se=2025-10-30T20%3A22%3A22Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-30T17%3A04%3A23Z&ske=2025-10-31T17%3A04%3A23Z&sks=b&skv=2024-08-04&sig=1PdNqm1W5Q17Cg4vlh14JTTK0fX%2BQXULLfl1zj3nwq0%3D'
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('📥 Downloading all active DALL-E images...');
  console.log(`📊 Total images: ${ACTIVE_IMAGES.length}\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const image of ACTIVE_IMAGES) {
    try {
      console.log(`⬇️  Downloading: ${image.name}...`);
      
      const filepath = path.join(__dirname, '..', image.path);
      await downloadImage(image.url, filepath);
      
      console.log(`✅ Saved: ${image.path}`);
      successCount++;
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`❌ Failed: ${image.name} - ${error.message}`);
      failCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📈 DOWNLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully downloaded: ${successCount}/${ACTIVE_IMAGES.length}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(60) + '\n');
  console.log('🎉 All downloads complete!');
}

downloadAllImages().catch(console.error);

