# MIU Food Ordering System

This documentation will guide you through the process of cloning the project and running the frontend on your local machine.

## Prerequisites

Before getting started, ensure you have the following installed:

* **Node.js** (LTS recommended)
  Download: [https://nodejs.org](https://nodejs.org)
* **npm** (comes with Node) or **yarn** or **pnpm**
* **Git**

You can verify installations by running these commands in your terminal:

```bash
node -v
npm -v
git --version
```

---

## 1. Clone the Repository

Use Git to clone the project:

```bash
git clone https://github.com/FerdinandGang4/Food-Ordering-System.git
```

Then move into the project folder:

```bash
cd FrontEnd_React
```

---

## 2. Install Dependencies

Once you are in the project directory, you need to install the necessary dependencies. Install required packages using one of the following package managers:

### Using npm:

```bash
npm install
```

### Using yarn:

```bash
yarn install
```

### Using pnpm:

```bash
pnpm install
```
This command reads the dependencies listed in the `package.json` file and downloads them into the `node_modules` folder.


## 3. Start the Development Server

After the installation is complete, you can start the development server. Run the app locally with:

### npm:

```bash
npm run dev
```

### yarn:

```bash
yarn dev
```

### pnpm:

```bash
pnpm dev
```

You should see output similar to:

```
VITE vX.X.X  ready in X ms
➜  Local:   http://localhost:3000/
```

Open the URL in your browser to view the application.

---

## 4. Build for Production (optional)

To create a static, optimized version of the app for deployment:

### npm:

```bash
npm run build
```

### yarn:

```bash
yarn build
```

### pnpm:

```bash
pnpm build
```

This will create a `dist/` folder containing the compiled output, ready for serving.

---

## 5. Preview Production Build (optional)

To preview the production build locally:

### npm:

```bash
npm run preview
```

### yarn:

```bash
yarn preview
```

### pnpm:

```bash
pnpm preview
```

---

## Additional Notes

* Vite supports hot-module replacement (HMR), so edits will reflect instantly.
* If ports conflict, Vite will prompt or you can change it in `vite.config.js`.
