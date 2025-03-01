## E-Commerce Store - Admin & Customer Dashboard

## 📌 **Overview**

This is a full-stack **E-Commerce Dashboard** built with **Next.js, React, and TypeScript**. It features role-based authentication, product management, wishlist functionality, and review management for both **admins** and **customers**.

---

## 🏗️ **Tech Stack**

### **Frontend**:

- **Next.js** (React framework)
- **TypeScript**
- **Tailwind CSS** (Styling)
- **React Context API** (State Management)

### **Backend**: (https://github.com/ragulsarma/ecommerce_app.git)

- **Node.js & Express.js** (API Server)
- **PostgreSQL** (Database)
- **JWT Authentication**

---

## 📽️ App Demo
Below is a recorded demonstration of the app in action:

[🎥 Watch the Video](https://drive.google.com/file/d/1lJ1o8uX6MTjLcpLbzzTvPDtqXfoYfLF0/view?usp=sharing)

---

## 🛠️ **Installation & Setup**

### **1️⃣ Clone the repository**

```sh
$ git clone https://github.com/ragulsarma/ecommerce_app_frontend.git
$ cd ecommerce_app_frontend
```

### **2️⃣ Install Dependencies**

```sh
$ npm install
```

### **3️⃣ Run the Development Server**

```sh
$ npm run dev
```

🚀 Your app is now running at [**http://localhost:3000**](http://localhost:3000)

---

## 📂 **Project Structure**

```plaintext
📦 ecommerce_app_frontend
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 admin
│   │   │   ├── 📁 products (Manage Products)
│   │   │   ├── 📁 reviews (Manage Reviews)
│   │   │   ├── 📄 dashboard.tsx (Admin Dashboard)
│   │   ├── 📁 customer
│   │   │   ├── 📁 home (Product Listing for Customers)
│   │   │   ├── 📁 wishlist (Wishlist Management)
│   │   │   ├── 📁 products (Product Details & Reviews)
│   │   ├── 📄 login.tsx (Authentication Page)
│   │   ├── 📄 page.tsx (Auto-Redirect Logic)
│   ├── 📁 components (Reusable UI Components)
│   ├── 📁 contexts (Authentication Context API)
│   ├── 📁 services (API Service Handlers)
│   ├── 📄 globals.css (Global Styles)
│   ├── 📄 README.md
```

---

## 🚀 **Features**

### ✅ **Authentication & Authorization**

- Users can log in as **Admin** or **Customer**.
- **Admins** manage products & reviews.
- **Customers** view products & add to wishlist.

### 🛍️ **Product Management**

- **Admins** can **Add, Edit, Delete** products.
- **Customers** can **view product details**.
- Pagination support for product listing.

### ❤️ **Wishlist**

- Customers can **add/remove products** to/from wishlist.
- Wishlist is **saved & updated dynamically**.

### ⭐ **Review System**

- Customers can **leave reviews & ratings**.
- Admins can **reply** to customer reviews.

### 🎛️ **Admin Dashboard**

- **Product Management**: Add, Edit, Delete.
- **Review Management**: Reply to reviews.
- **Sidebar Navigation** for ease of access.

---

## 📝 **How to Use?**

### 🔹 **For Admins**

1. **Login as Admin**.
2. Manage Products (CRUD operations).
3. Review & reply to customer feedback.

### 🔹 **For Customers**

1. **Browse Products**.
2. **Add Products to Wishlist**.
3. **Leave Reviews & Ratings**.

---
