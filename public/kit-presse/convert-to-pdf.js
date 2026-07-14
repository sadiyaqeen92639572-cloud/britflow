#!/usr/bin/env node

/**
 * Convert Press Kit Markdown Files to PDF
 * Requires: markdown-pdf or similar package
 *
 * Usage:
 *   npm install -g markdown-pdf
 *   node convert-to-pdf.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const files = [
  'DOSSIER_PRESSE.md',
  'FICHES_TECHNIQUES.md',
  'INFOS_GRAPHIQUES.md',
  'CODE_INTEGRATION.md',
  'CONTACTS.md'
];

console.log('📄 Converting Press Kit Markdown to PDF...\n');

// Check if markdown-pdf is installed
const checkMarkdownPdf = () => {
  return new Promise((resolve, reject) => {
    exec('which markdown-pdf || which md-to-pdf', (error, stdout, stderr) => {
      if (error) {
        reject(new Error('PDF converter not found'));
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Convert single file using pandoc
const convertWithPandoc = (inputFile, outputFile) => {
  return new Promise((resolve, reject) => {
    const cmd = `pandoc "${inputFile}" -o "${outputFile}" --pdf-engine=xelatex -V mainfont="DejaVu Sans" --toc`;

    exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Convert using markdown-pdf (Node.js package)
const convertWithMarkdownPdf = (inputFile, outputFile) => {
  return new Promise((resolve, reject) => {
    const MarkdownPdf = require('markdown-pdf');
    const mdPath = path.join(__dirname, inputFile);
    const pdfPath = path.join(__dirname, outputFile);

    new MarkdownPdf()
      .from(mdPath)
      .to(pdfPath, () => {
        if (fs.existsSync(pdfPath)) {
          resolve();
        } else {
          reject(new Error(`Failed to create ${outputFile}`));
        }
      });
  });
};

// Main conversion function
const convertFiles = async () => {
  try {
    // Try to use pandoc first
    await checkMarkdownPdf();
    console.log('✅ Found pandoc - using it for conversion\n');

    for (const file of files) {
      const inputFile = path.join(__dirname, file);
      const outputFile = path.join(__dirname, file.replace('.md', '.pdf'));

      if (!fs.existsSync(inputFile)) {
        console.log(`⚠️  Skipping ${file} (not found)`);
        continue;
      }

      process.stdout.write(`Converting ${file}... `);

      try {
        await convertWithPandoc(inputFile, outputFile);
        console.log('✅');
      } catch (err) {
        // Try markdown-pdf as fallback
        try {
          await convertWithMarkdownPdf(file, file.replace('.md', '.pdf'));
          console.log('✅ (via markdown-pdf)');
        } catch (err2) {
          console.log('❌');
          console.error(`Error: ${err2.message}`);
        }
      }
    }

    console.log('\n✨ Conversion complete!');
    console.log('\n📁 PDF files location:');
    files.forEach(f => {
      const pdfFile = f.replace('.md', '.pdf');
      console.log(`   - ${path.join(__dirname, pdfFile)}`);
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n📋 To install required tools, run:');
    console.log('   Option 1 (pandoc - recommended):');
    console.log('     sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended');
    console.log('   Option 2 (Node.js):');
    console.log('     npm install -g markdown-pdf');
  }
};

convertFiles();
