# 🔨 AuctionPlatform

A full-stack **real-time online auction platform** built with **React, Spring Boot Microservices, MySQL, Redis, Apache Kafka, and Server-Sent Events (SSE)**.

Users can create products and auctions, participate in live bidding, track their bids, and manage completed auctions.

---

## 📌 Overview

AuctionPlatform follows a **microservices architecture** with separate services for authentication, products, auctions, and bidding.

The system uses:

* **Spring Cloud Gateway** for API routing and security
* **JWT + HttpOnly Cookie** for authentication
* **Redis** for current bid and distributed locking
* **MySQL** for persistent data
* **Kafka** for asynchronous events
* **SSE** for real-time auction updates
* **Cloudinary** for product images

---

## ✨ Features

* 🔐 User registration and authentication
* 📦 Product management with categories and images
* ☁️ Cloudinary image management
* 🔨 Auction creation and lifecycle management
* 💰 Real-time bidding
* 🔒 Concurrent bid handling using distributed locks
* ⚡ Redis-based current auction price
* 📨 Kafka-based event processing
* 📡 Real-time auction updates using SSE
* 👤 My Auctions
* 💰 My Bids
* 🏆 Won Auctions
* 🔔 Notifications

---

## 🏗️ Architecture

![AuctionPlatform Architecture](https://raw.githubusercontent.com/Harshal-belgamwar/auction-platform/docs/architecture.png)

The application consists of independent microservices communicating through the API Gateway and dedicated infrastructure components.

---

## 🧩 Microservices

| Service            |   Port | Responsibility                              |
| ------------------ | -----: | ------------------------------------------- |
| 🚪 API Gateway     | `8080` | Routing, CORS and JWT validation            |
| 🔐 Auth Service    | `8081` | User registration, login and authentication |
| 📦 Product Service | `8082` | Product and image management                |
| 🔨 Auction Service | `8083` | Auction creation and lifecycle              |
| 💰 Bidding Service | `8084` | Bid processing and concurrency              |
| ⚡ Redis            | `6379` | Current bid and distributed locks           |
| 📨 Kafka           | `9092` | Asynchronous event processing               |
| 🗄️ MySQL          | `3306` | Persistent data                             |

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React
* Server-Sent Events

### ☕ Backend

* Java
* Spring Boot
* Spring Security
* Spring Cloud Gateway
* JWT
* Spring Data JPA
* OpenFeign
* Spring Scheduler

### ⚡Data & Infrastructure

* MySQL
* Redis
* Redisson
* Apache Kafka
* Cloudinary

---

# ⚙️ How It Works

## 1. 🔐 Authentication

Authentication is handled by the **Auth Service**, while the **API Gateway** validates JWTs.

* Users register and login through the frontend.
* Auth Service generates a JWT after successful login.
* JWT is stored in an **HttpOnly cookie**.
* The Gateway extracts and validates the token.
* Valid requests are forwarded to the required microservice.
* The frontend does not store the JWT in `localStorage`.

---

## 2. 📦 Product Management

The **Product Service** manages products and categories.

* Sellers can create, update and delete products.
* Product images are uploaded to **Cloudinary**.
* Image references are associated with the product.
* Individual product images can also be removed.

---

## 3. 🔨 Auction Management

The **Auction Service** manages the complete auction lifecycle.

An auction contains:

* Product
* Seller
* Starting price
* Current price
* Start time
* End time
* Status
* Winner

Auction states:

```text
UPCOMING → ACTIVE → ENDED
```

A backend scheduler automatically activates and ends auctions based on their configured times. When an auction ends, the highest accepted bid determines the winner.

---

## 4. 💰 Bidding System

The **Bidding Service** handles bid validation and processing.

* Current bid is stored in Redis.
* New bids must be greater than the current bid.
* Accepted bids are persisted in MySQL.
* A Kafka event is published after successful bid processing.

Redis key:

```text
auction:{auctionId}:currentBid
```

This keeps high-frequency current-price operations away from MySQL.

---

## 5. 🔒 Concurrent Bidding

Multiple users can bid on the same auction simultaneously.

**Redisson distributed locks** provide per-auction synchronization:

```text
auction:{auctionId}:lock
```

The lock ensures that only one request modifies the current bid for a particular auction at a time, preventing race conditions.

Different auctions can still be processed independently.

---

## 6. 📨 Event Processing

**Apache Kafka** is used for asynchronous communication.

After a successful bid, the Bidding Service publishes an event that can be consumed by other services without tightly coupling them to the bidding operation.

---

## 7. 📡 Real-Time Updates

**Server-Sent Events (SSE)** provide server-to-client real-time updates.

The frontend maintains an SSE connection with the Auction Service. When an auction status changes, the backend sends an event and the frontend refreshes the relevant auction data.

---

## 8. 🔗 Service Communication

The project uses different communication mechanisms based on the requirement:

| Mechanism   | Usage                                        |
| ----------- | -------------------------------------------- |
| API Gateway | Frontend → Backend services                  |
| OpenFeign   | Synchronous service-to-service communication |
| Kafka       | Asynchronous event communication             |
| SSE         | Real-time server → frontend updates          |

---

## 🗄️ Data Storage

| Technology    | Purpose                                   |
| ------------- | ----------------------------------------- |
| 🗄️ MySQL     | Users, products, auctions and bid history |
| ⚡ Redis       | Current auction price                     |
| 🔒 Redisson   | Distributed auction locks                 |
| 📨 Kafka      | Bid events                                |
| ☁️ Cloudinary | store Product images                            |

---

## 📁 Project Structure

```text
AuctionPlatform/
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── package.json
│
├── api-gateway/
├── auth-service/
├── product-service/
├── auction-service/
├── bidding-service/
└── README.md
```

---

# 🚀 Getting Started

## 📋 Prerequisites

* Java 17+
* Node.js
* npm
* MySQL
* Redis
* Apache Kafka
* Git

---

## 📥 Clone Repository

```bash
git clone https://github.com/Harshal-belgamwar/auction-platform.git

cd auction-platform
```

---

## 🗄️ Database Setup

Create the required databases:

```sql
CREATE DATABASE auth_db;
CREATE DATABASE product_db;
CREATE DATABASE auction_db;
CREATE DATABASE bidding_db;
```

Configure database credentials in the respective Spring Boot services.

---

## ⚡ Redis

Run Redis on:

```text
localhost:6379
```

---

## 📨 Kafka

Run Kafka on:

```text
localhost:9092
```

---

## ☕ Start Backend

Start the services:

```text
Auth Service       → 8081
Product Service    → 8082
Auction Service    → 8083
Bidding Service    → 8084
API Gateway        → 8080
```

---

## ⚛️ Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend Gateway:

```text
http://localhost:8080
```

---

# ⚙️ Configuration

Configure the following values using environment variables or application configuration:

```env
DB_USERNAME=your_username
DB_PASSWORD=your_password

JWT_SECRET_KEY=your_secret_key

REDIS_HOST=localhost
REDIS_PORT=6379

KAFKA_BOOTSTRAP_SERVERS=localhost:9092

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


## 👨‍💻 Author

**Harshal Belgamwar**

🎓 Computer Engineering — PICT, Pune

🐙 **GitHub:** [Harshal Belgamwar](https://github.com/Harshal-belgamwar)
💼 **LinkedIn:** [Harshal Belgamwar]( https://www.linkedin.com/in/harshal-belgamwar/)


