const fs = require('fs');
const path = require('path');

const footerPath = path.join('app', 'components', 'Footer.jsx');
const blockPath = path.join('new-footer-block.txt');
const text = fs.readFileSync(footerPath, 'utf8');
const blockText = fs.readFileSync(blockPath, 'utf8');

const startMarker = "      {/* Main Container - Responsive padding from 300px up */}";
const endMarker = "      <style jsx>{";

const startIdx = text.indexOf(startMarker);
const endIdx = text.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  throw new Error('Markers not found');
}

const before = text.slice(0, startIdx);
const after = text.slice(endIdx);
const newText = before + blockText + after;
fs.writeFileSync(footerPath, newText, 'utf8');
