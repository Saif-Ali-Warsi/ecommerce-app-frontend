<div align="center">

React E-Commerce App
A responsive e-commerce application built with React, TypeScript, and Vite, featuring product browsing, search, cart and wishlist management, authentication, and a checkout flow.

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Yup-593D88?style=for-the-badge&logoColor=white" alt="Yup" />
  <img src="https://img.shields.io/badge/DummyJSON-111827?style=for-the-badge&logoColor=white" alt="DummyJSON API" />
</p>

</div>

Screenshots
Home Page

<div align="center">
  <img src="https://www.image2url.com/r2/default/images/1792079418055-b32db9e3-df75-4f2f-b2b0-dc4f117daed1.jpg" alt="E-commerce application home page" width="100%" />
</div>

Products List

<div align="center">
  <img src="https://www.image2url.com/r2/default/images/1792080147125-163c9364-2975-4ab6-801f-ff3aed9514eb.png" alt="Products listing page" width="100%" />
</div>

Shopping Cart

<div align="center">
  <img src="https://www.image2url.com/r2/default/images/1792080511217-06e129d7-4073-44a1-ad2d-95d180044512.jpg" alt="Shopping cart page" width="100%" />
</div>

Order Confirmation

<div align="center">
  <img src="https://www.image2url.com/r2/default/images/1792080517064-2eeeaf3f-976e-47a8-b291-a3cfd110a5e0.jpg" alt="Order confirmation page" width="100%" />
</div>

Features

- Product browsing: Browse products and view individual product details.
- Search and filtering: Search products and use listing controls, sorting, and pagination.
- Shopping cart: Add products, update quantities, and remove items.
- Wishlist: Add or remove products from a wishlist.
- Authentication: Login flow with protected checkout access.
- Checkout form: Form handling and validation with React Hook Form and Yup.
- Order confirmation: Display an order confirmation after checkout.
- Persistent state: Store cart, wishlist, and authentication data in browser localStorage.
- Loading and error states: Handle loading, empty results, and request errors.
- Performance: Lazy-load page components and use Suspense for loading fallbacks.
- Error handling: Use an Error Boundary to provide a fallback UI for rendering errors.
- Reusable components: Share product cards, layouts, and other UI components.
  Technology Stack
  Technology Purpose
  React Component-based user interface
  TypeScript Static typing for components, props, and application data
  Vite Development server and build tooling
  React Router Client-side navigation and route handling
  React Context API Shared cart and authentication state
  React Hook Form Form state and submission handling
  Yup Schema-based form validation
  DummyJSON API Product data and demo authentication endpoints
  Browser localStorage Persist selected client-side state
  HTML and CSS Application structure and styling

Getting Started
Prerequisites

- Node.js (an active LTS version is recommended)
- npm
  Installation

1. Clone this repository:
   git clone YOUR_GITHUB_REPOSITORY_URL
2. Move into the project directory:
   cd YOUR_PROJECT_FOLDER
3. Install dependencies:
   npm install
4. Start the development server:
   npm run dev
5. Open the local URL printed by Vite in your terminal.
   Build for production
   npm run build
   To preview the production build locally:
   npm run preview
   Project Structure
   The exact structure may vary as the project evolves. Main areas include:
   src/
   ├── components/
   │ ├── auth/
   │ ├── common/
   │ ├── layout/
   │ └── products/
   ├── context/
   ├── pages/
   ├── services/
   ├── types/
   ├── validations/
   ├── App.tsx
   └── main.tsx
   Notes

- This is a frontend demonstration project. Checkout and order confirmation do not represent a real payment or order-processing system unless connected to a production backend.
- Demo authentication and product data depend on the configured DummyJSON endpoints.
- Client-side localStorage is suitable for demonstration persistence, but it is not a secure store for sensitive information.
- Never place private API keys or secrets in frontend source code.
Learning Goals
This project is also used to practise React concepts, including component composition, props, state, effects, Context API, routing, form handling, validation, lazy loading, and error handling.
<div align="center">
  Built as a hands-on React and TypeScript learning project.
</div>
