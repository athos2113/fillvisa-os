# Fillvisa form builder

Open `index.html` through the existing local web server. The builder is self-contained in this directory and uses the existing Fillvisa styles and icons.

- `index.html`: introduction and forms saved in this browser.
- `editor.html`: create a form, or resume one with `?id=<form-id>`.
- `live.html?id=<form-id>`: fill the last published version.

The editor supports headings, short/long text, email, phone, number, date, dropdown, single choice, and checkboxes. Click or drag from the palette; reorder in the element list or preview. Arrow buttons support keyboard/touch reordering. Fields have editable labels, descriptions, placeholders, choices, and required flags. Stable field IDs survive label edits and reordering. Duplicate creates a new ID. Deleted elements can be restored with Undo delete until the editor is closed.

## Persistence

New forms and edits live in memory until **Save draft** or **Publish**. Navigation with unsaved changes triggers the browser's leave-page warning.

`buildConfig-<form-id>` stores a record with `draft`, `published`, `savedAt`, and `publishedAt`. Saving changes only the draft. Publishing saves the draft and replaces the published snapshot atomically in one localStorage write. Open live tabs retain their version and ask for a reload if another tab publishes changes. Simultaneous editor saves detect conflicting updates.

Live responses autosave under `build-<form-id>-1`, using the client form's flat field-value shape plus `_requiredFields` and `_comments`. Checkboxes store booleans; other inputs store strings. The validation flag is stored separately as `buildValid-<form-id>-1` and resets on edits. Required flags come from the published config; optional fields remain fillable. Comments follow the client form's per-field comment UX. Successful autosaves show the same green “✅ Autosaved” toast as AR-11 for 1.5 seconds after the latest edit. Successful validation and saving show a browser alert; failed validation or storage failures do not show a success alert.

The internal JSON configuration and response bundle retains this shape:

```json
{
  "buildConfig-form_example": {
    "version": 1,
    "id": "form_example",
    "title": "My intake",
    "description": "Please enter your details.",
    "submitLabel": "Validate form",
    "fields": [
      { "id": "first_name", "type": "text", "label": "First name", "description": "", "placeholder": "", "required": true }
    ]
  },
  "build-form_example-1": {
    "first_name": "Alex",
    "_requiredFields": { "first_name": true },
    "_comments": { "first_name": "Example note" }
  },
  "buildValid-form_example-1": true
}
```

The bundle configuration is a single snapshot, not the internal draft/published storage record. JSON remains the storage format; the live page does not expose stored data or JSON downloads. The editor has no JSON import/export controls. Open Live appears beside Publish once a published version exists. Invalid configs, duplicate field IDs, and invalid choice lists are rejected.

Forms and responses are stored locally; there is no backend, account system, public sharing, or remote submission collection. A live URL works in the browser/origin where the form was published. Existing `client-*` data is never changed.

## Completed-form PDFs

After successful validation and saving, the live form shows **Download PDF**. Editing an answer or comment hides it until validation succeeds again. A previously validated form can be downloaded after reload if its current answers still validate. Another tab changing the form or responses invalidates download access. Generation also rechecks that the form and answers have not changed before initiating the download.

`builder-pdf.js` snapshots the published form's DOM and responses, then renders a print-friendly light version using the locally bundled `html2canvas` and `pdf-lib` libraries. It preserves the title, descriptions, headings, field labels, required markers, answers, radio/checkbox states, visible conditional sections, and non-empty comments. Text inputs and textareas expand to show their entire answers. Hidden conditional content, navigation, editor controls, validation feedback, and download buttons are excluded.

The output is a static, image-based US Letter PDF with half-inch margins and page numbers. It is not an interactive or searchable form. Rendering uses page-sized slices, keeps ordinary fields together, and avoids splitting text lines in answers longer than a page. All processing stays in the browser. Libraries load only on the live page; no external API or CDN is needed. A progress state prevents duplicate downloads, and failures leave a retry available.

## Conditional blocks

Add a dropdown, single-choice field, or checkbox to the main form, then add **Conditional block** from the palette. Select the block and use **Show this block when** to choose a controlling field and comparison. Combine up to 20 rules with **All** or **Any** matching. Choice fields support equals, does not equal, contains, is empty, and is not empty; checkboxes support checked and not checked. Unanswered choice fields do not satisfy value comparisons, including does not equal.

Drag fields into the block's drop area, or select a block and click a palette element. **Place field in** provides a keyboard/touch alternative for moving fields into or out of a block. Drop fields at the end of the main canvas to move them outside all blocks. Arrow controls reorder siblings. Duplicating a block copies its contents with fresh IDs; deleting a block removes its contents and Undo delete restores them.

Blocks have one level of nesting: fields may belong to a block, but blocks cannot contain other blocks. Controllers must remain outside all blocks. Fields used by rules cannot be deleted or moved inside a block until their rules are removed. These constraints prevent circular dependencies. Changing choices that a rule uses requires updating the rule before publishing. Incomplete rules may be saved as drafts, but not published.

**Test conditions** makes the editor preview interactive without saving the preview answers or modifying the draft. The published form updates visibility immediately. Hidden controls are disabled, skipped during validation, and omitted from navigation, saved responses, and exported answers/required flags/comments. Their current answers and comments remain in the open page's memory and return if the block becomes visible again. They do not survive reloading while hidden.

The version-1 configuration keeps its flat `fields` array. A block adds a `condition` object, and its children reference it using `parentId`:

```json
{
  "id": "spouse_details",
  "type": "conditional",
  "label": "Spouse details",
  "description": "Enter your spouse's details.",
  "placeholder": "",
  "required": false,
  "condition": {
    "match": "all",
    "rules": [{ "fieldId": "marital_status", "operator": "equals", "value": "Married" }]
  }
}
```

A child field uses `"parentId": "spouse_details"`. Controllers use stable IDs, so renaming or reordering them preserves rules. Display order follows the order of siblings in `fields`, grouped beneath their parent block. Old configurations without blocks remain compatible. Save draft and Publish retain their existing separation.

## Checks

Run `node --test form/build/builder-core.test.cjs form/build/builder-pdf.test.cjs` from the repository root. Tests cover explicit saving, separate published snapshots, response/export format, imports, concurrent edits, malformed configs, storage failures, form isolation, rule evaluation, hidden answer filtering, block membership, invalid dependencies, PDF page boundaries, long-answer pagination, and safe download filenames.
