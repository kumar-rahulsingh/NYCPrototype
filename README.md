# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- 
## 1. Overview
This is a working prototype built to search properties by address, fetch details, and perform calculations like FAR and estimated building height.

## 2. Technologies Used
- React.js
- Axios for API requests
- Tailwind CSS for styling
- Vite (for React project setup)

## 3. Features Implemented
- Search for properties using an encoded address URL.
- Display property details: building area, lot area, and number of floors.
- Calculate and display the FAR and estimated building height.

## 4. How to Use
1. Enter an encoded  address in the search bar (e.g. 1055%20LEXINGTON%20AVENUE%2C%2010021).
2. Click "Search."
3. View the fetched property details and calculated results below the search bar.

## 5. API Integration Details
- **Search API:** Fetches BBL based on the encoded address.
- **Property API:** Retrieves property details using the BBL.
- **Calculations:** FAR and maximum building height estimations are calculated.

## 6. Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run the application using `npm run dev`.

## 7. Code Explanation
- `PropertySearch.jsx`: Handles user input, API calls, and state management.
- Data is fetched using Axios and displayed in the UI with calculated results.


