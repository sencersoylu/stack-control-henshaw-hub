# Repository Guidelines

This guide orients contributors working on the Stack Control Henshaw Hub Node.js service. Follow the practices below to keep deployments predictable and production safe.

## Project Structure & Module Organization
- `index.js` boots the Express server, Socket.IO bridge, chart rendering, and orchestrates sequencing logic.
- `src/routes/` exposes REST endpoints (see `src/routes/sensors.js` and `src/routes/index.js` for current handlers).
- `src/models/` contains the SQLite-backed Sequelize models (`sensor`, `config`, `patient`) used at runtime.
- `src/helpers/` holds shared utilities such as linear conversions; keep cross-cutting helpers here.
- `config/`, `migrations/`, and `seeders/` are Sequelize CLI assets—update them alongside schema changes.
- `log/`, `tmp/`, `chart.png`, and `profile_example.html` are generated artefacts; avoid committing local experiments inside them.

## Build, Test, and Development Commands
- `npm install` installs runtime dependencies (Chart.js, Socket.IO, Sequelize, Puppeteer, etc.).
- `npm start` runs `nodemon index.js` for auto-reloading the API during development.
- `node index.js` is the production entry point when nodemon is not desired.
- `npm run db:create` bootstraps the SQLite database (`coral.sqlite`) using `src/config/sequelize.js`.

## Coding Style & Naming Conventions
- Use CommonJS modules, single quotes, and tab indentation to mirror existing files (see `src/routes/index.js`).
- Name Sequelize models in PascalCase (`Sensors`) and instances/variables in camelCase (`sensorData`).
- Keep route files focused on transport concerns; move business logic into helpers or services before it grows large.
- No automated formatter is configured—run Prettier or ESLint locally if you add them, but do not change repository-wide style without consensus.

## Testing Guidelines
- There is no automated test suite yet; exercise new routes via `curl` or Postman (e.g. `curl http://localhost:3000/patients`).
- When adding tests, prefer Jest + Supertest under a `tests/` or `src/__tests__/` directory and wire a matching `npm test` script.
- Document manual validation steps in your pull request so reviewers can reproduce them quickly.

## Commit & Pull Request Guidelines
- Follow the existing history by using short, imperative commit messages (`add patient route`, `fix sensor sync`).
- Reference issue IDs in the commit body when applicable and group unrelated changes into separate commits.
- Pull requests should summarise the change set, list test evidence, and include screenshots for any chart or profile output changes.
- Request at least one reviewer before merging and wait for green status checks once a CI pipeline is introduced.
