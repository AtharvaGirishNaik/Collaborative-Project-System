# 🎨 Collaborative Project System


## ✨ Real-time Collaborative Whiteboard

**React + Spring Boot Microservices + WebSockets + JWT + Docker**

### 🚀 1-Click Setup
```bash
git clone https://github.com/vimalnaikg-collab/collaborative-project-system.git
cd collaborative-project-system
cd frontend && npm install && cd ..
docker-compose up --build

Frontend (3000) → Gateway (8080) → Collaboration Service (8082)
                           ↓ Auth + WebSocket + PostgreSQL + Redis

📱 Features
✅ Real-time multi-user drawing
✅ JWT authentication
✅ Spring Cloud Gateway
✅ WebSocket STOMP
✅ React + TypeScript
✅ Docker Compose
✅ PostgreSQL + Redis

collaborative-project-system/
├── docker-compose.yml              # One-click deploy
├── gateway-service/                # Spring Cloud Gateway
│   ├── pom.xml
│   ├── src/main/java/...GatewayApplication.java
│   └── Dockerfile
├── collaboration-service/          # Auth + WebSocket + Logic
│   ├── pom.xml
│   ├── src/main/java/...CollaborationApplication.java
│   ├── src/main/resources/application.yml
│   └── Dockerfile
├── frontend/                       # React + TypeScript
│   ├── package.json
│   ├── src/App.tsx
│   ├── src/components/
│   └── Dockerfile
└── README.md                       # This file


<img width="930" height="482" alt="image" src="https://github.com/user-attachments/assets/1a8ce9c6-8f6e-401c-8d78-1c3a6ce0a8eb" />


🔧 Development Commands
bash

Copy code
# Full stack (recommended)
docker-compose up --build

# Backend only
docker-compose up backend

# Frontend dev (hot reload)
cd frontend && npm start

# Stop everything
docker-compose down

# View logs
docker-compose logs -f collaboration-service


📡 API Endpoints (via Gateway localhost:8080)

Copy code
POST /auth/login
{
  "username": "test",
  "password": "password123"
}
→ { "token": "jwt...", "user": {...} }

WebSocket: ws://localhost:8080/collab
→ drawing → /app/drawing → /topic/drawings (broadcast)

🧪 How to Test
Start: docker-compose up
Login: Open http://localhost:3000 → test/password123
Draw: Select color → Draw on canvas
Multi-user: Open 2nd tab → Draw → Real-time sync! ✨
Clear: Click "Clear Canvas" → All users see it

🛠️ Tech Stack

Copy code
Frontend:     React 18 + TypeScript + Socket.IO-Client + Tailwind
Backend:      Spring Boot 3.2 + WebSocket(STOMP) + Spring Security
Gateway:      Spring Cloud Gateway
Database:     PostgreSQL 15
Cache:        Redis 7
DevOps:       Docker + Docker Compose
Auth:         JWT Tokens


**Everything included:**
- Quick start
- Architecture diagram
- All ports/services
- Complete structure
- API examples
- Test instructions
- Production deploy
- Contributing guide


