/**
 * Book Fair Catalogue - Google Apps Script Web App
 * Serves book data from the "Books" spreadsheet as JSON
 * and delivers the mobile-friendly catalogue HTML.
 */

// ============================================================
// Replace this with YOUR actual Spreadsheet ID
// Found in the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
// ============================================================
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

/**
 * doGet() - Entry point for the web app.
 * Returns the Index.html page when someone visits the URL.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Book Fair Catalogue')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

/**
 * getBooks() - Reads the "Books" sheet and returns all rows as JSON.
 * Called by the front-end JavaScript via google.script.run.
 */
function getBooks() {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName('Books');

    if (!sheet) {
      return { error: 'Sheet "Books" not found. Please create a sheet named "Books".' };
    }

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return []; // No data rows
    }

    // Get header row (row 1) and all data rows
    var range = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
    var values = range.getValues();

    var headers = values[0];

    // Build column index map for flexible column order
    var colMap = {};
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i].toString().trim();
      colMap[header] = i;
    }

    // Required columns - check they exist
    var requiredCols = ['Book Name', 'Author', 'Category', 'Publisher', 'Language', 'Price', 'Discount Price', 'Stall No', 'Shelf No', 'Available', 'Cover Image'];
    for (var c = 0; c < requiredCols.length; c++) {
      if (!(requiredCols[c] in colMap)) {
        return { error: 'Column "' + requiredCols[c] + '" not found in sheet. Please check your headers.' };
      }
    }

    // Build book objects from data rows
    var books = [];
    for (var r = 1; r < values.length; r++) {
      var row = values[r];

      // Skip completely empty rows
      var isEmpty = true;
      for (var j = 0; j < row.length; j++) {
        if (row[j] !== '' && row[j] !== null && row[j] !== undefined) {
          isEmpty = false;
          break;
        }
      }
      if (isEmpty) continue;

      var book = {
        bookName: getCellValue(row, colMap, 'Book Name'),
        author: getCellValue(row, colMap, 'Author'),
        category: getCellValue(row, colMap, 'Category'),
        publisher: getCellValue(row, colMap, 'Publisher'),
        language: getCellValue(row, colMap, 'Language'),
        price: getCellValue(row, colMap, 'Price'),
        discountPrice: getCellValue(row, colMap, 'Discount Price'),
        stallNo: getCellValue(row, colMap, 'Stall No'),
        shelfNo: getCellValue(row, colMap, 'Shelf No'),
        available: getCellValue(row, colMap, 'Available'),
        coverImage: getCellValue(row, colMap, 'Cover Image')
      };

      books.push(book);
    }

    return books;

  } catch (e) {
    return { error: 'Error reading spreadsheet: ' + e.toString() };
  }
}

/**
 * getCellValue() - Safely extracts a cell value from a row by column name.
 * Returns empty string if the value is null/undefined.
 */
function getCellValue(row, colMap, colName) {
  if (!(colName in colMap)) return '';
  var val = row[colMap[colName]];
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

/**
 * include() - Helper to include external HTML/CSS/JS files into the template.
 * Used inside Index.html: <?!= include('Stylesheet'); ?>
 * (Not mandatory but available for modularization.)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
