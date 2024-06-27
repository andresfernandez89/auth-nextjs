## AUTHENTICATION - NEXT JS

Website with user authentication, registration, login, and logout. Data validation is handled using zod and react-hook-form.

## Demo

https://auth-nextjs-git-main-andresfernandez89s-projects.vercel.app/

![GIF demo](https://drive.google.com/uc?export=view&id=1zXIXPkMSNqWhBtZF9_UN3S64dGhTVnOp)

## Tech Stack

next js, typescript, tailwind, shadcn, prisma, bcryptjs, jose, zod, react-hook-form ,next-auth, vercel.

## Run Locally

Clone the project

```bash
  git clone https://github.com/andresfernandez89/auth-nextjs.git
```

Go to the project directory

```bash
  cd auth-nextjs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your **`.env`** file:

**ROOT_URL**: The base URL of your application.

**JWT_SECRET**: Secret key for signing JWTs.

**AUTH_TRUST_HOST**: Trusted host for authentication.

**AUTH_SECRET**: Secret key for encrypting auth data.

**AUTH_GOOGLE_ID**: Google OAuth client ID.

**AUTH_GOOGLE_SECRET**: Google OAuth client secret.

**POSTGRES_URL**: Connection string for PostgreSQL with SSL.

**POSTGRES_PRISMA_URL**: Connection string for PostgreSQL used by Prisma.

**POSTGRES_URL_NO_SSL**: Connection string for PostgreSQL without SSL.

**POSTGRES_URL_NON_POOLING**: Connection string for PostgreSQL without pooling.

**POSTGRES_USER**: PostgreSQL database username.

**POSTGRES_HOST**: PostgreSQL database host address.

**POSTGRES_PASSWORD**: PostgreSQL database password.

**POSTGRES_DATABASE**: PostgreSQL database name.

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andresfernandez89/)
