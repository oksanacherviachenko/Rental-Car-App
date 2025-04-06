# RentalCar

A frontend web application for the **RentalCar** company, which specializes in car rentals. The app allows users to browse a catalog of cars, filter by parameters, view car details, and book a rental — all with a clean, user-friendly interface.

## Project Overview

RentalCar is a single-page React application developed with Vite and Redux. It integrates with a ready-made backend API to fetch data about cars available for rent. The app supports advanced filtering, a responsive UI, persistent favorites, and rental form submission.

## 🔧 Tech Stack

- **React** (with Vite)
- **Redux Toolkit** for state management
- **React Router** for routing
- **Axios** for HTTP requests
- **CSS Modules** for styling
- **Backend API**: [car-rental-api.goit.global](https://car-rental-api.goit.global/api-docs/)

## Key Features

- **Home Page** with banner and call-to-action
- **Catalog Page** displaying car cards with:
- Filtering by brand, rental price, and mileage (server-side)
- Load More functionality (pagination via backend)
- Favorite button with localStorage persistence
- **Car Details Page** with:
- Full car specifications
- Booking modal with form validation and success notification
- **Favorites** persisted in localStorage
- **404 Page** for unmatched routes
- **Responsive design** (desktop layout required, adaptive optional)
- **Clean UI** consistent with Figma mockup

## Installation & Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/oksanacherviachenko/rental-car.git
   cd rental-car
   Install dependencies:

   ```

npm install
Start the development server:

npm run dev
Build for production:

npm run build
Deployment
The project is deployed on Vercel and can be accessed here:
👉 Live Demo

Author
Oksana Cherviachenko
kvintinovna@gmail.com
LinkedIn - https://www.linkedin.com/in/oksana-cherviachenko
GitHub - https://github.com/oksanacherviachenko

This project was created as part of a technical assignment and demonstrates best practices in modern React development.
