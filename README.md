# DemoLab LIMS – clickable mock-up with an AI-assisted UAT proof of concept

A clickable **Laboratory Information Management System (LIMS) mock-up** for a **food and environmental testing laboratory in the EU**, with sites in **France (Lyon)** and **Germany (Köln)**. It follows a sample from registration and chain of custody, through analysis against EU limits, QA approval with an e-signature, certificates (COFRAC / DAkkS), and invoicing with VAT and e-invoicing (Factur-X / XRechnung). The app is plain HTML, CSS and JavaScript with no build step, no dependencies and no backend. Every interactive element has a stable `data-testid`, so the mock-up can serve as a target for scripted and AI-driven user acceptance testing (UAT). The repository includes a write-up and video of such a UAT proof of concept run by Grok Bot.

> ⚠️ **Mock-up only.** This is not a validated system, and all clients, samples, results and invoices are fictional. See the [Disclaimer](#disclaimer).

**Version:** v1.3

---

## Modules

| Page | File | What it does |
|---|---|---|
| Dashboard | `index.html` | Status KPIs, TAT-overdue and out-of-spec counts, workload by matrix, TAT tracker, instrument and calibration status (simulated) |
| Sample Registration | `samples.html` | Register samples (9 matrices) with validation, search and filter, barcode label preview and print (simulated), barcode scan lookup, receive or reject (reason required), chain of custody |
| Analysis | `analysis.html` | Worklist and analyst assignment; results entry with automatic PASS/FAIL against spec limits; instrument import (simulated); batch QC panel; QA review with e-signature, four-eyes check and justification for out-of-spec approval |
| Reports | `reports.html` | Test report / certificate of analysis preview (COFRAC or DAkkS, limits, conformity, statement of conformity), release to client, management KPI dashboard |
| Invoicing | `invoicing.html` | Invoices, price list, VAT per site (FR 20 % / DE 19 %, reduced rates configurable), intra-EU reverse charge, payment status, EN 16931 UBL XML export (Factur-X / XRechnung style stub) |
| Client Portal | `portal.html` | Client-scoped list of samples and reports, sampling request |
| Audit Trail | `audit.html` | Append-only log of user, timestamp, action, object, before/after values and reason; filter; CSV export |
| PoC / AI UAT | `poc.html` | Management write-up of the AI-assisted UAT proof of concept, with the embedded evidence video |

Every page shares a header with a **site selector** (France – Lyon / Germany – Köln), a **role selector**, an **EN / FR / DE language toggle** and a **Reset** button.

## Key features

- **Sample lifecycle:** Registered → Received → In Analysis → Review → Approved → Reported, or Rejected
- **Matrices:** dairy, spices, beverage, drinking water, wastewater (effluent), surface water, soil, ambient air filter, stack emission
- **Tests:** microbiology (Listeria, Salmonella, E. coli), pesticide multi-residue, aflatoxin B1, lead/arsenic (ICP-MS), nutrition panel, BOD5, COD, TSS, pH, PM10/PM2.5, stack NOx, soil metals
- **Chain of custody:** sampler, GPS, receipt temperature, seal check, signed transfers
- **Spec-limit checks:** PASS/FAIL per parameter, each with its legal reference; ranges such as pH 6.5–9.5
- **QA approval:** e-signature (password re-entry, simulated). An analyst cannot approve their own result (four-eyes). Approving an out-of-spec result or a QC deviation needs a written justification.
- **Certificates:** accreditation body per site, decision-rule note, statement of conformity, receipt temperature
- **Invoicing:** EUR; VAT FR 20 % (reduced 10 / 5.5 %) and DE 19 % (reduced 7 %); reverse charge (Art. 196 Dir. 2006/112/EC) for intra-EU B2B clients; payment status; UBL XML export download
- **Role-based access:** six demo roles; pages and actions are restricted per role
- **Audit trail:** every state change, result change (with reason), custody transfer, signature, release, invoice and payment is recorded
- **In-page dialogs** (no native `prompt`/`confirm`) for scanning, rejection reasons, reasons for result changes and non-conforming releases

## Regulatory scope (as modelled)

| Area | References |
|---|---|
| Food | Reg. (EC) 178/2002, Reg. (EC) 2073/2005 (microbiological criteria), Reg. (EC) 396/2005 (pesticide MRLs), Reg. (EU) 2023/915 (contaminants), Reg. (EU) 1169/2011 (nutrition labelling) |
| Water & environment | Drinking Water Directive (EU) 2020/2184, Urban Wastewater Treatment Directive 91/271/EEC, Water Framework Directive, Ambient Air Quality Directive |
| Quality & data integrity | ISO/IEC 17025 via COFRAC (FR) and DAkkS (DE); EU GMP Annex 11 / 21 CFR Part 11-style audit trail and e-signature; GDPR |
| Invoicing | VAT Directive 2006/112/EC (reverse charge), EN 16931; Factur-X and the French e-invoicing mandate; German XRechnung / ZUGFeRD |

The spec limits are **indicative** and must be checked against the current legal texts before any real use.

## How to run

No build step and no dependencies.

```bash
cd lims-mockup
python3 -m http.server 8765
# then open http://localhost:8765/index.html
```

You can also open `index.html` directly in a browser. A local server is recommended for the embedded video and for consistent `localStorage` behaviour.

**Demo data:** the app saves its state in the browser's `localStorage` under keys prefixed `lims_`, so changes persist across pages and reloads. To return to the seed data, click **↺ Reset** in the header (this clears all `lims_*` keys), or clear the site data in your browser.

## Demo roles

Switch roles from the **Role** selector in the header. Roles are for demonstration only; there are no real logins.

| Role | Demo user | Access |
|---|---|---|
| Reception | A. Martin | Sample registration |
| Analyst | L. Becker | Analysis (cannot approve) |
| QA Reviewer | C. Dubois | Analysis, approval, reports |
| Lab Manager | M. Schulz | Everything (default) |
| Finance | S. Laurent | Invoicing |
| Client portal user | – | Client portal |

## AI-assisted UAT proof of concept

Grok Bot, an AI assistant with its own computer and browser, ran scripted UAT on this mock-up through the real user interface:

- **Run 1 (v1.0):** all 8 test cases executed with no blocking failures. It logged **8 defects (D1–D8)**, including a data-integrity gap: a failed result could be approved and released without warning.
- **Fixes:** v1.1 and v1.2 (see the [Changelog](#changelog)).
- **Clean run (v1.2):** all 8 test cases passed, using real on-screen clicks, with a screen recording.

Read the full write-up in [`poc.html`](poc.html). It covers results, open items, what the PoC proves and its limits, a plan for scaling to a full LIMS UAT, RACI, KPIs and risks. The evidence video is [`media/LIMS_UAT_demo.mp4`](media/LIMS_UAT_demo.mp4) (7 min 18 s, with title cards and captions).

## Testing notes

- Every interactive element has a stable `id` and/or `data-testid`, for example `nav-samples`, `site-select`, `role-select`, `btn-new-sample`, `f-desc`, `chk-MIC-LIS`, `btn-save-sample`, `btn-receive-<sampleId>`, `res-<testCode>`, `verdict-<testCode>`, `btn-review-<sampleId>`, `sign-pw`, `btn-coa-<sampleId>`, `inv-row-<invoiceNo>`, `btn-einv-<invoiceNo>`, `audit-table`.
- The shared in-page dialog (`#modal-dialog`) sets its test ids per use: `dlg-<key>`, `<key>-input`, `<key>-ok`, `<key>-cancel` and `<key>-error`, where the key is `scan`, `reject-reason`, `change-reason` or `release-confirm`.
- Click **Reset** before each test run so it starts from the seed data.
- Dates use the DD/MM/YYYY format.

## Project structure

```
lims-mockup/
├── index.html          # Dashboard
├── samples.html        # Sample registration, labels, chain of custody
├── analysis.html       # Assignment, results entry, QC & approval
├── reports.html        # Certificates / test reports, KPI dashboard
├── invoicing.html      # Invoices, price list, VAT & e-invoicing
├── portal.html         # Client portal
├── audit.html          # Audit trail
├── poc.html            # PoC / AI UAT write-up (static content)
├── app.js              # Shared shell (header, nav, roles, i18n stub), page logic, dialogs, audit
├── data.js             # Fictional seed data: sites, clients, tests & limits, roles, samples, results
├── style.css           # Styles
├── media/
│   └── LIMS_UAT_demo.mp4   # Clean v1.2 UAT run recording
└── README.md
```

## Changelog

### v1.3 (25/10/2026)
- Added `poc.html`, the PoC / AI UAT management write-up, linked as "PoC / AI UAT" in the nav on every page (with FR/DE labels).
- Embedded the evidence video `media/LIMS_UAT_demo.mp4`.

### v1.2 (22/10/2026): demo polish
- Replaced all native `prompt()`/`confirm()` calls with an in-page modal. Required fields show an inline error and block the action.
- Client and Matrix are now placeholder-reset and required on registration. The error message clears after a successful save.
- The collector on the certificate falls back to "Client delivered".
- The e-invoice XML view wraps and scrolls inside its box.

### v1.1 (22/10/2026): fixes from UAT run 1
- D1: the registration form resets when opened.
- D3: the disabled approve button is styled as disabled, and a four-eyes message is shown.
- D4: out-of-spec and QC warnings appear at e-signature; a justification is required to approve; release of a non-conforming report asks for confirmation.
- D5: limit ranges (e.g. pH 6.5–9.5) are shown on certificates.
- D6: receipt temperature is taken from the custody log; the stray "Field:" default is removed.
- D7: certificates include a statement of conformity.
- D8: the e-invoice export is well-formed UBL XML with namespaces, downloaded as a file.

### v1.0 (22/10/2026)
- Initial mock-up: dashboard, registration, analysis, reports, invoicing, portal and audit pages; FR/DE sites; EU spec limits; roles; data-testids.

## Known issues

| ID | Description |
|---|---|
| D2 | Rejected samples still offer the Label and CoC actions. |
| O1 | The client portal's "preview as client" dropdown lets a portal user switch clients. In a real system, access must be enforced server-side. |
| O2 | Audit trail oddities: the instrument name appears in the Reason column for result entries, and both sites are listed together. |
| O3 | The reject dialog's "required" error stays visible after a reason is typed. |
| O4 | The registration test list keeps its scroll position between samples. |
| O5 | The chain-of-custody dialog resizes after each entry. |
| – | The language toggle translates only the navigation labels. Instrument import, label printing and e-signature are simulated. The e-invoice XML is an illustrative stub that has not been validated against XRechnung or Factur-X schemas. |

## Disclaimer

This project is a **mock-up for demonstration and testing purposes only**. It is **not a validated computerised system** (no GxP, Annex 11, Part 11 or ISO/IEC 17025 validation) and must not be used for real laboratory, regulatory or invoicing work. **All data is synthetic.** The companies, addresses, VAT IDs, accreditation numbers, samples, results and invoices are fictional, and any resemblance to real entities is coincidental. Regulatory references and limits are indicative and may be out of date. VAT and e-invoicing behaviour is illustrative and is not tax advice.
