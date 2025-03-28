# Vendor Connect

Vendor Connect is a platform that enables vendors and sub-vendors to manage vehicle-related operations efficiently. The project includes role-based access control and various features for vendors to streamline their processes.

## Features
- **Role-Based Access Control:**
  - **Admin:** Can add sub-vendors, mark availability/unavailability, and manage vendors.
  - **Sub-vendor:** Has a separate webpage to add vehicles and upload categorized vehicle documents.
- **Vehicle Management:**
  - Add and update vehicle details.
  - Upload and categorize vehicle-related documents.
- **Cloud Storage Integration:** Uses Cloudinary for storing and managing images/documents.
- **Authentication & Security:** Implements JWT-based authentication for secure access.
- **Currency Support:** Configurable currency settings.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Cloud Storage:** Cloudinary
- **Hosting:** Can be deployed on services like Vercel, Netlify, or AWS

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version recommended)
- MongoDB (or a cloud-hosted database like MongoDB Atlas)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/vendor-connect.git
   cd vendor-connect
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and configure the following environment variables:
   ```sh
   MONGODB_URI='your_mongodb_connection_string'
   CLOUDINARY_NAME='your_cloudinary_name'
   CLOUDINARY_API_KEY='your_cloudinary_api_key'
   CLOUDINARY_SECRET_KEY='your_cloudinary_secret'
   ADMIN_EMAIL='your_admin_email'
   ADMIN_PASSWORD='your_admin_password'
   JWT_KEY='your_jwt_secret_key'
   CURRENCY='your_preferred_currency'
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment
To deploy the project, follow these steps:
1. Set up your environment variables on the deployment platform.
2. Deploy using a cloud hosting service like Vercel, Netlify, or AWS.
3. Ensure the backend is running on a production server (e.g., using PM2 or Docker).

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes and push them.
4. Create a pull request.



