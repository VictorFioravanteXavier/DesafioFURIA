const { marked } = require('marked');

function convertMarkdownToHtml(markdownText) {
  return marked(markdownText);
}

module.exports = convertMarkdownToHtml