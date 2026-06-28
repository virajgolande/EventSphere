# 🎟️ EventSphere – Event Hosting & Ticket Management Platform

EventSphere is a modern event hosting and ticket management web application built using **React**, **Vite**, **Tailwind CSS**, and **Appwrite**. It enables users to discover events, book tickets, receive QR-code-based digital tickets, and allows event organizers to verify ticket authenticity using a built-in QR scanner.

---

# 🚀 Features

## 👤 User Features

* User Registration & Login
* Browse All Events
* Search Events
* Book Event Tickets
* QR Code Ticket Generation
* View My Tickets
* User Profile
* Logout

---

## 🎫 Ticket System

* One-click ticket booking
* Unique Ticket ID generation
* QR Code generation
* Ticket status management

  * VALID
  * USED
* Booking timestamp

---

## 📷 Ticket Verification

* QR Code Scanner
* Camera-based QR scanning
* Ticket verification page
* Displays:

  * User Name
  * User Email
  * Event Name
  * Date
  * Time
  * Location
  * Ticket ID
* One-click ticket verification
* Updates ticket status from **VALID → USED**
* Prevents duplicate ticket usage

---

## 🎉 Event Management

* Add New Events
* Upload Event Images
* Event Date & Time
* Event Location
* Available Tickets
* Dynamic Event Listing
* Event Search

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* React Icons

---

## Backend

* Appwrite

Services Used:

* Authentication
* Database
* Storage

---

## QR System

* qrcode.react
* html5-qrcode

---

# 📂 Project Structure

```
EventSphere/
│
├── public/
│   ├── concert.jpg
│   └── ...
│
├── src/
│
├── appwrite/
│   ├── auth.js
│   ├── config.js
│   ├── EventService.js
│   ├── TicketService.js
│   └── storageservice.js
│
├── components/
│   ├── Navbar.jsx
│   ├── EventCard.jsx
│   ├── EventList.jsx
│   └── ...
│
├── Context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Event.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Contact.jsx
│   ├── Ticket.jsx
│   ├── VerifyTicket.jsx
│   ├── Scanner.jsx
│   ├── MyTickets.jsx
│   ├── UserProfile.jsx
│   └── AdminAddEvent.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🔐 Authentication Flow

```
Signup
     │
     ▼
Login
     │
     ▼
User Session
     │
     ▼
Book Ticket
```

Authentication is managed using:

* Appwrite Authentication
* React Context API
* Local Storage Session

---

# 🎟 Ticket Booking Flow

```
Browse Events
        │
        ▼
Book Ticket
        │
        ▼
Ticket Stored in Appwrite
        │
        ▼
QR Code Generated
        │
        ▼
View Ticket
```

---

# 📷 QR Verification Flow

```
Organizer Opens

/scanner

        │
        ▼

Camera Scans QR

        │
        ▼

Extract Ticket ID

        │
        ▼

/verify/:ticketId

        │
        ▼

Check Ticket in Appwrite

        │
        ▼

VALID

        │
Verify Entry

        │
        ▼

USED
```

---

# 💾 Appwrite Database

## Events Collection

Fields

* title
* date
* time
* location
* ticketleft
* image

---

## Tickets Collection

Fields

* ticketId
* eventId
* title
* location
* date
* time
* userName
* userEmail
* status
* bookedAt

---

# 📦 Environment Variables

Create a `.env` file in the project root.

```
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_EVENTS_COLLECTION_ID=
VITE_APPWRITE_TICKETS_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_APP_URL=http://localhost:5173
```

For production:

```
VITE_APP_URL=https://your-domain.vercel.app
```

---

# ▶️ Installation

Clone the repository

```
git clone https://github.com/yourusername/EventSphere.git
```

Navigate to the project

```
cd EventSphere
```

Install dependencies

```
npm install
```

Run the development server

```
npm run dev
```

Build for production

```
npm run build
```

---

# 🌐 Deployment

Recommended Platforms

* Vercel
* Netlify

Deploy the React application and configure the environment variables in the deployment platform.

Example routes after deployment:

```
/
```

```
/events
```

```
/ticket/:ticketId
```

```
/my-tickets
```

```
/scanner
```

```
/verify/:ticketId
```

---

# 🔮 Future Enhancements

* Admin Dashboard
* Event Editing
* Event Deletion
* Ticket Cancellation
* Payment Gateway Integration (Stripe/Razorpay)
* Email Ticket Confirmation
* Ticket Download (PDF)
* User Profile Photo Upload
* Event Categories
* Event Analytics
* Seat Selection
* Push Notifications
* Dark/Light Theme
* Event Reviews & Ratings
* Multi-language Support

---

# 📸 Screens

* Home
* Events
* Login
* Signup
* My Tickets
* Ticket QR
* QR Scanner
* Verify Ticket
* User Profile
* Add Event

---

# 👨‍💻 Author

**Viraj Golande**

Frontend Developer

Tech Stack:

* React.js
* JavaScript (ES6+)
* Tailwind CSS
* Appwrite
* Vite

---

# ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.
