# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Start Development local server

```bash
npm run dev
```

## Build local server

```bash
npm run build
```

## Tests

```bash
# Run migrations on test database
NODE_ENV=test npx sequelize-cli db:migrate
# Run tests
npm run test
```

## Demo users

#### This credentials can be used to login.

Email:

- myrl.wiza@yahoo.com
- tina.stanton@yahoo.com
- calista_ferry@yahoo.com
- emily81@hotmail.com
- mario.thompson64@yahoo.com
- jaren_balistreri@gmail.com
- carolina_russel2@yahoo.com
- dorian.rutherford57@hotmail.com
- daisha_kuphal@gmail.com
- ruthe50@hotmail.com
- aletha_kilback@hotmail.com
- modesto74@gmail.com
- corene.langworth@yahoo.com
- cecelia_hickle@yahoo.com
- caesar99@yahoo.com
- alexander_jast6@gmail.com
- marty84@hotmail.com
- camylle.dooley@gmail.com
- easter.denesik20@hotmail.com
- manley_vonrueden59@gmail.com

Password for all users: test1234

### API Response Format

```js
{
  error: false, // required
  errorCode: "VAL001", // ej. VAL001 = Validation failed on fields, required when error = true.
  errorFields: [], // required when validation error.
  status: "200", // required
  message: "success", // required
  result: {} // Object or Array. required
}
```
