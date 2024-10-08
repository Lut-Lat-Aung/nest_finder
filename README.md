# Project 02: Full-Stack CRUD App (Nest Finder)

Nest Finder is a marketplace websit for people to find temporary homes and vacation rentals. The target user for this web app is renters (guests), property owners (hosts) and real-estate brokers who will connect property owners (hosts) and potential renters (guests). The application provides an intuitive interface for managing client profile, properties and bookings (reservations), making it easy to find and reserve the client's request.
 
 
**Team Members:**  
- Lut Lat Aung (Repo Link: https://github.com/Lut-Lat-Aung)
- Thu Ya Hlaing (Repo Link: https://github.com/HarryYin03)  
- Akira (Repo Link: https://github.com/AkiraGik)
 
 
## Table of Contents
 
- [Introduction](#introduction)
- [Features](#features)
- [How to Use](#how-to-use)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [API](#api)
- [Installation](#installation)
- [Contributing](#contributing)
 
## Introduction
 
Nest Finder is a web application designed to help the real-estate broker to manage apartment listings from property owners (hosts) and record the bookings made by potential renters (guests). There is also a interface to record the profiles of both host and guest containing informations. It make easier for profile management, apartment listing and booking management. Guests can choose from a variety of listings from the market to stay for a night or a month and book them. Property owners can list their apartment listing with ease.
 
## Features
 
- **Property Listings**: Can add, update, and delete their property listings with ease.
- **Reservation Management**: Record, update, delete booked-apartments.
- **Profile Management**: Add, update and delete personal information.
- **Cloudinary Integration**: Upload and manage property images using Cloudinary.
 
## How to Use
 
- **List a Property**: Navigate to "Nest your Home" and fill in the details to list your property.
- **Manage Property Listing**:  Edit or delete your property listings as needed.
- **View Listing**: Navigate to "Find Nests" 
- **Book a Property for stay**: In "Find Nest" Page, click a property of your liking. Fill in renter name, phone number and make a booking.
- **Manage Bookings**: Navigate to "View Booking" and you can edit or delete your booking.
- **Manage Profile**: Navigate to "Profiles" and you can add, update and delete profile for hosts and renters.
 
## Screenshots
- [HomePage](#HomePage)
- [ApartmentView](#ApartmentView)
- [BookedApartments](#BookedApartments)
- [UpdateApartments](#UpdateApartments)
- [NestYourHome](#NestYourHome)
- [AddApartments](#AddApartments)
- [UpdateApartments](#UpdateApartments)
- [Profiles](#Profiles)
- [EditProfiles](#EditProfiles)
  
### HomePage
![HomePage](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/HomePage.png)
 
### ApartmentView
![ApartmentView](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/ApartmentView.png)
 
### BookedApartments
![BookedApartments](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/BookedApartment.png)

### UpdateApartments
![UpdateApartments](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/UpdateBooking.png)
 
### NestYourHome
![NestYourHome](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/NestYourHome.png)

### AddApartments
![AddApartments](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/AddApartment.png)

### UpdateApartments
![UpdateApartments](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/UpdateApartment.png)

### Profiles 
![Profiles](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/ProfilePage.png)

### EditingProfiles
![EditProfiles](https://github.com/Lut-Lat-Aung/nest_finder/blob/main/image/EditProfile.png)

 
## Technologies Used
 
- **Frontend** -
    Next.js
    Axios
- **DataBase**: MongoDB
- **Deployment**: Vercel
- **Image Hosting**: Cloudinary
  
## API
 
#### Profile Endpoints
 
    GET /api/profiles     : Get all profiles.
    POST /api/profiles    : Create a new profile.
    PUT /api/profiles/    : Update a profile by ID.
    DELETE /api/profiles/ : Delete a profile by ID.
 
#### Property Endpoints
 
    GET /api/apartments    : Fetch all properties.
    POST /api/apartments   : Add a new property.
    PUT /api/apartments/   : Update a property by ID.
    DELETE /api/apartments/: Delete a property by ID.
 
#### Booking Endpoints
 
    GET /api/booked-apartments      : Get all bookings.
    POST /api/booked-apartments     : Create a new booking.
    PUT /api/booked-apartments/     : Update a booking by ID.
    DELETE /api/booked-apartments/  : Delete a booking by ID.
 
## Installation
 
To run the app locally:
 
1. Clone the repository:
 
   ```bash
   git clone https://github.com/YourUsername/nestfinder.git
   ```
 
2. Navigate into the project directory:
 
   ```bash
   cd nest-finder
   ```
 
3. Install dependencies:
 
   ```bash
   pnpm install
   ```
 
4. Run the development server:
 
   ```bash
   pnpm run dev or pnpm dev
   ```
 
5. Open your browser and go to:
 
   ```bash
   http://localhost:3000
   ```
 
## Contributing
 
If you wish to contribute to the project:
 
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.
  
 
## Contact
 
For any questions or feedback, please feel free to contact us at lutlataung03@gmail.com

