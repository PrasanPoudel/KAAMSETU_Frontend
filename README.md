# Personal Portfolio

This repository contains the frontend program for KAAMSETU which is a job portal platform built using **React**, **Vite**, and **TailwindCSS**. The project showcases modern web development techniques including  responsive layouts, and interactive UI components.


## Features

- **Responsive Layout:** Fully responsive across desktop, tablet, and mobile devices.
- **Optimized Performance:** Fast development build using Vite with TailwindCSS for efficient styling.

## Technologies

- **React:** Component-based UI library.
- **Redux/ReduxToolkit:** Efficient state management.
- **Vite:** Fast and lean development build tool.
- **TailwindCSS:** Utility-first CSS framework.
- **JavaScript (ES6+):** Modern JavaScript features and best practices.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PrasanPoudel/KAAMSETU_Frontend.git
   cd KAAMSETU_Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application should now be running at [http://localhost:5173](http://localhost:5173).

## Build

To create a production build, run:

```bash
npm run build
```

## Folder Structure

```
KAAMSETU_Frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Applications.jsx
│   │   ├── DropdownWithLinks.jsx
│   │   ├── Faqs.jsx
│   │   ├── FeaturedJobs.jsx
│   │   ├── FileUploader.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobPagination.jsx
│   │   ├── JobPost.jsx
│   │   ├── Loader.jsx
│   │   ├── MyApplications.jsx
│   │   ├── MyJobs.jsx
│   │   ├── Navbar.jsx
│   │   ├── PopularJobs.jsx
│   │   ├── ResumeViewer.jsx
│   │   ├── SkeletonUiForJobs.jsx
│   │   ├── Spinner.jsx
│   │   ├── SpinnerHome.jsx
│   │   ├── UpdatePassword.jsx
│   │   ├── UpdateProfile.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── PostApplication.jsx
│   │   ├── Register.jsx
│   │   ├── SendMessage.jsx
│   ├── data/
│   │   ├── cities.js
│   │   ├── jobCategoryArray.js
│   ├── images/
│   ├── store/
│   │   ├── slices/
│   ├── apiURL.js
│   ├── store.js
├── App.css
├── App.jsx
├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
├── vite.config.js
```

## Customization

- **Tailwind CSS:** Modify the `App.css` file or add custom classes to further tweak the design.
- **Components:** Edit individual components in the `src/components/` folder to update content or styling.

## Contributing

Contributions are welcomed! Please open an issue or submit a pull request with improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Happy coding!
