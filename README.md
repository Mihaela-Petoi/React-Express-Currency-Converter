# Currency Converter App

## Description
This is a full-stack currency converter application that allows users to perform real-time currency conversions. The project is built using React for the front-end and Express.js with Node.js for the back-end. The application is structured as two separate projects: a frontend and a backend, ensuring modularity and maintainability.

## Features
- Real-time currency conversion using an API
- User-friendly interface built with React
- Backend API powered by Express.js and Node.js
- Cross-Origin Resource Sharing (CORS) enabled for seamless communication between frontend and backend
- Error handling and validation for improved reliability

## Technologies Used
### Frontend
- React.js
- Axios for API requests

### Backend
- Node.js
- Express.js
- External currency exchange API (ExchangeRate-API)
- CORS for secure communication

## Installation & Setup

### Backend
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## API Usage
The backend provides a REST API to fetch real-time exchange rates. It interacts with an external currency exchange API and serves the data to the frontend.

## Contributing
Feel free to fork this repository and submit pull requests for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
