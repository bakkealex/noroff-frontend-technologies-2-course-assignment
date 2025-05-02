# Noroff

## Back-end Development Year 2

### FTS - Course Assignment

# Assignment

You are going to create a Next.js front-end app for a movie theatre company.

A backend will be supplied for you. This backend is similar to the project you completed in Back-End Technologies and contains data related to movies.

You will create an app that lets you view movies as a customer as well as further details on an individual movie.

You will also be able to act as admin and perform CRUD operations on movies and related data.

Note: You will not be required to setup any authentication or authorization.

Note: The backend data will be refreshed regularly.

Note: All participants are required to adhere strictly to ethical and professional standards during the development of this project.
It is prohibited to upload, store, or process any explicit, inappropriate, or offensive content within the project's infrastructure. Violations of this policy may result in disciplinary actions, including but not limited to, exclusion from the project, a failing grade, and potential further action by the institution. Please maintain the integrity and professionalism expected in an academic environment.

# Noroff FTS - Course Assignment

## Overview

This project is a **Next.js front-end application** for a movie theatre company, created as part of the Noroff Back-end Development Year 2 curriculum.  
It allows users to view movies as customers, see detailed information about each movie, and, as an admin, perform CRUD operations on movies and related data (actors, genres, studios).

A backend API is provided for you.  
**Reference API documentation:**  
[Swagger: http://movies.restapi.co.za/swagger/index.html](http://movies.restapi.co.za/swagger/index.html)

---

## Requirements

- **Node.js** (v22 or later) and **npm** (v11 or later) installed on your machine.

---

## Features

- Browse all movies and view detailed information
- Admin dashboard for managing movies, actors, genres, and studios
- Add, edit, and delete movies and related entities (CRUD)
- Responsive design with Tailwind CSS
- **Caching:**
  - Client-side caching for dashboard stats
  - API route caching for movies and dashboard data
  - Server-side caching with revalidation for improved performance
- Error handling and loading states for all pages
- No authentication required
- Workaround for Noroff API's missing actor[] array in the response for the `/movies/{id}` endpoint

---

## Environment Setup

You **must** create your own `.env.local` file in the project root.  
Example:

```env
NEXT_PUBLIC_API_URL=http://movies.restapi.co.za/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/noroff-backend-2/aug24ft-fts-ca-bakkealex.git
   cd aug24ft-fts-ca-bakkealex/fet-module-5-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your environment variables**

   - Copy the example from above into `.env.local` and adjust if needed.

4. **Start the backend API**

   - The backend API **must be running and accessible** at the URL you set in `NEXT_PUBLIC_API_URL` before you build or run the app.
   - If you do not control the backend, ensure the provided API is online.

5. **Start the development server**
   ```bash
   npm run dev
   ```
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## Building and Running in Production

1. **Build the app**  
   _The backend API must be running and accessible during this step!_

   ```bash
   npm run build
   ```

2. **Stop the development server if running**

3. **Start the production server**
   ```bash
   npm run start
   ```
   - The app will be available at [http://localhost:3000](http://localhost:3000)

---

## Testing

- **Run all tests:**
  ```bash
  npm test
  ```
- **Run tests in watch mode:**
  ```bash
  npm run test:watch
  ```
- The app uses [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) for unit and integration tests.

---

## Caching

- **Client-side caching:** Dashboard stats are cached in localStorage for a short period.
- **API route caching:** Custom API routes cache movie and dashboard data for improved performance and reduced API calls.
- **Server-side caching:** Uses Next.js revalidation for incremental static regeneration.

---

## Note

- There are some pages that use **force-dynamic** to ensure that the app builds correctly. This is due to the app having its own API routes that are used to fetch data from the backend API for cache and the aforementioned workaround for the missing actor[] array in the response for the `/movies/{id}` endpoint.

## References

- API documentation: [Swagger UI](http://movies.restapi.co.za/swagger/index.html)
- Next.js: [https://nextjs.org/](https://nextjs.org/)
- Tailwind CSS: [https://tailwindcss.com/](https://tailwindcss.com/)
- Jest: [https://jestjs.io/](https://jestjs.io/)
- React Testing Library: [https://testing-library.com/](https://testing-library.com/)
- AnimatePresence: [https://motion.dev/docs/react-animate-presence](https://motion.dev/docs/react-animate-presence)

---

## License

This project is for educational purposes as part of the Noroff curriculum.
