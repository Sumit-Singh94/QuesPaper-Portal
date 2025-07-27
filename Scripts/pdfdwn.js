import axios from 'axios';
import { load } from 'cheerio';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join, basename, dirname } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

// 🛠 Enable __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 📁 Setup download folder
const OUTPUT_DIR = join(__dirname, 'makaut_downloads');
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR);
}

// ⌨️ Ask user for course URL
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForUrl() {
  return new Promise((resolve) => {
    rl.question('📥 Enter the MAKAUT course page URL: ', (url) => {
      rl.close();
      resolve(url.trim());
    });
  });
}

// 🌐 Fetch HTML of a page
async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return load(data);
}

// 🔗 Extract all paper page links (e.g., /papers/*.html)
async function getPaperLinks(coursePageUrl) {
  const $ = await fetchHTML(coursePageUrl);
  const links = [];

  $('a').each((_, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('papers/') && href.endsWith('.html')) {
      const fullUrl = new URL(href, coursePageUrl).href;
      links.push(fullUrl);
    }
  });

  return [...new Set(links)]; // Remove duplicates
}

// 📎 Extract direct .pdf URL from a paper detail page
async function extractPDFUrl(paperPageUrl) {
  try {
    const $ = await fetchHTML(paperPageUrl);
    const iframe = $('iframe, embed').first();
    const src = iframe.attr('src');

    if (src && src.includes('.pdf')) {
      return new URL(src, paperPageUrl).href;
    }

    const pdfLink = $('a')
      .map((_, el) => $(el).attr('href'))
      .get()
      .find((href) => href && href.endsWith('.pdf'));

    return pdfLink ? new URL(pdfLink, paperPageUrl).href : null;
  } catch (err) {
    console.error('❌ Failed to extract PDF from:', paperPageUrl);
    return null;
  }
}

// 💾 Download PDF file and save to disk
async function downloadPDF(pdfUrl) {
  const filename = basename(pdfUrl.split('?')[0]);
  const filePath = join(OUTPUT_DIR, filename);

  const writer = createWriteStream(filePath);
  const response = await axios({
    url: pdfUrl,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      console.log('✅ Downloaded:', filename);
      resolve();
    });
    writer.on('error', reject);
  });
}

// 🚀 Main runner
(async () => {
  const coursePageUrl = await askForUrl();
  console.log(`🔍 Scanning page: ${coursePageUrl}`);

  const paperLinks = await getPaperLinks(coursePageUrl);
  console.log(`📄 Found ${paperLinks.length} paper pages.`);

  for (const link of paperLinks) {
    console.log('➡️  Opening:', link);
    const pdfUrl = await extractPDFUrl(link);
    if (pdfUrl) {
      await downloadPDF(pdfUrl);
    } else {
      console.warn('⚠️  No PDF found in:', link);
    }
  }

  console.log('\n✅ All downloads complete.');
})();
