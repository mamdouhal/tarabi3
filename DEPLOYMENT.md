# Tarabi3 Deployment Guide

This guide covers deploying the Tarabi3 monorepo to Cloudflare Workers and Pages.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally with `npm install -g wrangler`
3. **Node.js**: Version 18.0.0 or higher
4. **Authenticate with Cloudflare**: Run `wrangler login` to authenticate

## Project Structure

- `apps/api/` - Hono API backend (Cloudflare Workers)
- `apps/web/` - Next.js frontend (Cloudflare Workers via OpenNext)

## Configuration

### Cloudflare Account Details

- **Account ID**: `a4f1645e4dad79aa23c58fde076ca4d6`
- **Workers Subdomain**: `mamdouh200464.workers.dev`

### API Configuration (`apps/api/wrangler.jsonc`)

The API is configured to deploy as a Cloudflare Worker with the following features:
- D1 Database binding for persistent storage
- CORS enabled for frontend communication
- Observability enabled for monitoring

### Web Configuration (`apps/web/wrangler.jsonc`)

The frontend uses `@opennextjs/cloudflare` to build and deploy the Next.js app to Cloudflare Workers.

## Setting Up D1 Database

1. Create a D1 database:
   ```bash
   wrangler d1 create tarabi3-db
   ```

2. Copy the `database_id` from the output and update `apps/api/wrangler.jsonc`:
   ```jsonc
   "d1_databases": [
     {
       "binding": "DB",
       "database_name": "tarabi3-db",
       "database_id": "YOUR_ACTUAL_DATABASE_ID"
     }
   ]
   ```

3. Apply database migrations (if any):
   ```bash
   wrangler d1 execute tarabi3-db --file=./schema.sql
   ```

## Environment Variables

### API (`apps/api/`)

| Variable | Description |
|----------|-------------|
| `FRONTEND_URL` | URL of the frontend app for CORS configuration |

### Web (`apps/web/`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL of the API backend |

## Local Development

### Install Dependencies

```bash
npm install
```

### Run API Locally

```bash
npm run dev:api
```

The API will be available at `http://localhost:8787`.

### Run Web Locally

```bash
npm run dev
```

The web app will be available at `http://localhost:3000`.

### Preview Web on Cloudflare Locally

```bash
cd apps/web && npm run preview
```

This builds the Next.js app with OpenNext and runs it locally using Wrangler.

### Run Both Together

Open two terminal windows and run:
- Terminal 1: `npm run dev:api`
- Terminal 2: `npm run dev`

## Deployment

### Deploy API Only

```bash
npm run deploy:api
```

This deploys the Hono API to Cloudflare Workers at:
`https://tarabi3-api.mamdouh200464.workers.dev`

### Deploy Web Only

```bash
npm run deploy:web
```

This builds the Next.js app with OpenNext and deploys it to Cloudflare Workers at:
`https://tarabi3-web.mamdouh200464.workers.dev`

### Deploy Both

```bash
npm run deploy
```

This deploys both the API and web applications.

## Deployment URLs

After deployment, your applications will be available at:

- **API**: `https://tarabi3-api.mamdouh200464.workers.dev`
- **Web**: `https://tarabi3-web.mamdouh200464.workers.dev`

## Troubleshooting

### Authentication Issues

If you encounter authentication errors:
```bash
wrangler logout
wrangler login
```

### Build Failures

For web build failures, ensure you have the latest dependencies:
```bash
npm install
npm run build --workspace=apps/web
```

### D1 Database Issues

To check your D1 databases:
```bash
wrangler d1 list
```

To run queries directly:
```bash
wrangler d1 execute tarabi3-db --command="SELECT * FROM projects LIMIT 5"
```

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [OpenNext Cloudflare Adapter](https://opennext.js.org/cloudflare)
- [Hono Documentation](https://hono.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
