# Second Hand

NL2SQL untuk Chatbot dengan Semantic Parsing Menggunakan Metode Berbasis Aturan adalah sistem yang digunakan untuk membantu pengguna dalam mengakses informasi pada basis data Sistem Informasi Akademik dengan masukan sistem berupa bahasa alami berupa kalimat perintah atau tanya melalui antarmuka chatbot dengan pendekatan semantic parsing menggunakan metode berbasis aturan, dan menghasilkan keluaran berupa Structured Query Language (SQL) beserta data hasil query basis data.

## Run Locally

Clone the project

```bash
  git clone https://github.com/adikurniawanid/express-unsribot-api.git
```

Go to the project directory

```bash
  cd express-unsribot-api
```

Install dependencies

```bash
  npm install
```

Create the database

```bash
  sequelize db:create
```

Migration the database

```bash
  sequelize db:migrate
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DEV_DB_USERNAME`
`DEV_DB_PASSWORD`
`DEV_DB_NAME`
`DEV_DB_HOST`

`TEST_DB_USERNAME`
`TEST_DB_PASSWORD`
`TEST_DB_NAME`
`TEST_DB_HOST`

`DATABASE_URL`

`TELEGRAM_BOT_TOKEN`
`TELEGRAM_BOT_MANUALBOOK_FILE_ID`
`API_URL`

## Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/13454122/2s847FwETp#f2637bbe-af46-449f-87cb-17e8293fa436)

## Tech Stack

NodeJS, ExpressJS, MySQL
