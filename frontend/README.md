# MedicPulse - Modern Healthcare Platform

MedicPulse is a high-fidelity, responsive healthcare management platform designed to bridge the gap between patients and medical professionals.

## 🚀 Features

### Patient Portal
- **Interactive Dashboard**: Health metrics and appointment summaries.
- **Smart Booking**: Find doctors by specialty and book slots instantly.
- **Notifications**: Stay updated with appointment reminders and medical alerts.
- **Visit History**: Detailed timeline of past consultations and prescriptions.

### Doctor Portal
- **Dynamic Schedule**: Manage daily consultations and patient flow.
- **Consultation Engine**: In-session medical logging and prescription generation.
- **Patient Management**: Centralized records of all assigned patients.

### Admin Portal
- **Reports & Analytics**: High-detail business intelligence with live charting (Recharts).
- **Global Management**: Manage all doctors, patients, and hospital schedules.
- **System Settings**: Configure platform-wide parameters.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS (CSS Variables + Grid + Flexbox)
- **Charts**: Recharts
- **Icons**: Lucide React + FontAwesome
- **Animations**: native CSS animations for high performance

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🧹 Project Structure

- `src/components/layout`: Modular layouts for different user roles.
- `src/pages`: Feature-specific pages for Public, Patient, Doctor, and Admin.
- `src/styles`: Centralized design system using CSS variables and modular stylesheets.
- `src/services`: API interaction layer.
