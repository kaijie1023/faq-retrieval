# FAQ Retrieval System

A full-stack application for intelligent FAQ retrieval with scoring-based matching and ambiguity detection.

## Features

- **Intelligent FAQ Matching**: Advanced scoring algorithm for relevant FAQ retrieval
- **Tag-based Filtering**: Categorization and filtering using tags
- **Ambiguity Detection**: Identifies when multiple FAQs have different tag groups
- **RESTful API**: Complete CRUD operations for FAQ management
- **Modern Frontend**: Next.js with TypeScript and Tailwind CSS

## Tech Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Database
- **Jest** - Testing framework
- **TypeScript** - Type-safe JavaScript

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL database

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone git@github.com:kaijie1023/faq-retrieval.git
cd faq-retrieval

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

Create a PostgreSQL database and configure environment variables in backend/.env:

```bash
# Backend environment variables (create backend/.env)
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=faq_retrieval
NODE_ENV=development
PORT=3001
CLIENT_URL=http://localhost:3000
```

### 3. Database Migration and Seeding

```bash
cd backend

# Seed the database with sample FAQs
npm run seed
```

### 4. Running the Application

#### Backend Server

```bash
cd backend

# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The backend API will be available at `http://localhost:3001`

#### Frontend Application

```bash
cd frontend

# Development mode
npm run dev

# Production build and start
npm run build
npm run start
```

The frontend will be available at `http://localhost:3000`

## Accessing the Application

### Authentication

Currently, the application uses a simple authentication system for demonstration purposes. To access the dashboard and manage FAQs:

**Login Credentials:**

- **Username:** `admin`
- **Password:** `password`

> ⚠️ **Note:** This is a development setup with hardcoded credentials. In a production environment, you should implement proper user authentication, password hashing, and secure session management.

## API Endpoints

### FAQ Management

- `GET /faqs` - Get all FAQs
- `GET /faqs/:id` - Get FAQ by ID
- `POST /faqs` - Create new FAQ
- `PUT /faqs/:id` - Update FAQ
- `DELETE /faqs/:id` - Delete FAQ

### FAQ Search

- `POST /faqs/ask` - Intelligent FAQ search

#### Ask Endpoint Request

```json
{
  "text": "What are your opening hours?"
}
```

#### Ask Endpoint Response

```json
{
  "faqs": [
    {
      "id": 1,
      "question": "What are your opening hours?",
      "answer": "We are open Monday to Friday, 9am to 5pm.",
      "tags": ["hours"],
      "lang": "en",
      "score": 0.85
    }
  ]
}
```

## Scoring Algorithm

The FAQ scoring system uses a sophisticated algorithm to rank FAQs based on relevance:

### How It Works

1. **Text Preprocessing**

   - Converts text to lowercase
   - Removes special characters and punctuation
   - Tokenizes into individual words
   - Filters out stopwords (the, a, an, of, to, etc.)

2. **Scoring Components**

   - **Question Overlap (65% weight)**: Measures how many query tokens match the FAQ question
   - **Answer Overlap (15% weight)**: Measures how many query tokens match the FAQ answer
   - **Tag Boost (20% weight)**: Adds bonus if query matches any FAQ tags

3. **Scoring Formula**

   ```
   score = 0.65 × (question_overlap) + 0.15 × (answer_overlap) + tag_boost
   ```

   Where:

   - `question_overlap` = (matching tokens in question) / (total question tokens)
   - `answer_overlap` = (matching tokens in answer) / (total answer tokens)
   - `tag_boost` = 0.2 if any tag matches, 0 otherwise

4. **Filtering and Ranking**
   - Only returns FAQs with score > 0
   - Sorts by score (highest first)
   - Returns top 3 results
   - Applies minimum threshold of 0.35

### Ambiguity Detection

The system includes ambiguity detection to identify when search results span different topic areas:

- Compares tag groups between returned FAQs
- Returns `isAmbiguous: true` if FAQs have different tag groups
- Helps users refine their queries when results are too broad

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Sample Data

The seeder populates the database with healthcare-related FAQs:

- Opening hours information
- Appointment booking procedures
- Location and parking details
- Service and vaccination information
- Billing and payment methods
- Contact information
