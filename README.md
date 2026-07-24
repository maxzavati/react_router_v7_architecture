## Architecture
This project demonstrates the Backend-for-Frontend (BFF) architecture pattern. It also uses the Model-View-ViewModel (MVVM) pattern to ensure a clear and consistent separation between business logic and the user interface.

📖 [React Router docs](https://reactrouter.com/)

## Project Screenshots

![Home Page](public/screenshots/01.png)
_Home Page_

![Media Details](public/screenshots/02.png)
_Media Details_

![Profile Page](public/screenshots/03.png)
_Profile Page_

![Favorites Feature](public/screenshots/04.png)
_Favorites Feature_

## Getting Started

### Create .env file

To run the project you'll need the following `.env` variables:

- VITE_BASE_DOMAIN=http://localhost:5173
- VITE_SESSION_SECRET=random characters string
- VITE_ACCESS_TOKEN=can be obtained here: https://developer.themoviedb.org/docs/getting-started
- VITE_API_KEY=can be obtained here: https://developer.themoviedb.org/docs/getting-started
- VITE_API_BASE_URL=https://api.themoviedb.org/3
- VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```
