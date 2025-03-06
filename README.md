# Honey & Bee Products E-Commerce App


This project was initially developed as part of my Technologies and Information Lab during my master’s program. It serves as a stepping stone for a more advanced business tool that I would like to provide for my father, who has been producing honey for a few years. This e-commerce application enables customers to browse and purchase honey and bee-related products while allowing administrators to efficiently manage products and orders.

The application provides the following functionalities:

Clients can:

- register and authenticate using a JWT token

- browse a wide range of products

- add items to their shopping cart and place orders

- save products to a favorites list (for logged-in users)

Admins can:

- create accounts

- add, update and remove products (including quantities and images)

- Update the status of orders

How do I clone and run it?

# Clone the repository
git clone https://github.com/ditzaa/vue-online-store-beekeeping.git
cd vue-online-store-beekeeping

Run the frontend

cd frontend
npm install
npm run dev

Run the backend

cd backend
npm install
npm start

Dependencies

Backend Dependencies

The backend requires the following packages:

bcryptjs 

cors

bodyparser

dotenv 
express 

firebase 

firebase-admin 

jsonwebtoken 

morgan 

Frontend Dependencies

The frontend requires the following packages:

dotenv

lucide-vue-next

pinia

vue 

vue-router

Make sure you have Node.js installed on your machine. You also need to set up a Firebase project and configure the appropriate environment variables.

How do I contribute?

If you’d like to contribute, follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Make your changes and commit them (git commit -m 'Add new feature').

Push the branch (git push origin feature-branch).

Open a pull request.

Feedback and contributions are always welcome!
