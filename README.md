# RideSync 🚗

## Smart Vehicle Booking System

RideSync is a full-stack smart vehicle booking platform designed to simplify vehicle discovery, booking, ride management, partner workflows, and administrative verification in one web application.

Built by **Atharva Pawar, Sumedh Bodke, and Lakshya Singh** as a hackathon project.

---

## 🚀 Live Demo

**Website:** https://3-rydex-three.vercel.app/

**Demo Video:** https://youtu.be/9Z9LiLU5IQc

---

## 🎯 Problem

Vehicle booking can become fragmented when users need separate systems for finding vehicles, entering locations, estimating fares, communicating with partners, and tracking rides.

RideSync brings these workflows together into one platform.

---

## ✨ Features

### 👤 User

- User authentication
- Vehicle category browsing
- Pickup and drop location search
- Interactive map and route visualization
- Distance and estimated travel time
- Fare estimation
- Vehicle booking
- Booking history
- Ride-status tracking
- Partner communication

### 🚘 Partner

- Partner registration
- Partner verification workflow
- Vehicle information management
- Assigned booking management
- Ride-status updates
- Pickup/drop information
- Arrival status handling
- Customer communication

### 🛡️ Admin

- Dedicated admin dashboard
- Role-based access control
- Partner verification
- Document review
- Video KYC review
- Vehicle review
- Partner approval/rejection

---

## 🗺️ Maps & Location

### Geoapify

Used for:

- Address autocomplete
- Geocoding
- Reverse geocoding
- Location-related operations

### Leaflet

Used for:

- Interactive maps
- Pickup/drop markers
- Route visualization
- Ride location information

---

## ⚡ Real-Time Communication

**Socket.IO** is used for real-time communication and ride-related status updates so that booking participants can receive updates without relying entirely on manual page refreshes.

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │      RideSync       │
                         │   Web Application   │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
               ┌─────────┐    ┌───────────┐   ┌───────────┐
               │  User   │    │  Partner  │   │   Admin   │
               └────┬────┘    └─────┬─────┘   └─────┬─────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                         ┌─────────────────────┐
                         │     Next.js / API   │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  ▼                 ▼                 ▼
             ┌─────────┐      ┌──────────┐      ┌──────────┐
             │ MongoDB │      │ Socket.IO│      │ Geoapify │
             └─────────┘      └──────────┘      └──────────┘
                                    │
                                    ▼
                              ┌──────────┐
                              │ Leaflet  │
                              │   Maps   │
                              └──────────┘
