# SPECS.md

## Product Description
AgentHub Admin Panel is a prototype admin interface for managing AI agent rentals. It allows an admin user to monitor platform metrics, manage users, agents, skills, contracts, and error logs. All data is hardcoded for demonstration; there is no backend.

## Tech Stack & Constraints
- HTML (semantic, accessible)
- Tailwind CSS via CDN (no custom CSS files, no inline style attributes)
- Vanilla JavaScript only (no frameworks, no jQuery, no build tools)
- No backend or API integration
- All interactivity must be implemented with vanilla JS

## Specifications

### Dashboard
1. Display exactly 4 metric cards (total revenue, discount/coupon losses, active agents, failing agents) in a responsive 2×2 grid. Each card includes an icon, label, and hardcoded value.
2. Each metric card uses a distinct accent color and includes a subtle shadow.
3. Below the cards, render a full-width placeholder div with a dashed border and centered label representing the weekly activity chart.

### User Management
1. Show a table with at least 5 hardcoded user rows (name, email, plan, status badge).
2. Each row has a ⋮ action dropdown with "View detail" and "Delete".
3. "View detail" opens a modal with the full user record. Modal closes via close button and backdrop click.

### Agent Management
1. List at least 4 agents, each showing name, owner, status badge, and a collapsed skill list.
2. Expand/collapse control reveals agent's skills with a smooth transition.
3. Each agent has a ⋮ action dropdown with "Configure" (opens modal with editable textarea for system prompt) and "Delete".

### Skills (Catalog)
1. Show at least 4 skills, each with name, description, and enabled-agents count.
2. Include a brief in-panel explanation of what a "skill" is in AgentHub.
3. Each skill has a ⋮ action dropdown with "View detail" and "Delete".

### Agent Contracts
1. Table with at least 4 contracts (client, agent, contracted skills, start/end dates, amount paid).
2. Each row has a ⋮ action dropdown with "View detail".
3. "View detail" opens a modal with full contract breakdown, including itemized skills and prices.

### Error Log
1. At least 6 hardcoded error entries (timestamp, agent name, color-coded error type badge, short description).
2. Each entry has a ⋮ action dropdown with "View detail" and "Mark as resolved".
3. "View detail" opens a modal with trace details; entries can be marked as resolved.

### Global Interactions
1. Dark/light mode toggle in the top bar switches the panel color scheme using Tailwind's `dark:` utilities. State is preserved between sections.
2. All action dropdowns close when clicking outside their menu area.
3. All modals close when clicking the backdrop.

## Component Inventory
- Sidebar navigation (links to all 6 sections, active state indicator)
- Top bar (title, dark/light mode toggle)
- Metric card
- Weekly activity chart placeholder
- Table (users, contracts)
- Agent row (with collapsible skill list)
- Skill card
- Error log entry
- Action dropdown (⋮)
- Modal dialog (detail/configure)
- Status badge

## Acceptance Criteria
1. The spec is committed before any HTML work.
2. All six panel sections are present and accessible from the sidebar.
3. At least 3 concrete specifications per section are implemented.
4. Tailwind utility classes are used consistently (no inline/external CSS).
5. All list rows have a working ⋮ action dropdown that opens, closes on click, and closes on outside click.
6. "View detail" opens a modal in at least four sections.
7. Modals close via close button and backdrop click.
8. Agent skill lists are collapsed by default and expand/collapse with a visible transition.
9. Dark/light mode toggle switches the full panel and state is maintained between sections.
10. Hardcoded data is consistent across sections (agents, contracts, errors).
11. HTML uses semantic tags correctly (`section`, `table`, `nav`, `header`, `main`).
12. Layout is usable on both desktop and tablet viewports.
