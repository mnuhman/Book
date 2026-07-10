# Book Fair Catalogue — Step‑by‑Step Setup Guide

This guide walks you through setting up the complete Book Fair Catalogue web app using **Google Sheets + Google Apps Script**.

---

## Step 1: Create the Google Sheet

1. Go to **[sheets.google.com](https://sheets.google.com)** and click the **+ Blank** button.
2. Rename the spreadsheet to `Books` (or any name you prefer).
3. Rename the **sheet tab** (bottom-left) from "Sheet1" to **`Books`**.

---

## Step 2: Add the Column Headers

In the **first row** of the `Books` sheet, enter these **exact** headers (each in its own column, A through K):

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Book Name | Author | Category | Publisher | Language | Price | Discount Price | Stall No | Shelf No | Available | Cover Image |

> **⚠️ Important:** The headers must match EXACTLY (spelling, spaces, capitalisation) or the script will not work. Double-check each one.

Example first row:

```
Book Name  |  Author  |  Category  |  Publisher  |  Language  |  Price  |  Discount Price  |  Stall No  |  Shelf No  |  Available  |  Cover Image
```

---

## Step 3: Add Some Sample Books

Starting from **row 2**, add your books. Example:

| Book Name | Author | Category | Publisher | Language | Price | Discount Price | Stall No | Shelf No | Available | Cover Image |
|---|---|---|---|---|---|---|---|---|---|---|
| Heidi | Johanna Spyri | Children | Puffin | English | ₹190 | ₹150 | 5 | A1 | Yes | |
| പ്രകൃതിയുടെ പ്രവാചകൻ | John Doe | Islamic | IPH | Malayalam | ₹130 | | 3 | B2 | Yes | |
| Oliver Twist | Charles Dickens | Classic | Penguin | English | ₹210 | ₹180 | 7 | C4 | No | |

> **Notes:**
> - Leave `Cover Image` empty for the placeholder to appear.
> - Leave `Discount Price` empty to show only the original price.
> - Set `Available` to `No` to show "Out of Stock".
> - You can use direct image URLs (e.g. `https://example.com/cover.jpg`) in the Cover Image column.

---

## Step 4: Copy the Spreadsheet ID

1. Look at the URL in your browser. It looks like:
   ```
   https://docs.google.com/spreadsheets/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890/edit
   ```
2. Copy the long string between `/d/` and `/edit`. That is your **Spreadsheet ID**.
3. Save this ID — you will need it in Step 6.

---

## Step 5: Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**.
2. A new browser tab opens with the Apps Script editor.
3. Rename the project from "Untitled project" to **`Book Fair Catalogue`** (click the title at the top-left).

---

## Step 6: Add Code.gs

1. In the Apps Script editor, you will see a file called `Code.gs` with an empty `myFunction()` — **delete all its contents**.
2. Open the [`Code.gs`](./Code.gs) file from this folder.
3. Copy its **entire contents**.
4. Paste it into the Apps Script editor, replacing everything.
5. **🔴 IMPORTANT:** Find this line near the top:
   ```javascript
   var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
   Replace `YOUR_SPREADSHEET_ID_HERE` with the **Spreadsheet ID** you copied in Step 4.
   Example:
   ```javascript
   var SPREADSHEET_ID = '1aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890';
   ```
6. Click the save icon 💾 or press `Ctrl+S` / `Cmd+S`.

---

## Step 7: Add Index.html

1. In the Apps Script editor, next to **Files**, click the **＋** (plus) button.
2. Choose **HTML**.
3. Name it **`Index`** (exactly this — no `.html` extension; Apps Script adds it automatically).
4. Open the [`Index.html`](./Index.html) file from this folder.
5. Copy its **entire contents**.
6. Paste it into the new `Index.html` file, replacing everything.
7. Save (`Ctrl+S` / `Cmd+S`).

Your file list should now show:
```
📄 Code.gs
📄 Index.html
```

---

## Step 8: Deploy as Web App

1. In the Apps Script editor, click **Deploy → New deployment** (top-right, blue button).
2. Click the gear ⚙️ icon next to "Select type" and choose **Web app**.
3. Fill in the fields:

   | Field | Value |
   |---|---|
   | Description | `Book Fair Catalogue v1` |
   | Execute as | **Me** (your email) |
   | Who has access | **Anyone** |

4. Click **Deploy**.
5. A pop-up titled "Authorize access" appears. Click **Authorize access**.
6. Choose your Google account. You may see a "Google hasn't verified this app" warning — this is normal. Click **Advanced → Go to Book Fair Catalogue (unsafe)**.
7. Click **Allow** on the permissions screen.
8. After authorization, you will see a **"Deployment ID"** and a **"Web app URL"**. Copy the Web app URL — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx...abc/exec
   ```

> **Test it:** Open the URL in your phone's browser. You should see your book catalogue!

---

## Step 9: Create a QR Code

1. Go to any free QR code generator (e.g. **[QR Code Monkey](https://www.qrcode-monkey.com/)** or **[qr-code-generator.com](https://www.qr-code-generator.com)**).
2. Paste your **Web App URL** into the URL field.
3. Click **Create QR Code**.
4. Download the QR code as a PNG or SVG.
5. Print it on a poster or flyer for your book fair.

Visitors scan the QR code → the catalogue opens instantly in their mobile browser. No login, no app installation.

---

## Step 10: Update the Catalogue via Google Sheets

To add, edit, or remove books:

1. Open your Google Sheet.
2. Make changes directly in the rows:
   - **Add a book:** Fill a new row with book data.
   - **Edit a book:** Change any cell (price, availability, cover image URL, etc.).
   - **Remove a book:** Delete the entire row.
3. The changes are **instant** — no need to redeploy. Refresh the catalogue page and the new data appears.

> **Tip:** You (or your team) can use the Google Sheets mobile app to update the catalogue on the go during the book fair!

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "Sheet not found" error | Make sure the sheet tab is named exactly `Books` (not "Sheet1" or anything else). |
| "Column not found" error | Check that your header row matches the exact names from Step 2. Look for extra spaces. |
| Web app shows Google login | Re-deploy and select **Anyone** under "Who has access" — NOT "Anyone with Google account". |
| Images not loading | Make sure the Cover Image URL is a direct image link (ends with .jpg, .png, etc.) and is publicly accessible. |
| Changes not appearing | Hard-refresh your browser (Ctrl+Shift+R on desktop; pull-to-refresh on mobile). |
| 500 Internal Server Error | Open Apps Script Editor → click **Run** on the `doGet` function to see the error in the logs. |

---

## Diagram: How It All Connects

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  Google Sheet   │◄────│  Apps Script     │────►│  Web App URL    │
│  ("Books")      │     │  Code.gs + HTML  │     │  (public)       │
│                 │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                                                   Visitor scans
                                                   QR code
                                                          │
                                                  ┌───────▼────────┐
                                                  │  Mobile Browser │
                                                  │  Book Catalogue │
                                                  └────────────────┘
```

---

## That's It! ✅

Your Book Fair Catalogue is live. Share the QR code or the Web App URL and visitors can browse your collection from their phones — no login, no installation.
