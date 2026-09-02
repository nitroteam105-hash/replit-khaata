# Invoices — Create & Send
## Complete Feature Reference Document
**App Version:** 1.6  
**Platform:** iOS / iPadOS (App Store India)  
**Developer:** Ozodjon Sodiqov  
**Category:** Business  
**Pricing:** Free to download with In-App Pro subscription  
**Document Purpose:** Source of reference for development, product decisions, and team handoffs

---

## Table of Contents

1. [Pricing & Subscription](#1-pricing--subscription)
2. [App Navigation Structure](#2-app-navigation-structure)
3. [Dashboard](#3-dashboard)
4. [Documents — Invoices](#4-documents--invoices)
5. [Documents — Estimates](#5-documents--estimates)
6. [Documents — Contracts](#6-documents--contracts)
7. [Calendar](#7-calendar)
8. [Clients](#8-clients)
9. [Tools — Reports](#9-tools--reports)
10. [Tools — Utilities](#10-tools--utilities)
11. [New Invoice — Full Form](#11-new-invoice--full-form)
12. [New Line Item / Price Book Entry](#12-new-line-item--price-book-entry)
13. [Settings](#13-settings)
14. [Company Profile](#14-company-profile)
15. [Invoice Settings](#15-invoice-settings)
16. [Features Toggle](#16-features-toggle)
17. [Data & Backup](#17-data--backup)
18. [Complete Pro Feature List](#18-complete-pro-feature-list)

---

## 1. Pricing & Subscription

### Plans Available
| Plan | Price | Notes |
|---|---|---|
| Weekly | ₹299 / week | — |
| Monthly | ₹499 / month | — |
| Annual | ₹2,499 / year | Best value — saves ~84% vs weekly |

### Free Trial
- **Duration:** 3 days free
- **Includes:** Full Pro access during trial
- **Cancellation:** Must cancel at least 24 hours before renewal via App Store Settings

### Monetisation Model
- The app is free to download
- All meaningful features are behind the Pro subscription
- There is no permanent free tier — after trial, a subscription is required
- All features listed in this document are Pro features

---

## 2. App Navigation Structure

The app uses a **top tab bar** (5 tabs) combined with a **side drawer** (hamburger icon) that mirrors the same 5 sections.

### Top-Level Sections
| Tab | Purpose |
|---|---|
| Dashboard | Revenue overview, analytics, quick actions |
| Documents | Invoices, Estimates, Contracts |
| Calendar | Payment schedule visualised by date |
| Clients | Client directory and management |
| Tools | Reports and business utilities |

### Side Drawer
Provides the same 5 navigation items as the top tab bar:
- Dashboard
- Documents
- Calendar
- Clients
- Tools

### Global UI Elements
- **+ FAB (Floating Action Button)** — present on most list screens; creates a new item in context (e.g. on Invoices tab → New Invoice)
- **Search icon** — available on Clients and Documents screens
- **Filter / sort icon** — available on Clients screen

---

## 3. Dashboard

The Dashboard is the home screen of the app. It provides a financial summary and quick entry points to all major actions.

### Revenue Summary Card
- **Total Revenue** — cumulative revenue figure for the selected period
- **Outstanding** — total amount not yet paid
- **Overdue** — count of overdue invoices

### Time Period Filters
Filters applied globally to the dashboard data:
- This Week
- This Month
- This Quarter
- **This Year** (default)
- All Time

### Quick Actions
7 shortcuts displayed as icon tiles for fast creation:
1. New Invoice
2. New Estimate
3. New Client
4. New Expense
5. New Project
6. New Time Entry
7. New Item

### Setup Prompt
- If company profile is incomplete (missing email or address), a banner appears:  
  **"Complete your company profile — Add your email and address so they appear on invoices"**
- Dismissible with ×

### Analytics Section

#### Overview (summary metrics)
- **Collection Rate** — percentage of invoiced amount collected (bar indicator)
- **Invoiced** — total amount invoiced in period
- **Clients** — number of clients invoiced in period
- **Avg Invoice** — average invoice value in period
- Shows "No data" state when no invoices exist

#### Revenue Trend
- Bar chart showing revenue over time
- Adapts to selected time filter (weekly/monthly/quarterly/annual bars)

#### Cash Flow
- Visual chart showing money movement
- Distinguishes inflows vs outflows

### Reports Section (shortcuts from dashboard)
- Aging Report (jump link)
- Profit & Loss (jump link)

---

## 4. Documents — Invoices

### Tab Location
Documents → Invoices (first sub-tab)

### List View
Each invoice row displays:
- Client avatar / icon
- Client name
- Invoice number (e.g. INV-SAMPLE-001)
- Due date
- Invoice amount
- Status badge

### Status Filters (filter chips at top)
| Filter | Description |
|---|---|
| All | Shows every invoice |
| Paid | Fully paid invoices |
| Unpaid | Sent but no payment received |
| Pending | Awaiting confirmation |
| Overdue | Past due date with no payment |

### Summary Bar (shown when invoices exist)
Displays counts at a glance:
- Total invoices
- Paid count
- Overdue count

### Status Badges
| Badge | Colour |
|---|---|
| Paid | Green |
| Pending | Grey |
| Overdue | Red / Orange |
| Unpaid | — |

### Empty State
- Message: "No invoices yet — Create your first invoice to get started"
- Button: **"Load sample invoices"** (populates list with 3 sample invoices for reference)

### Create New Invoice
Via + FAB → opens New Invoice form (see Section 11 for full details)

---

## 5. Documents — Estimates

### Tab Location
Documents → Estimates (second sub-tab)

### Purpose
Send quotes or proposals to clients before converting them into invoices.

### List View
Each estimate row displays:
- Client avatar / icon
- Client name
- Estimate number (e.g. EST-SAMPLE-001)
- Expiry / valid-until date
- Estimate amount
- Status badge

### Status Filters
| Filter | Description |
|---|---|
| All | Shows every estimate |
| Draft | Created but not yet sent |
| Sent | Sent to client, awaiting response |
| Accepted | Client has accepted the estimate |
| Declined | Client has declined the estimate |
| Invoiced | Estimate converted to an invoice |

### Summary Bar (when estimates exist)
- Total estimates count
- Accepted count
- Expired count

### Status Badges
| Badge | Colour |
|---|---|
| Draft | Grey |
| Accepted | Green |
| Declined | — |
| Expired | — (shown in summary count) |

### Empty State
- Message: "No estimates yet — Create your first estimate by tapping Add Estimate below"
- Button: **"Load sample estimates"**

### Create New Estimate
Via + FAB → opens New Estimate form

---

## 6. Documents — Contracts

### Tab Location
Documents → Contracts (third sub-tab)

### Purpose
Create, send, and manage legally-binding agreements with clients. Supports digital signatures (client sign + counter-sign).

### Status Filters
| Filter | Description |
|---|---|
| All | Shows every contract |
| Draft | Created but not sent |
| Sent | Sent to client |
| Client Signed | Client has signed |
| Counter-signed | Both parties have signed |
| Active | Currently active contract |
| Expired | Past expiry date |
| Terminated | Manually terminated |

### Empty State
- Message: "No contracts yet — Create your first contract to send to a client"
- Button: **"+ New Contract"**

### Create New Contract
Via + FAB or "+ New Contract" button

---

## 7. Calendar

### Purpose
Visualise when money is expected to come in or go out, and track overdue payments by date.

### Views
Toggle between two display modes:
- **Month** — standard calendar grid; shows current date highlighted; displays scheduled events per day
- **Agenda** — list view of all scheduled events chronologically

### Cash Flow Summary Bar
At the top of the calendar screen:
- Shows a summary of cash movement for the displayed month (e.g. "No cash movement this month")

### Filters
- **All** — shows all events
- **In** — money coming in (invoice due dates, payments)
- **Out** — money going out (expenses, recurring costs)
- **Overdue** — payments that are past due

### Event Types Shown
- Invoice due dates
- Payment received dates
- Expense dates
- Recurring invoice dates

---

## 8. Clients

### Purpose
Maintain a directory of all clients. Each client is linked to their invoices, estimates, contracts, and notes.

### List View Features
- Search (search icon, top right)
- Filter / sort (filter icon, top right)
- Each client row: avatar, client name

### Import Clients
- **"Import from Contacts"** button — imports clients directly from the device's phone contacts

### Create New Client
Via + FAB → opens New Client form  
Fields include: name, contact details, address, notes

### Client Detail (inferred from features)
Each client record supports:
- Contact info (name, email, phone, address)
- Associated invoices
- Associated estimates
- Associated contracts
- Client Notes (Pro feature)
- Invoice history and outstanding balance

---

## 9. Tools — Reports

Accessible via the **Tools** tab. Four reports available:

### 9.1 Aging Report
- **Description:** "Who owes you, by age"
- Shows all outstanding invoices grouped by how long they have been unpaid
- Age buckets typically: 0–30 days, 31–60 days, 61–90 days, 90+ days
- Empty state: "No Outstanding Invoices — All invoices have been paid" (with verified badge)

### 9.2 Profit & Loss
- **Description:** "Income, costs & margin"
- Combines invoice revenue and expense data
- **Period filters:** Annual / Q1 / Q2 / Q3 / Q4
- **Year filter:** selectable (e.g. 2026)
- Empty state: "No Data Found — No invoices or expenses for [year]"

### 9.3 Tax Report
- **Description:** "Tax collected by period"
- Summarises tax amounts collected across invoices
- **Period filters:** Annual / Q1 / Q2 / Q3 / Q4
- **Year filter:** selectable
- Empty state: "No Invoices Found — No invoices for [year]"

### 9.4 Monthly Summary
- **Description:** "A month at a glance"
- Snapshot of a single month's invoices and expenses
- **Month filter:** selectable (e.g. Jul 2026)
- Empty state: "No Data Found — No invoices or expenses for [month year]"

---

## 10. Tools — Utilities

Accessible via the **Tools** tab, below Reports.

| Tool | Description | Status |
|---|---|---|
| **Recurring Invoices** | Automate billing on a schedule | Standard |
| **Expenses** | Track business costs | Standard |
| **Time Tracking** | Log billable hours | NEW |
| **Price Book** | Saved items & service rates | Standard |
| **Projects** | Group work by client, track budgets | NEW |
| **Recurring Expenses** | Automate recurring costs | NEW |
| **Invoice Templates** | Reusable invoice layouts | Standard |
| **Email Templates** | Saved send messages | NEW |
| **Saved Blocks** | Reusable note & terms snippets | NEW |

### 10.1 Recurring Invoices
- Create invoice templates that auto-generate on a schedule
- Schedule options: daily / weekly / monthly / custom
- Linked to a client and set of line items

### 10.2 Expenses
- Log individual business expenses
- Each expense: amount, date, category, description, receipt attachment
- Feeds into Profit & Loss report

### 10.3 Time Tracking *(NEW)*
- Log billable hours per project or client
- Each time entry: date, duration, description, hourly rate
- Can be converted into invoice line items
- Default hourly rate set in Invoice Settings

### 10.4 Price Book
- Library of saved items and services with preset prices
- Items created here auto-populate when adding line items to invoices
- Avoids re-typing repeated services

### 10.5 Projects *(NEW)*
- Group invoices, time entries, and expenses by client project
- Track budget vs. actual per project
- Shows outstanding amount per project

### 10.6 Recurring Expenses *(NEW)*
- Automate logging of regular costs (e.g. rent, subscriptions)
- Feeds into expense tracking and P&L

### 10.7 Invoice Templates
- Reusable invoice layouts — pre-fill line items, notes, and terms
- Useful for standard service packages

### 10.8 Email Templates *(NEW)*
- Saved message templates for sending invoices and reminders
- Reduces repetitive typing when emailing clients

### 10.9 Saved Blocks *(NEW)*
- Reusable text snippets for invoice notes and payment terms
- Insertable into invoice notes field via "Insert Block"

---

## 11. New Invoice — Full Form

This is the core creation screen of the app. Below is every field available.

### Header
- **Invoice Number** — auto-generated based on Invoice Settings format (e.g. INV-20260717-0001); editable via pencil icon
- **Preview button** — eye icon (top right); shows PDF preview before saving

### Dates
| Field | Details |
|---|---|
| Issue Date | Date picker; defaults to today |
| Due Date | Quick pick: **30 / 60 / 90 days** from issue date, or **calendar picker** for custom date |

### Client
- **Select Client** — tap to choose from client list; required for sending

### Line Items
- **+ Add Item** — opens line item picker (from Price Book or create new)
- Each line item includes: item name, category, description, quantity, unit price, tax applicability
- Multiple line items supported

### Financial Fields
| Field | Description |
|---|---|
| Currency | Per-invoice currency override (dropdown, full global list) |
| Tax Rate | % applied to taxable line items on this invoice |
| Discount | Flat discount amount (in selected currency) |
| Withholding Tax | % withheld (for compliance in applicable regions) |

### Payment Fields
| Field | Description |
|---|---|
| Payment Terms | Free text (e.g. Net 30, Due on receipt, 50% upfront) |
| Payment Link | Optional URL; overrides company-level payment link for this invoice |

### Late Fee (per-invoice configuration)
| Field | Description |
|---|---|
| Toggle | Enable/disable late fee for this invoice |
| Type | **Percentage** or **Fixed Amount** |
| Fee | Amount (% or currency value) |
| Every | Frequency: **Daily / Weekly / Monthly** |
| Grace Period | Number of days after due date before fee accrues |
| Max Fee | Optional cap on total late fee (in currency) |

> Note: Late fee policy prints on the PDF so the client is warned upfront. It never auto-records a payment.

### Notes
- Free text field for adding payment instructions, terms, or any other details
- **Insert Block** — inserts a pre-saved text snippet from Saved Blocks

### Invoice Actions (after creation)
- **Customise** — adjust invoice template/layout
- **Share** — share PDF via any iOS share method
- **Send** — send directly to client via email

---

## 12. New Line Item / Price Book Entry

Used when adding items to an invoice, or when creating a Price Book entry directly.

| Field | Details |
|---|---|
| Item Name | Required; free text |
| Category | Single-select chip: **Service / Product / Digital / Other** |
| Description | Optional; multiline free text for item details and specifications |
| Price | Required; numeric with currency symbol |
| Save to Price Book | Toggle — when ON, saves this item for reuse in future invoices |

---

## 13. Settings

Accessible via the user avatar / profile icon (top left on Dashboard).

### Business Identity
- **My Business** — shows company name and logo; tap to manage
- Logo upload supported (NEW feature)

### Upgrade Prompt
- **"Upgrade to Pro"** banner — "Unlimited invoices, clients & analytics"
- Visible to free/trial users

### Configure Section
| Option | Description |
|---|---|
| Company | Company profile (see Section 14) |
| Invoice Settings | Defaults for currency, numbering, tax, late fees (see Section 15) |
| Features | Toggle individual features on/off (see Section 16) |
| Theme | Colour theme selection; current: **Indigo** |
| Data & Backup | Export, import, backup, restore (see Section 17) |

### About Section
| Option | Description |
|---|---|
| Notifications | Enable/disable push notifications; current: **Disabled** |
| Rate App | Opens App Store rating prompt |
| Share App | iOS share sheet for sharing the app |
| Contact Us | Support contact |
| Privacy Policy | Legal |
| Terms of Use | Legal |

### App Version
Displayed at the bottom of Settings: **Version 1.6**

---

## 14. Company Profile

The company profile populates the sender information on all generated PDF documents.

### Company Logo
- Upload a logo image
- Appears on PDF invoices, estimates, and contracts for branding

### Company Status
- Badge: **Active Company** — confirms this is the currently selected company

### Company Info
| Field | Required | Notes |
|---|---|---|
| Company Name | Yes | Appears on all documents |
| Email | No | Billing or contact email |
| Phone | No | Business phone number |
| Website | No | e.g. www.company.com |
| Tax / VAT Number | No | Tax ID, VAT number, GST number, etc. |

### Location
| Field | Required | Notes |
|---|---|---|
| Business Address | No | Multiline free text; prints on PDF documents |

### Payment Details
| Field | Description |
|---|---|
| Payment Instructions | Free text (e.g. bank name and account number); appears in PDF payment section |
| Payment Link | URL (e.g. https://paypal.me/yourname); prints on PDF; can be overridden per invoice |

> Note: Payment details and link appear in the Payment Details section of PDF invoices.

### Bank / Wire Transfer Details
| Field | Description |
|---|---|
| Bank Name | Name of the bank |
| Account Number | Bank account number |
| IBAN | International Bank Account Number (e.g. GB29 NWBK 6016 1331 9268 19) |
| SWIFT / BIC | e.g. NWBKGB2L |
| Routing Number | e.g. 021000021 |

> Note: Bank details appear in the Payment Details section of PDF invoices.

### Multiple Companies
- The app supports managing **multiple companies** under one account
- Companies list shows each company with: logo, name, Active badge
- Tap + to add a new company
- Switch between companies to issue documents from different business identities

---

## 15. Invoice Settings

Global defaults that pre-fill on every new invoice. All settings can be overridden per individual invoice.

### Currency
| Setting | Details |
|---|---|
| Default Currency | Dropdown with full global currency list (100+ currencies, searchable by name or code) |
| | Examples: USD, GBP, EUR, INR, AUD, AED, SGD, etc. |
| Scope | Used for all new invoices by default |

### Invoice Number Format
| Setting | Options | Notes |
|---|---|---|
| Prefix | Free text | Default: **INV** |
| Format | **Date-Based** or **Annual** | Date-based: INV-YYYYMMDD-NNNN; Annual: sequential per year |
| Preview | Live preview shown | e.g. INV-20260512-0001 |

### Tax Settings
| Setting | Details |
|---|---|
| Tax Label | Free text (e.g. Tax, VAT, GST, IGST) — leave blank for localised default |
| Default Tax Rate | Percentage (%) — pre-fills on taxable line items for new invoices |

### Late Fees
| Setting | Details |
|---|---|
| Toggle | Add late fees to new invoices (on/off) |
| Type | **Percentage** or **Fixed Amount** |
| Fee | Amount value |
| Frequency | **Daily / Weekly / Monthly** |
| Grace Period | Days after due date before fee starts |
| Max Fee | Optional cap (leave blank for unlimited) |

> Note: The late fee policy is printed on the invoice PDF as a warning to the client. Late fees never auto-record a payment — they must be manually tracked.

### Time Tracking
| Setting | Details |
|---|---|
| Default Hourly Rate | Currency value — used when a project has no specific rate assigned |

### Auto-Archive
| Setting | Details |
|---|---|
| Toggle | Auto-archive paid invoices after a period |
| Archive After | **1 month / 3 months (default) / 6 months / 1 year** |

> Note: Archived invoices are hidden from the main invoice list but are not deleted. They can still be accessed and searched.

---

## 16. Features Toggle

Users can turn individual features on or off to keep the app simple. Data is preserved when a feature is turned off.

### Always-On Features (cannot be disabled)
| Feature | Reason |
|---|---|
| Invoices | Core feature of the app |
| Clients | Core feature — required for invoicing |

### Optional Features (all toggleable)
| Feature | Description | Default |
|---|---|---|
| Reports | Aging, tax & profit reports | On |
| Templates | Invoice & email templates | On |
| Estimates | Send quotes & proposals | On |
| Expenses | Track spending & receipts | On |
| Contracts | Send & sign agreements | On |
| Projects | Group work & track budgets | On |
| Time Tracking | Log billable hours | On |
| Price Book | Reusable saved line items | On |
| Recurring | Auto-generate invoices & expenses | On |
| Payment Calendar | Money in & out, by day | On |

> Design principle: "Turn off anything you don't use to keep the app simple. Your data stays safe — turn a feature back on here anytime."

---

## 17. Data & Backup

### Data Management
- Shows current data status (e.g. "No data yet")

### Backup & Export
| Action | Access | Description |
|---|---|---|
| Export Data | **PRO only** | Save invoices, clients, and items as **CSV or JSON** |
| Import Clients | Free | Add clients from a CSV file |
| Import Items | Free | Add price book items from a CSV file |
| Create Backup | **PRO only** | Save a full backup to iOS Files app or iCloud Drive |
| Restore from Backup | Free | Replace all app data from a previously created backup file |

### Danger Zone
| Action | Description |
|---|---|
| Delete All Data | Permanently removes all data in the app — irreversible |

---

## 18. Complete Pro Feature List

The following is the exhaustive list of features included in the Pro subscription (as shown on the paywall screen):

1. **Invoices** — Create and send professional invoices
2. **Estimates** — Send quotes and proposals to clients
3. **Contracts** — Create, send, and manage signed agreements
4. **Expenses** — Track business costs and receipts
5. **Client Management** — Full client directory with notes and history
6. **Dashboard** — Revenue overview with analytics
7. **Reports & Statements** — Aging, Profit & Loss, Tax, Monthly Summary
8. **Send & Share PDFs** — Generate and share professional PDF documents
9. **Recurring Billing** — Auto-generate invoices on a schedule
10. **Time Tracking** — Log and bill hours to clients
11. **Projects** — Group work by client and track budgets
12. **Client Notes** — Add private notes to client records
13. **iCloud Sync** — Sync data across devices via iCloud
14. **Multiple Companies** — Manage more than one business identity
15. **Data Export & Backup** — Export as CSV/JSON, create full backups

---

## Key Design Observations

These are notable UX and product decisions observed in the app that are worth noting for reference:

1. **Feature gating is graceful** — features can be individually toggled off; the UI simplifies rather than hard-locking users out
2. **Per-invoice overrides** — key settings (currency, tax rate, late fees, payment link) can be set globally as defaults but overridden per invoice
3. **PDF-first mentality** — everything (company info, payment details, late fee policy, bank details) is designed around what appears on the printed PDF
4. **Sample data seeding** — "Load sample invoices/estimates" helps new users understand the UI without committing to real data
5. **Multi-company in one app** — avoids the need for separate accounts or app installs for freelancers managing multiple businesses
6. **Status lifecycle clarity** — invoices (Paid/Unpaid/Pending/Overdue), estimates (Draft/Sent/Accepted/Declined/Invoiced), and contracts (Draft/Sent/Client Signed/Counter-signed/Active/Expired/Terminated) each have clearly defined, distinct status progressions
7. **Late fee transparency** — late fee policy prints on the PDF upfront as a client warning; the app explicitly notes it never auto-records a payment, avoiding accounting confusion
8. **Auto-archive** — keeps the invoice list clean without deleting data; configurable retention period

---

*Document compiled from: App Store listing screenshots, in-app screenshots (Settings, Dashboard, Documents, Calendar, Clients, Tools, Invoice creation, Company Profile, Invoice Settings, Features, Data & Backup). App version 1.6, captured July 16–17, 2026.*
