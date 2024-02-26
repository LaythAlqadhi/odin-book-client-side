# Odinbook Client Side
This this a social media web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with the Tailwind CSS framework for styling.
Check out the [server-side repo](https://github.com/LaythAlqadhi/odin-book-server-side).

## Preview
Check out the web application [Odinbook](https://odinbook-eight.vercel.app) to explore its features.

## Screenshots
![Authentication page](./public/screenshot_1.jpeg)
![Home page](./public/screenshot_2.jpeg)
![Profile page](./public/screenshot_3.jpeg)

## Pages
- Authentication page
- Home page
- Search page
- Profile page
- Follow requests page
- Not Found Page

## Features
- Enabled post creation, liking, commenting, and sharing.
- Designed intuitive page layouts displaying post content, author info, comments, and likes.
- Implemented Search functionality for user discovery, allowing users to find others by name or username.
- Ensured robust authentication using JWT, supporting username-password and GitHub methods.
- Customized user profiles with personalized info and role-specific buttons.
- Prioritized responsive design and accessibility compliance to ensure seamless user experience across devices and inclusivity for all users.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Development:**
   To start the development server, run:
   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. **Building the Application:**
   To build the application for production, run:
   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

5. **Previewing the Build:**
   To preview the production build locally, run:
   ```bash
   npm run preview
   ```

   or

   ```bash
   yarn preview
   ```

6. **Running Tests:**
   To run tests, execute:
   ```bash
   npm test
   ```

   or

   ```bash
   yarn test
   ```

## Additional Notes

- Make sure to have Node.js and npm/yarn installed and properly configured on your machine.
- This application uses ESLint for code linting and Prettier for code formatting. You can run linting using:
  ```bash
  npm run lint
  ```
  or
  ```bash
  yarn lint
  ```

- The application uses Vite as the build tool, React for the UI library, and React Router for routing.
- For detailed configuration and customization, refer to the `package.json` file and the respective configuration files (`eslintConfig`, `prettier`, etc.).
