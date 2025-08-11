# 🐱 Random Cat Generator

[🌐 Live Site](https://cat-randomizer.onrender.com) 

---

## 📖 About the Project

**Random Cat Generator** is a full-stack web application that lets users generate random cat images and facts, save their favorites, and view them in a modal gallery. The app is designed to be fast, responsive, and fun — perfect for cat lovers or for testing a full CRUD app using Express and PostgreSQL.

---

## ✅ Features & Why I Built Them

- **Random Cat Image Generator**
  - Uses [TheCatAPI](https://thecatapi.com/) to fetch fun, unexpected cat photos.
  - Adds visual engagement and joy with every reload.

- **Random Cat Fact Generator**
  - Uses [MeowFacts API](https://meowfacts.herokuapp.com/) to provide quirky and interesting facts.
  - Adds educational/entertainment value.

- **Save Image or Fact**
  - Saves favorites to PostgreSQL.
  - I chose to separate image and fact saves to provide flexibility.

- **View Saved Cats Page**
  - Allows users to view previously saved cats in an organized list.

- **Click to View Larger Format (Modal)**
  - Improves user experience for reviewing saved content.

- **Keyboard Navigation**
  - Users can navigate modals using ArrowLeft, ArrowRight, and Escape.

- **Delete Individual Saved Items**
  - Ensures users can manage their saved content intuitively.

---

## 🔄 User Flow

1. User opens the site and sees a random cat image and fact.
2. They can:
   - Click “New Cat Image” or “New Cat Fact” for a new result
   - Save an image or a fact
3. Click “View Saved Cats” to:
   - Browse all saved facts and images
   - Delete any saved item
   - Click on items to view them in a large modal
4. Navigate through modal content with arrow keys or on-screen buttons.

---

## 🧪 Tests

Currently, this project does not include automated tests. However, testing could be added using:

- **Jest** or **Mocha** for unit testing backend API routes
- **Supertest** for integration tests with Express
- **Playwright** or **Cypress** for end-to-end browser interaction tests

To run future tests:
```bash
npm test
```

---

## 🌐 APIs Used

- [TheCatAPI](https://thecatapi.com/)
  - Provides random cat images.
  - Easy to use, reliable, and free for developers.

- [MeowFacts API](https://meowfacts.herokuapp.com/)
  - Returns random cat facts.
  - Simple, free, and perfect for light-hearted fun.

---

## 🛠 Technology Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (with pg and SQL queries)
- **Deployment**: (Insert deployment platform, e.g. Render, Railway, Heroku)

---

## 📁 File Structure Overview

```
Cat-Randomizer/
├── public/
│   ├── index.html
│   ├── saved.html
│   ├── script.js
│   ├── saved.js
│   └── style.css
├── routes/
│   └── cats.js
├── models/
│   └── Cat.js
├── db/
│   └── index.js
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Create a PostgreSQL database and run the following SQL:

```sql
CREATE TABLE saved_cats (
  id SERIAL PRIMARY KEY,
  image_url TEXT UNIQUE,
  fact TEXT UNIQUE,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Start the server:
```bash
node app.js
```

5. Visit `http://localhost:3001`

---

## 💬 Final Notes

- I intentionally kept the frontend simple and framework-free to highlight raw DOM manipulation and CSS skills.
- The APIs are lightweight and ideal for prototyping.
- PostgreSQL integration was an important goal to solidify understanding of data persistence.

---

## 📄 License

MIT
