# EazyTrip - Travel Information & Planning Platform

A comprehensive travel planning platform that helps users discover destinations, understand travel distances and costs, and plan their trips efficiently.

## 🚀 Features

- **City Discovery**: Explore tourist destinations with detailed information
- **Travel Planning**: Calculate distances, travel times, and costs
- **Day & Weekend Trips**: Find nearby destinations for short getaways
- **Experience Recommendations**: Discover activities and experiences
- **Stay Area Guidance**: Get recommendations on where to stay
- **Cost Estimation**: Transparent budget planning for your trips

## 📁 Project Structure

```
easytrip/
├── backend/          # FastAPI backend application
├── frontend/         # Next.js frontend application
├── docs/             # Documentation files
├── README.md         # This file
└── tech_stack.md     # Technical stack documentation
```

## 🛠️ Tech Stack

- **Backend**: Python 3.11+ with FastAPI
- **Frontend**: Next.js 14 with TypeScript
- **Database**: PostgreSQL 15+
- **Cache**: Redis
- **Deployment**: Docker, GitHub Actions

See [tech_stack.md](./tech_stack.md) for detailed technical documentation.

## 🏃 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Installation

Coming soon...

## � Git Deployment Strategy

This project uses a **three-branch Git workflow** with automated pull requests for streamlined deployments:

### Branch Hierarchy

1. **feature/** → **develop** (Development branch)
   - Feature branches follow the pattern `feature/*`
   - CI runs on all feature branch pushes for sanity checks
   - Developers create pull requests to merge features into `develop`

2. **develop** → **master** (Production branch)
   - After a pull request is merged into `develop`, GitHub Actions automatically creates a PR from `develop` to `master`
   - `master` is the primary production-ready branch
   - Automated workflow: `.github/workflows/auto-pr-develop-to-master.yml`

3. **master** → **main** (Backup branch)
   - After a pull request is merged into `master`, GitHub Actions automatically creates a PR from `master` to `main`
   - `main` serves as a backup copy synchronized with master
   - Automated workflow: `.github/workflows/auto-pr-master-to-main.yml`

### Automated CI/CD Workflows

- **Feature Branch CI** (`feature-ci.yml`): Validates code quality on every push to feature branches
- **Auto PR: develop → master** (`auto-pr-develop-to-master.yml`): Creates automatic pull requests when changes merge to develop
- **Auto PR: master → main** (`auto-pr-master-to-main.yml`): Creates automatic pull requests when changes merge to master, keeping main in sync as a backup

### Workflow Example

```
feature/user-auth (push)
    ↓
  [CI runs]
    ↓
  (Create PR) → develop
    ↓
  (Manual review & merge to develop)
    ↓
  [Auto-create PR] develop → master
    ↓
  (Review & merge to master - Production!)
    ↓
  [Auto-create PR] master → main
    ↓
  (Merge to main - Backup sync)
```

## �📝 Development Roadmap

- [ ] Project setup and structure
- [ ] Database schema and models
- [ ] Backend API development
- [ ] Frontend UI development
- [ ] Testing and deployment

## 📄 License

This project is licensed under the MIT License.


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
