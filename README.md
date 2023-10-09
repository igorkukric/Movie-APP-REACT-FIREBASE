# Movie App with React, Vite, Firebase Authentication, and Chakra UI

Welcome to the Movie App README! This document provides an overview of the Movie App, including its features, setup instructions, and usage guidelines.
Table of Contents

    Introduction
    Features
    Technologies Used
    Installation
    Configuration
    Usage
    Contributing
    License

Introduction

The Movie App is a web application built with React, Vite, Firebase Authentication, and Chakra UI. It allows users to browse a vast collection of movies, add them to their watchlist, and sign in to access their personalized watchlist.
Features

    Browse Movies: Explore a wide range of movies, including details such as title, genre, release date, and synopsis.

    Authentication: Users can sign up and log in to access personalized features like watchlist management.

    Watchlist Management: Users can add movies to their watchlist, view their watchlist, and remove movies from it.

Technologies Used

    React: A popular JavaScript library for building user interfaces.

    Vite: A fast and efficient build tool for web development.

    Firebase Authentication: Firebase's authentication service to manage user authentication.

    Chakra UI: A simple and customizable component library for React.

Installation

Follow these steps to set up the Movie App:

    Clone the Repository:

    bash

git clone https://github.com/yourusername/movie-app.git
cd movie-app

Install Dependencies:

Use npm to install the required packages.

bash

npm install

Start the Application:

Run the following command to start the application:

bash

    npm run dev

    The app will be accessible at http://localhost:3000.

Configuration

    Firebase Configuration:

    Set up a Firebase project and configure Firebase Authentication. Obtain the Firebase configuration object (apiKey, authDomain, projectId, etc.) and update the src/firebase.js file with your configuration.

    Movie API:

    Obtain an API key from a movie API service (e.g., The Movie Database) and update the .env file with your API key.

    env

    REACT_APP_MOVIE_API_KEY=your_movie_api_key

Usage

    Sign Up and Log In:

    Create an account or log in using Firebase Authentication.

    Browse Movies:

    Explore and search for movies. Click on a movie to view its details.

    Manage Watchlist:

    Add movies to your watchlist and manage them by clicking the "Add to Watchlist" or "Remove from Watchlist" buttons.

Contributing

We welcome contributions! If you'd like to contribute to the Movie App, please follow our contribution guidelines.
License

The Movie App is licensed under the MIT License. See the LICENSE file for more details.
