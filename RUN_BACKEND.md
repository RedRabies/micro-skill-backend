# Run the Backend (Micro Skill Sharing Platform)

Follow these steps **before** testing APIs in Postman.  
**Your API base URL (`http://127.0.0.1:1675`) only works after you run the server** (see Step 5). Use Command Prompt, PowerShell, or the Cursor/VS Code terminal.

---

## 1. Open the project folder

- Go to: `c:\Users\ASUS\Downloads\micro-skill-backend`
- Open a terminal in this folder (e.g. PowerShell or Command Prompt, or VS Code / Cursor integrated terminal with this folder as the current directory).

---

## 2. Install dependencies

In the terminal, run:

```bash
npm install
```

Wait until it finishes without errors.

---

## 3. Set up environment variables

- In the same folder, copy the example env file:
  - **Windows (PowerShell):** `Copy-Item .env.example .env`
  - **Windows (CMD):** `copy .env.example .env`
- Open the new `.env` file in an editor.
- Set `MONGO_URI` to your MongoDB connection string:
  - **Local MongoDB:** `mongodb://127.0.0.1:27017/micro-skill-db`
  - **MongoDB Atlas:** use the connection string from your Atlas cluster (e.g. `mongodb+srv://user:password@cluster.xxxxx.mongodb.net/micro-skill-db`)
- Ensure `PORT=1675` (or leave it as in `.env.example`). The server will use **port 1675** (last four digits of student ID 21201675).

---

## 4. Start MongoDB (if using local MongoDB)

- If you use **MongoDB locally**, start the MongoDB service so it is running on the default port (e.g. 27017).
- If you use **MongoDB Atlas**, you do not need to start anything locally; just ensure the URI in `.env` is correct and your IP is allowed in Atlas.

---

## 5. Start the backend server

In the same terminal (inside `micro-skill-backend`), run:

```bash
node server.js
```

You should see something like:

- `Server running on http://127.0.0.1:1675`
- `Database connected.`

If you see "Database connection failed", check:

- MongoDB is running (local) or Atlas URI and network access (Atlas).
- `.env` has the correct `MONGO_URI` and no extra spaces.

---

## 6. Keep the server running

- Leave this terminal open while you test in Postman.
- Base URL for all APIs: **`http://127.0.0.1:1675`**

When you are done testing, you can stop the server with `Ctrl+C` in the terminal.
