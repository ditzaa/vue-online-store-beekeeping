# 🐝 E-Commerce App for Honey & Bee Products 

This project was initially developed as part of my Technologies and Information Lab during my master’s program. It serves as a stepping stone for a more advanced business tool that I would like to provide for my father, who has been producing honey for a few years. This e-commerce application enables customers to browse and purchase honey and bee-related products while allowing administrators to efficiently manage products and orders.

The application provides the following functionalities:

Clients can:
- register and authenticate using a JWT token
- browse a wide range of products
- add items to their shopping cart and place orders
- save products to a favorites list (for logged-in users)

Admins can:
- register and authenticate using a JWT token
- add, update and remove products (including quantities and images)
- Update the status of orders


## Clone the repository
```
git clone https://github.com/ditzaa/vue-online-store-beekeeping.git
cd vue-online-store-beekeeping
```

Run the frontend (I included the dependencies needed)

```
cd frontend
npm install
npm install vue vue-router pinia dotenv lucide-vue-next 
npm run dev
```

Run the backend (I included the dependencies needed)

```
cd backend
npm install
npm install bcryptjs bodyparser cors dotenv express firebase firebase-admin jsonwebtoken morgan
npm start
```

Make sure you have the lastest Node.js version installed on your machine. You also need to set up a Firebase project and configure the appropriate environment variables.


## Contribute
If you’d like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b <feature-branch>).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push the branch (git push origin feature-branch).
5. Open a pull request.

Feedback and contributions are always welcome!
