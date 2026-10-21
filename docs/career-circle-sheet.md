# Career Circle form → Google Sheet

The form at `/career-circle` posts to `/api/career-circle`, which forwards each response to a Google Apps Script web app that appends a row to the sheet.

1. Open the Google Sheet → Extensions → Apps Script, paste:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 5).setNumberFormat("@"); // keep the "+" in WhatsApp numbers
  sheet.getRange(row, 1, 1, 8).setValues([[
    new Date(), d.firstName, d.lastName, d.email, d.whatsapp,
    d.preference1, d.preference2, d.otherCareer,
  ]]);
  return ContentService.createTextOutput("ok");
}
```

2. Row 1 headers: Timestamp, First name, Last name, Email, WhatsApp, Preference 1, Preference 2, Other career.
3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone. Copy the web app URL.
4. After editing the script, use Deploy → Manage deployments → edit → New version so the same URL runs the new code.
5. Set `CAREER_CIRCLE_WEBHOOK_URL` to that URL in the hosting environment (and `.env.local` for local dev), then redeploy.
