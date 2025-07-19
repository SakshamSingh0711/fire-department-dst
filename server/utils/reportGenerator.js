const generateDetailedReport = (doc, type, data) => {
  // Add cover page
  doc.addPage();
  doc.image('path/to/logo.png', 50, 50, { width: 100 });
  doc.fontSize(24).text('Fire Department Official Report', 50, 180, { align: 'center' });
  doc.fontSize(18).text(type.toUpperCase(), 50, 220, { align: 'center' });
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 260, { align: 'center' });

  // Add table of contents
  doc.addPage();
  doc.fontSize(16).text('Table of Contents', { underline: true });
  doc.moveDown();
  // Add TOC items based on report type

  // Add detailed content pages
  switch (type) {
    case 'personnel':
      generatePersonnelDetails(doc, data);
      break;
    case 'files':
      generateFileDetails(doc, data);
      break;
    // Add other report types
  }

  // Add footer to each page
  let footer = (page, pages) => {
    doc.fontSize(10).text(
      `Page ${page} of ${pages}`,
      50,
      doc.page.height - 30,
      { align: 'center' }
    );
  };

  doc.on('pageAdded', () => {
    footer(doc.page.number, doc.page.count);
  });
};

const generatePersonnelDetails = (doc, personnel) => {
  doc.addPage();
  doc.fontSize(16).text('Personnel Details', { underline: true });
  
  personnel.forEach((person, index) => {
    if (index > 0 && index % 5 === 0) {
      doc.addPage(); // New page every 5 personnel
    }
    
    doc.fontSize(12).text(`${person.name} (${person.rank})`, { continued: true });
    doc.text(` | Age: ${person.age}`, { align: 'right' });
    doc.fontSize(10).text(`Branch: ${person.currentBranch?.name || 'N/A'}`);
    doc.moveDown();
  });
};