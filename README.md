# SHARE & CARE – Smart Donation Ecosystem

> **"Small Acts. Big Impact. Together We Care."**
> **Core Mission:** Making Donations Smarter, Faster, Safer, and More Meaningful.

---

## 🌟 Executive Summary

**SHARE & CARE** is a full-stack, modern, high-impact donation web platform developed for community relief, zero food wastage, and emergency response across Chennai neighborhoods. The platform seamlessly unites four vital roles:
1. **Donors:** Citizens, event caterers, bakeries, and colleges sharing surplus meals, clothing, textbooks, and essential kits.
2. **Receivers:** Low-income families, daily wage laborers, elders, and community centers lodging assistance requests with dignity.
3. **Volunteers:** On-ground couriers equipped with GPS-guided dispatch queues and route optimization.
4. **Administrators:** Overseeing food safety compliance, emergency alert broadcasts, and verifiable QR custody tracking.

---

## 🎨 Design & Aesthetic System

Built strictly following a premium **Dark Navy Blue & Cyan Glow** UI/UX system:
- **Main Background:** `#071426`
- **Secondary Background:** `#0B1F38`
- **Card Background:** `#102A46`
- **Primary Blue:** `#2563EB`
- **Light Blue / Cyan Glow:** `#38BDF8`
- **Accent Green:** `#34D399`
- **Highlight Amber:** `#FBBF24`
- **Urgent Red:** `#EF4444`
- **Main Text:** `#F8FAFC`
- **Secondary Text:** `#A7B8CC`

Features include **glassmorphism cards**, glowing blue borders, subtle floating animations, responsive layouts across mobile and desktop, and interactive festive feedback.

---

## 🚀 Key Features

### 1. 🚨 "URGENT NEEDS – NEED OF THE DAY" (Bonus Challenge Section)
- High-priority section directly on the homepage showcasing emergency requests.
- Eye-catching badges: `🔴 URGENT` and `🟠 HIGH PRIORITY`.
- Three mandatory categories with live instant filtering: **Food**, **Clothes**, **Medicines**.
- Prominent **"HELP NOW"** button on each card.
- Confirmation popup:
  - Heading: **"Are You Ready to Help?"**
  - Message: *"Your contribution can make a difference in someone's life. Do you want to help with this request?"*
  - Buttons: **Confirm** & **Cancel**.
  - Automatically verifies logged-in user, saves the pledge, triggers celebratory confetti, and displays: *"Thank you for helping! Your kindness matters."*

### 2. 🍲 Food Expiry Rescue System
- Real-time countdown clocks calculating remaining hours and minutes until use-by limits.
- Automatically flags items:
  - `🔥 CRITICAL RESCUE (<6 hours left)`
  - `RESCUE SOON (<12 hours left)`
  - `SAFETY VERIFIED`
- Blocks and hides expired food items to guarantee safety.

### 3. 🧺 SHARE BASKET – Combine Small Donations
- Crowdsources multi-item essential kits for a single beneficiary.
- E.g., Donor A contributes Ponni Rice, Donor B contributes Toor Dal, Donor C contributes Cooking Oil.
- Visual completion percentage bar updates dynamically with each contribution.

### 4. 📦 Donation Kit Builder
- Ready-to-go standard kits:
  - **Family Grocery Kit**
  - **Student Education Kit**
  - **Household Essentials Kit**
  - **Clothing Kit**
  - **Emergency Support Kit**
- Beneficiary targets and component pledge buttons.

### 5. 🔍 Smart Need Matching System
- Transparent rule-based algorithm calculating compatibility percentages:
  - Category match (40%)
  - Quantity ratio (25%)
  - Geographic token/coordinate proximity (25%)
  - Urgency weighting (10%)
- Beneficiaries can inspect why a donation matched and claim it in 1 click.

### 6. 📱 7-Stage Verifiable QR Code Tracking
1. `Donation Created` (Donor)
2. `Admin Verified` (Quality Assurance)
3. `Volunteer Assigned` (Field Courier)
4. `Donation Picked Up` (Thermal Box Scan)
5. `Out for Delivery` (En Route)
6. `Successfully Delivered` (Destination Reached)
7. `Receiver Confirmation` (OTP / Digital Sign-off)
- Interactive QR generator and simulated scanner modal with real-time stage advance.

### 7. 🗺️ Community Donation Map & Smart Volunteer Route
- Integrated with **Leaflet** and **OpenStreetMap**.
- Custom SVG pins for donations (green), help requests (amber), and critical emergencies (red).
- Volunteer route planner displays waypoint circuit connecting pickup and drop-off coordinates.

### 8. 🚨 Emergency Help Mode
- Instant administrator toggle broadcasting an inundation relief alert across all pages.
- Direct quick links to 24x7 disaster helplines and express dispatch.

### 9. 📊 Audited Social Impact Dashboard
- Live metrics directly aggregated from database records:
  - Total Food Packets Shared
  - Total Clothes Donated
  - Total Essential Items Distributed
  - Total Families Supported
  - Total Deliveries Completed
  - Active Volunteers

---

## 👥 Demo Login Accounts (Pre-Seeded)

Switch between roles with 1-click in the navbar or log in via the Login page:

| Role | Email | Password | Persona & Focus |
|---|---|---|---|
| **Donor** | `donor@sharecare.org` | `password123` | Ananya Sharma (Velachery) – Food & Clothes Donor |
| **Receiver** | `receiver@sharecare.org` | `password123` | Murugan R. (Guindy) – Seeking Food & Books Aid |
| **Volunteer** | `volunteer@sharecare.org` | `password123` | Karthik Raja (Adyar) – Two-Wheeler Courier |
| **Admin** | `admin@sharecare.org` | `password123` | Priya Venkat (T. Nagar) – Governance & Emergency Mode |

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Leaflet, Canvas Confetti, QRCode, React Router DOM
- **Backend:** Python 3, Flask REST API, SQLite3 (`sharecare.db`), PyJWT, Werkzeug Security
- **Architecture:** Decoupled frontend with robust client-side state machine and complete REST API fallback.

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### 1. Run the Frontend (UI)
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:3000` (or the port Vite outputs, typically 3000 or 5173).

To create a production build:
```bash
npm run build
npm run preview
```

### 2. Run the Backend API (Optional / Supplemental)
```bash
python backend/seed_data.py
python backend/app.py
```
The REST API will launch at `http://127.0.0.1:5000/api`.

---

## 📄 License & Attribution

Designed and developed with ❤️ for community support, zero food wastage, and rapid disaster response.
`SHARE & CARE – Small Acts. Big Impact. Together We Care.`
