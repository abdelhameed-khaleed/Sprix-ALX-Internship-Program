# Career Circle form → Google Sheet

The form at `/career-circle` posts to `/api/career-circle`, which forwards each response to a Google Apps Script web app that appends a row to the sheet.

1. Open the Google Sheet → Extensions → Apps Script, paste:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([
    new Date(), d.firstName, d.lastName, d.email, d.whatsapp, d.preferences, d.otherCareer,
  ]);
  return ContentService.createTextOutput("ok");
}
```

2. Row 1 headers: Timestamp, First name, Last name, Email, WhatsApp, Preferences, Other career.
3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone. Copy the web app URL.
4. Set `CAREER_CIRCLE_WEBHOOK_URL` to that URL in the hosting environment (and `.env.local` for local dev), then redeploy.
