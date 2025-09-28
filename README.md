# 🌲 Pinestore Client

A robust and type-safe TypeScript client library for interacting with the Pinestore API. Easily manage and fetch project, user, comment, and changelog data for your applications.

[![npm version](https://badge.fury.io/js/pinestore.svg)](https://badge.fury.io/js/pinestore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)
[![Bun](https://img.shields.io/badge/build%20tool-bun-black.svg)](https://bun.sh/)

## ✨ Features

- **Type-Safe API Calls**: Full TypeScript support for all API responses and request parameters.
- **Easy to Use**: Simple, static methods for common API interactions.
- **Consistent Error Handling**: Centralized error reporting for API failures.
- **Zero Dependencies**: Lightweight and efficient.

## Installation

```bash
npm install pinestore
```

or

```bash
bun add pinestore
```

or

```bash
yarn add pinestore
```

## Usage

Here's a quick example of how to fetch project data:

```typescript
import { Pinestore, Project, Comment, User } from 'pinestore';

async function main() {
  try {
    // Fetch a single project by ID
    const project: Project = await Pinestore.fetchProject(123);
    console.log(`Fetched Project: ${project.name} by ${project.owner_name}`);
    console.log(`Description: ${project.description_short}`);

    // Fetch all projects
    const allProjects: Project[] = await Pinestore.fetchProjects();
    console.log(`Total projects available: ${allProjects.length}`);

    // Search for projects
    const searchResults: Project[] = await Pinestore.searchProjects('my-game');
    console.log(
      `Search for "my-game" returned ${searchResults.length} results.`
    );

    // Fetch comments for a project
    const comments: Comment[] = await Pinestore.fetchComments(project.id);
    if (comments.length > 0) {
      console.log(`First comment on ${project.name}: ${comments[0].body}`);
    } else {
      console.log(`No comments found for ${project.name}.`);
    }

    // Fetch a user by Discord ID
    const user: User = await Pinestore.fetchUser('some_discord_id_here'); // Replace with actual Discord ID
    console.log(`Fetched User: ${user.name}`);
  } catch (error) {
    console.error('An error occurred:', error);
    // You can handle different error types or display user-friendly messages
  }
}

main();
```

## API Reference

The `Pinestore` class provides static methods to interact with the API. All methods return a `Promise`.

### Data Types (Interfaces)

- `Timestamp`: A `number` representing a Unix timestamp (seconds since epoch).
- `Project`: Represents a project, including details like name, owner, descriptions, download information, and various metrics.
- `Comment`: Represents a comment on a project, including the author, timestamp, and body.
- `Changelog`: Represents a changelog entry for a project, including timestamp and body.
- `UserConnection`: Represents an external connection for a user (e.g., GitHub, website).
- `User`: Represents a user, including their Discord ID, joined date, and linked connections.

### `Pinestore` Static Methods

- `Pinestore.fetchProject(projectId: number): Promise<Project>`
  - Fetches a single project by its ID.
- `Pinestore.fetchComments(projectId: number): Promise<Comment[]>`
  - Fetches all comments for a given project ID.
- `Pinestore.fetchChangelog(projectId: number): Promise<Changelog>`
  - Fetches the latest changelog entry for a given project ID.
- `Pinestore.fetchChangelogs(projectId: number): Promise<Changelog[]>`
  - Fetches all changelog entries for a given project ID.
- `Pinestore.fetchProjects(): Promise<Project[]>`
  - Fetches a list of all projects.
- `Pinestore.searchProjects(query: string): Promise<Project[]>`
  - Searches for projects based on a provided query string.
- `Pinestore.fetchProjectByName(name: string): Promise<Project>`
  - Fetches a single project by its exact name.
- `Pinestore.fetchUser(id: string): Promise<User>`
  - Fetches a user by their Discord ID.
- `Pinestore.fetchUserProjects(userId: string): Promise<Project[]>`
  - Fetches all projects owned by a specific user (identified by Discord ID).

## Development

To set up the development environment and contribute:

```bash
# Clone the repository
git clone https://github.com/ivanoliverfabra/pinestore-client.git # Update with actual repo URL
cd pinestore-client

# Install dependencies
bun install # or npm install / yarn install

# Build the library
bun run build # Compiles TypeScript to JavaScript

# Development mode (watches for changes and recompiles)
bun run dev

# Run tests
bun run test

# Lint the code for style and potential errors
bun run lint

# Format the code using Prettier
bun run format
```

## Publishing

To publish a new version to npm:

1.  Ensure all changes are committed and pushed.
2.  Update the version in `package.json` following [semantic versioning](https://semver.org/).
3.  Make sure you are logged in to npm with the correct account:
    ```bash
    npm login
    ```
4.  Publish the package:
    ```bash
    npm publish
    ```

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/your-amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: Add some amazing feature'`).
    - Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.
4.  Push to the branch (`git push origin feature/your-amazing-feature`).
5.  Open a Pull Request with a clear description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Ivan Oliver Fabra**

- GitHub: [@ivanoliverfabra](https://github.com/ivanoliverfabra)
- Email: ivan@iofabra.cc
- npm: [@ivanoliverfabra](https://www.npmjs.com/~ivanoliverfabra)
- Website/Portfolio: [iofabra.cc](https://iofabra.cc) (if applicable, add this)
