# HR Management System

A modern Human Resources (HR) management web application built with **Laravel**, **React**, **Inertia.js**, and **Ant Design**. This project provides a robust platform for managing employees, absences, leave requests (congés), payroll, departments, and HR documents.

## Features

- **User Authentication**: Secure login and registration using Laravel Breeze.
- **Employee Management**: CRUD operations for employees, departments, and payroll.
- **Absence & Leave Management**: Request, approve, and track absences and congés.
- **Document Management**: Upload and manage HR-related documents.
- **Admin & Employee Dashboards**: Role-based dashboards for different user types.
- **Modern UI**: Built with React, Ant Design, Tailwind CSS, and TW Elements for a responsive and user-friendly interface.
- **Inertia.js**: Seamless SPA experience with server-side routing and React frontend.
- **PDF Generation**: Export data and reports as PDF using jsPDF.
- **Calendar Integration**: Visualize absences and congés with FullCalendar.
- **Responsive Design**: Optimized for both desktop and mobile devices.


## Main Packages & Technologies

- **Backend**: Laravel 11, PHP 8.2+, Laravel Breeze, Sanctum, Eloquent ORM
- **Frontend**: React 18, Inertia.js, Ant Design, Tailwind CSS
- **PDF/Export**: jsPDF, jsPDF-Autotable
- **Icons**: Lucide React, Ant Design Icons

## Installation

```powershell
git clone <your-repo-url>
cd rh-management

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Build frontend assets
npm run dev

# Copy environment file and set app key
cp .env.example .env
php artisan key:generate

# Run migrations and seeders
php artisan migrate --seed

# Set up storage link for file uploads
php artisan storage:link

# Start the development server
php artisan serve
```

## Usage

- Access the app at `http://localhost:8000`
- Log in as an admin or employee to access respective dashboards and features.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request describing your changes.

