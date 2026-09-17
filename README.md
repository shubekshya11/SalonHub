# Salon Booking System

A simple salon appointment booking system built with **React.js**, **Django REST Framework**, and **SQLite**.

## Features

* Add, edit, and delete salon services
* Book appointments
* View and filter appointments by status
* Update appointment status
* Delete appointments
* Form validation
* Prevent duplicate bookings for the same service, date, and time
* REST API integration

## Tech Stack

* **Frontend:** React.js, JavaScript
* **Backend:** Django, Django REST Framework
* **Database:** SQLite

## Project Structure

salon-booking/
├── frontend/
├── backend/
└── README.md

## Setup & Run

### 1. Clone the repository

```bash
git clone <repository-url>
cd salon-booking
```

### 2. Backend

```bash
cd backend
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### 3. Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Database

The project uses **SQLite**. Django handles the database through its migrations, and data is stored in `db.sqlite3`.


## Running the Project

Both the Django backend and React frontend need to be running at the same time. The React frontend communicates with the Django REST API for storing and retrieving data.
