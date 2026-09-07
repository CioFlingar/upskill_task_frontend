# Expense Dashboard Frontend

A lightweight React frontend for displaying expense data from a local API. The app is built with Vite, styled with Tailwind CSS and daisyUI, and is intended to run alongside a backend service that exposes an expenses endpoint.

## Features

- Fetches expenses from the backend when the app loads
- Adds new expenses from the dashboard
- Updates existing expenses from the dashboard
- Displays each expense title and amount in a simple dashboard card
- Uses Tailwind CSS and daisyUI for the interface
- Provides a fast Vite development workflow

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- ESLint

## Requirements

- Node.js 18 or newer
- npm
- A running backend API at:

  ```text
  http://127.0.0.1:8000/expenses/
  ```

## Getting started

1. Clone the repository:

   ```bash
   git clone https://github.com/CioFlingar/upskill_task_frontend.git
   cd upskill_task_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend service on port `8000`.

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open the local URL shown by Vite, usually [http://localhost:5173](http://localhost:5173).

## Available scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## API response

The frontend uses the following REST endpoints:

- `GET /expenses/` - return all expenses as a JSON array
- `POST /expenses/` - create an expense
- `PUT /expenses/{id}/` - replace an existing expense

Each expense should include an `id`, `title`, and `amount`. Create and update requests send `title` and numeric `amount` as JSON:

```json
[
  {
    "id": 1,
    "title": "Office supplies",
    "amount": 25.5
  }
]
```

If the API is unavailable, the browser console will report the request error. Make sure the backend is running and that it allows requests from the Vite development server.

## Project structure

```text
.
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and bundled assets
│   ├── App.jsx         # Main dashboard component
│   ├── App.css         # App-level styles
│   ├── index.css       # Tailwind and daisyUI imports
│   └── main.jsx        # React entry point
├── index.html
├── eslint.config.js
├── package.json
└── vite.config.js
```

## Production build

Create an optimized production build with:

```bash
npm run build
```

The generated files are placed in `dist/` and can be served by any static hosting provider.

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request with a clear description of the change.

## License

No license has been specified yet.
