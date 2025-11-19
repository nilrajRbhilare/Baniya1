# Design Guidelines: Professional Billing + Inventory + Accounting Application

## Design Approach

**Reference-Based Approach**: Draw inspiration from industry-leading business applications:
- **Primary References**: Vyapar, myBillBook, Zoho Books, TallyPrime, Marg ERP, BUSY Accounting, Khatabook
- **Design Principles**: Business-oriented professionalism, information density with clarity, efficient workflows, data-focused interface

## Visual Foundation

**Framework**: Tailwind CSS
**Typography**: Inter or Poppins font family
- Headings: 600-700 font weight
- Body: 400-500 font weight
- Data/Numbers: 500-600 font weight (tabular numbers for alignment)
- Labels: 500 font weight, uppercase tracking for section headers

**Layout System**: Tailwind spacing units - 2, 4, 6, 8, 12, 16, 20
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card spacing: p-6
- Form field gaps: gap-4 to gap-6
- Table cell padding: px-4 py-3

## Core Layout Structure

**Sidebar Navigation** (Fixed, left-aligned):
- Width: 240px-280px
- Sections: Dashboard, Billing, Inventory, Accounting, Reports, Settings
- Nested menu items with subtle indentation
- Active state with subtle background highlight
- Icons from Heroicons (outline style)

**Main Content Area**:
- Full height with top padding
- Max-width container for content (max-w-7xl)
- Consistent page header pattern: Page title (text-2xl font-semibold) + Action buttons (right-aligned)

**Top Bar** (Optional):
- Company name/logo
- Search functionality
- User profile dropdown
- Notifications icon

## Component Library

**Cards**:
- White background, subtle shadow (shadow-sm)
- Rounded corners (rounded-lg)
- Border (border border-gray-200)
- Padding: p-6

**Data Tables**:
- Striped rows (alternate row background)
- Sticky header on scroll
- Hover state on rows
- Action buttons (Edit/Delete) in last column
- Compact row height for business efficiency
- Sortable columns with arrow indicators

**Forms**:
- Label above input pattern
- Input height: h-10 to h-11
- Full-width inputs within form containers
- Validation messages below fields
- Form sections separated by borders or spacing
- Submit buttons: Primary blue, right-aligned or full-width on mobile

**Buttons**:
- Primary: Blue background, white text
- Secondary: White background, blue border
- Height: h-9 to h-10
- Padding: px-4 to px-6
- Icon + text combinations for actions

**Modals**:
- Centered overlay
- Max-width: max-w-2xl for forms, max-w-4xl for data selection
- Header with title + close button
- Content padding: p-6
- Footer with action buttons (right-aligned)

**Invoice Line Items Table**:
- Editable inline cells
- Add/Remove row buttons
- Auto-calculation display
- Columns: Item, Description, Quantity, Rate, Tax, Amount
- Footer row for subtotal, discount, tax, total

## Dashboard Components

**Metric Cards** (4-column grid on desktop):
- Large number display (text-3xl font-bold)
- Label below (text-sm text-gray-600)
- Icon in top-right corner
- Subtle border or shadow

**Charts**:
- Sales graph: Line chart with grid lines
- Invoice status: Donut/pie chart
- Category distribution: Bar chart
- Chart padding: p-4 to p-6 within card
- Axis labels in gray-600

## Specific Module Layouts

**POS Billing Screen**:
- Split layout: Product selection (left 60%) | Cart (right 40%)
- Large touch-friendly buttons
- Quick search at top
- Payment modal with calculator-style number pad

**Invoice/Quotation Forms**:
- Two-column header: Customer details (left) | Invoice details (right)
- Line items table (full width)
- Summary section (right-aligned, max-w-sm)
- Action buttons at bottom

**Reports Pages**:
- Filter bar at top with date pickers, dropdowns
- Export buttons (Excel/PDF) in top-right
- Results table below
- Empty state when no data

## Print/PDF Templates

**Invoice Template**:
- Company header with logo and details
- "INVOICE" heading (large, bold)
- Customer and invoice info in two columns
- Line items table with borders
- Summary box (right-aligned)
- Payment terms and footer at bottom
- Clean, professional spacing

## States & Interactions

**Loading States**: Skeleton loaders for tables and cards
**Empty States**: Icon + message + action button (centered)
**Validation**: Red border on error, green on success, helper text below field
**Confirm Dialogs**: Simple modal with warning icon, message, Cancel/Confirm buttons

## Responsive Behavior

**Desktop** (lg and above): Full sidebar + multi-column layouts
**Tablet** (md): Collapsible sidebar, 2-column grids
**Mobile**: Hidden sidebar (hamburger menu), single column, stacked forms, horizontal scroll for wide tables

## Professional Business Aesthetic

- Minimal distractions, focus on data and functionality
- Consistent spacing creates visual rhythm
- Generous white space in forms for clarity
- Data density in tables for efficiency
- Professional blue accents (not playful or vibrant)
- Subtle shadows and borders for depth without drama
- Clear visual hierarchy: numbers/data stand out, labels recede