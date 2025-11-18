# Contributing to PrintBridge

Thank you for your interest in contributing to PrintBridge! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Provide details**:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment (OS, Node version, browser)
   - Code samples if applicable

### Suggesting Features

1. **Check existing feature requests**
2. **Provide context**:
   - Use case description
   - Why this feature is valuable
   - Proposed implementation (optional)

### Pull Requests

1. **Fork and clone** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Write clear, concise code
   - Add tests for new features
   - Update documentation as needed
4. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add text alignment options"
   ```
6. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/printbridge.git
cd printbridge

# Install dependencies
npm install

# Build packages
npm run build

# Run tests
npm run test

# Start development mode
npm run dev
```

### Project Structure

```
printbridge/
├── packages/
│   ├── core/          # Core layout engine
│   └── react/         # React components
├── apps/
│   └── demo/          # Demo application
└── examples/          # Usage examples
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define types explicitly (avoid `any`)
- Export types for public APIs

### Style Guide

- Follow existing code style
- Use Prettier for formatting: `npm run format`
- Use ESLint: `npm run lint`

### Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding tests
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

Examples:
```
feat: add masonry layout support
fix: text overflow in small areas
docs: update installation guide
test: add unit tests for image layout
```

### Testing

- Write unit tests for new features
- Maintain or improve code coverage
- Test edge cases

### Documentation

- Update README.md for new features
- Add JSDoc comments to public APIs
- Include code examples where helpful

## Package-Specific Guidelines

### @printbridge/core

- Keep framework-agnostic
- No DOM dependencies in core logic
- Optimize for performance
- Comprehensive unit tests

### @printbridge/react

- Follow React best practices
- Use hooks over class components
- Memoize expensive computations
- Provide TypeScript types for props

## Review Process

1. **Automated checks**: Tests and linting must pass
2. **Code review**: Maintainers will review your PR
3. **Feedback**: Address review comments
4. **Merge**: Once approved, maintainers will merge

## Getting Help

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Report bugs or request features
- **Discord**: [Coming soon]

## Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes
- GitHub contributors page

Thank you for contributing to PrintBridge!
