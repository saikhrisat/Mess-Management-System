# MessMate: The Ultimate Mess Management Solution

<div align="center">
  <img src="https://placehold.co/600x300.png?text=MessMate" alt="MessMate Banner" data-ai-hint="app banner" style="border-radius: 1rem;"/>
</div>

<div align="center">

**Simplify Mess Management for Everyone**

</div>

---

MessMate is a comprehensive web application designed to streamline every aspect of mess management. It serves as a central hub for **Mess Owners**, **Managers**, and **Students**, fostering seamless communication, transparent financial tracking, and efficient meal planning. Our goal is to eliminate administrative overhead and enhance the dining experience for everyone involved.

## ✨ Features

MessMate is designed with role-based access to provide tailored experiences for each user type. Here's a look at the current features:

### 👩‍🎓 For Students

- **Personalized Dashboard:** A central hub with a personalized welcome message. It shows key stats like pending dues, today's special meal, and average cost per meal. It also features a combined analytics card displaying meal consumption progress and an interactive expense distribution pie chart.
- **Meal Management:**
  - **Weekly Menu:** Browse the full weekly meal plan at a glance through a tabbed interface.
  - **Meal Booking & Cancellation:** An interactive calendar allows students to cancel meals for specific dates or a date range, helping them save money.
- **Attendance Tracking:** A visually engaging dashboard with a GitHub-style contribution grid to track meal consumption and mess presence over the past 30 days.
- **Billing & Payments:** A dedicated page to view the current month's bill breakdown (including credits and debits), total dues, and a complete, searchable payment history.
- **Transparent Mess Expenses:** A detailed breakdown of all mess expenses, split into utilities and infrastructure. Features an interactive pie chart with smooth 3D pop-out effects and a 6-month cost trend analysis.
- **Feedback & Support Hub:** A comprehensive, tab-based system for submitting detailed feedback, rating daily meals with an interactive star system, filing specific complaints, and contacting the mess manager.
- **Profile Management:** A complete user profile page to manage personal information, contact details, and account settings. Includes a fully interactive profile picture uploader with drag-and-drop, preview, and removal capabilities, all synchronized with a functional header dropdown menu.

### 👨‍💼 For Managers

- **At-a-Glance Dashboard:** An overview of key mess statistics, including total students, daily attendance figures, students with pending payments, and monthly revenue.
- **Student Management:** View a list of recent student registrations.
- **Data Visualization:** A daily attendance trend chart provides insights into mess footfall over the past week.
- **Announcements:** A placeholder to post updates and announcements for all students.

### 🏢 For Owners

- **Business Overview Dashboard:** A high-level view of the entire mess business, tracking total revenue, expenses, and profit.
- **Financial Insights:** A detailed line chart visualizes monthly revenue vs. expenses, offering a clear view of financial performance.
- **Manager Management:** Oversee all mess managers and their current status (Active/Inactive).

## 💻 Tech Stack

This project is built with a modern, performant, and scalable tech stack.

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Database:** [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (for local development)
- **AI/Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application will be available at [http://localhost:9002](http://localhost:9002).

## 📂 Project Structure

The project follows a feature-driven structure within the Next.js App Router, making it organized and easy to navigate.

```
.
├── src/
│   ├── app/                    # Next.js App Router: all pages and layouts
│   │   ├── login/              # Login page and forms
│   │   ├── manager/            # Manager-specific routes and dashboard
│   │   ├── owner/              # Owner-specific routes and dashboard
│   │   ├── register/           # Registration page and forms
│   │   ├── student/            # Student-specific routes and dashboard
│   │   │   ├── dashboard/
│   │   │   ├── expenses/
│   │   │   ├── feedback/
│   │   │   ├── layout.tsx
│   │   │   ├── meals/
│   │   │   │   ├── attendance/
│   │   │   │   └── booking/
│   │   │   ├── payments/
│   │   │   └── profile/
│   │   ├── globals.css         # Global styles and ShadCN theme
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   │
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # Core ShadCN UI primitives
│   │   ├── footer.tsx          # Site-wide footer
│   │   ├── header.tsx          # Site-wide header
│   │   └── dev-db-viewer.tsx   # Dev utility to inspect the database
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   │
│   ├── lib/                    # Core logic, utilities, and services
│   │   ├── db.ts               # Database setup and query functions
│   │   ├── dev-actions.ts      # Server actions for dev tools
│   │   └── utils.ts            # Utility functions (e.g., cn)
│   │
│   └── ai/                     # Genkit AI configuration and flows
│       ├── genkit.ts
│       └── dev.ts
│
├── tailwind.config.ts          # Tailwind CSS configuration
└── next.config.ts              # Next.js configuration
```

## 🎨 Styling & Design System

Our design system is built on **Tailwind CSS** and **ShadCN UI** for a consistent and modern aesthetic.

- **Theming:** We use CSS variables for theming, defined in `src/app/globals.css`. The color palette is based on HSL values for easy customization of colors like `primary`, `secondary`, `accent`, and `background`.
- **Fonts:** We use `Poppins` for headlines and `PT Sans` for body text, imported from Google Fonts in the root layout (`src/app/layout.tsx`).
- **Glassmorphism:** A transparent, blurred background effect (`bg-card/80 backdrop-blur-sm`) is used on cards throughout the dashboards to create a sense of depth.
- **Interactivity:** Engaging UI elements like the smooth 3D pop-out effect on pie charts enhance the user experience.
- **Layout:** Most dashboard pages use a responsive CSS grid or flexbox to organize components, ensuring a great experience on all screen sizes. The student dashboard features a fully responsive sidebar with consistent highlighting for both main and sub-categories.

## 🏆 Contributing

We welcome contributions! Please follow these steps to contribute:

1.  **Fork the repository.**
2.  **Create a new branch:** `git checkout -b feature/your-feature-name`
3.  **Make your changes.**
4.  **Commit your changes:** `git commit -m 'Add some feature'`
5.  **Push to the branch:** `git push origin feature/your-feature-name`
6.  **Create a Pull Request.**

Please open an issue to discuss any significant changes before starting work.

## 🗺️ Future Roadmap

We have exciting plans for MessMate! Here's a look at what's coming next:

- **Full Manager Functionality:**
  - Interactive Menu Management (Create, Update, Delete menu items)
  - Student Payment Tracking & Management
  - Feedback Management System
- **Full Student Functionality:**
  - Online Fee Payments Integration
  - Real-time Notification Center
- **AI-Powered Features:**
  - **Meal Recommendation Engine:** Suggest meals based on student preferences and ratings.
  - **Expense Analysis:** Provide owners with AI-driven insights and cost-saving recommendations.
  - **Automated Announcement Generation:** Help managers draft announcements quickly.
- **General Enhancements:**
  - Dark Mode/Light Mode toggle.
- **Full backend database integration** with a production-ready database like PostgreSQL or MySQL.
