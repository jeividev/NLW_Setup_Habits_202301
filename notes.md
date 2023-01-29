## Initializing

Npm is a nodejs package manager, it starts with the command: `npm init`. After inictialization, the **_package.json_** file is created.

Run the command below:
```sh
npm init -y
```

## TypeScript

File to manage typescript: **_tsconfig.json_**. The file must be in the root of the project.

We can create the file with the command:
```sh
npx tsc --init
```

For Nodejs to be able to understand TypeScript, we need to **_TSX_**, installing it with the command:
```sh
npm i tsx -D
```

### Run Server:
We can run the server with the commands
1. At the terminal:
```sh
npx tsx src/server
```
2. Or modify the **_package.json_**, adding in _scripts_: `"dev": "tsx watch src/server.tsx"`

## Fastify
Frameword for server creation, inspired by Express and Hapi. Provides a faster and more convenient experience.

Install with npm:
```sh
npm i fastify
```
#### Methods
Frameword uses methods HTTP:
- Get: Search for information
- Post: Create information
- Put: Update
- Patch: Update specific
- Delete: Delete resource

## Prisma
Prisma is an ORM solution. Integrates databases in an easy, safe and ganeralized way, regardless of the database used

Install with npm:
```sh
npm install prisma --save-dev
```

Start with database SQLite:
```sh
npx prisma init --datasource-provider SQLite
```

### Studio
```sh
npx prisma studio
```

### Create Table
_Example:_
```prisma
model nameTable {
  id String @id @default(uuid())
  title String
  create_at Datetime

  @@map("habits")
}
```
- `model` is the generic name for creating tables.
- `@@map("nameTable")` will be the name of the table in the database.


### Migration
Database versioning

```sh
npx prisma migrate dev
```
Will read the schema.prima file and analyze all the changes since the last moment the command was used, after generating a file that will be executed in the database.

_Server.ts_:
```ts
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
```

### Seed
```sh
npx prisma db seed
```


## Cross-Origin Resource Sharing (Cors)
Security mechanism to specify what information will be send to front end
```sh
npm i @fastify/cors
```

_Server.ts_:
```ts
import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify()
app.register(cors)
```
# Front End

## Vitejs
Create an easy and fast development environment

Install:
```sh
npm create vite@latest
```

Start:
```sh
cd folderName
npm install
npm run dev
```

## CSS
```sh
npm install -D tailwindcss postcss autoprefixer
```
- **postcss:** Automate tasks within css;
- **tailwindcss:** _postcss_ Plugin;
- **autoprefixer:** Add browser prefixes.

### Init TailwindCss
```sh
npx tailwindcss init -p
```
