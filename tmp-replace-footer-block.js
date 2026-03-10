const fs = require('fs');
const path = require('path');

const footerPath = path.join('app', 'components', 'Footer.jsx');
const blockPath = path.join('new-footer-block.txt');

const text = fs.readFileSync(footerPath, 'utf8');
const blockText = fs.readFileSync(blockPath, 'utf8');

const startMarker = "      {/* Main Container - Responsive padding from 300px up */}";
const endMarker = "\n\n      <style jsx>{";

const startIndex = text.indexOf(startMarker);
const endIndex = text.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  throw new Error('Markers not found.');
}

const before = text.slice(0, startIndex);
const after = text.slice(endIndex);
const newText = before + blockText + after;
fs.writeFileSync(footerPath, newText, 'utf8');
