# Postman Manual – Micro Skill Sharing Platform API (CSE471 Assignment 03)

Use this manual to test **every API** in Postman and take **one screenshot per API** for your submission.

---

## Where do I get the base URL? (You have to run the backend first)

The base URL **`http://127.0.0.1:1675`** is **not** something you type in a browser or get from a website. It is the address where **your own backend server** runs **on your computer** — but **only after you start it**.

- **127.0.0.1** = “this computer” (same as typing “localhost”).
- **1675** = the port number (from the last 4 digits of your student ID 21201675). Your backend is configured to use this port.

**How you “get” this URL:**

1. Open **Command Prompt**, **PowerShell**, or the **terminal inside Cursor/VS Code**.
2. Go to your backend folder:  
   `cd c:\Users\ASUS\Downloads\micro-skill-backend`
3. Install dependencies (once):  
   `npm install`
4. Create a `.env` file from `.env.example` and set `MONGO_URI` (see [RUN_BACKEND.md](RUN_BACKEND.md)).
5. Start the server:  
   `node server.js`
6. When you see **“Server running on http://127.0.0.1:1675”** and **“Database connected.”**, your API is now **live** at that base URL.
7. **Keep that terminal window open.** If you close it or stop the server, the URL will no longer work until you run `node server.js` again.

So: **you get the base URL by running the backend.** No server running = no `http://127.0.0.1:1675`.

---

## Before you start (Postman)

1. **Open Postman** (install from [postman.com](https://www.postman.com/downloads/) if needed).
2. **Start the backend** (port 1675) as above and leave it running.
3. For requests that send JSON, you will set **Header:** `Content-Type` = `application/json` and **Body:** raw → JSON.

---

## Where your 8 screenshots go (for report / Word)

### If you did NOT rename your screenshots – use this list

Match your screenshot **filename** (or the **time** you took it) to the row below. Put that screenshot in the **API** column for your report.

| Put this screenshot file … | In this API section (report) |
|-----------------------------|-----------------------------|
| **Screenshot_2026-03-10_175442** (POST, 201 Created, body with title/description/category/userId) | **API 1** – Create help request |
| **Screenshot_2026-03-10_175545** (GET `/api/help-requests`, 200 OK, `data` is an array) | **API 2** – List all help requests |
| **Screenshot_2026-03-10_180029** (GET `/api/help-requests/69b00...`, 200 OK, `data` is one object) | **API 3** – Get one help request by ID |
| **Screenshot_2026-03-10_180330** (GET `/api/streaks/user21201675`, 200 OK, streak in `data`) | **API 4** – Get user’s streak |
| **Screenshot_2026-03-10_180315** (PUT `/api/streaks/user21201675`, body currentStreak/longestStreak, 200 OK) | **API 5** – Update user’s streak |
| **Screenshot_2026-03-10_180442** (PUT `/api/help-requests/69b00...`, body title/status, 200 OK) | **API 6** – Update help request |
| **Screenshot_2026-03-10_180604** (DELETE `/api/help-requests/69b00...`, 200 OK, “Help request deleted”) | **API 7** – Delete help request |
| **Screenshot_2026-03-10_180637** (GET `/api/streaks` only, 200 OK, `data` is array of streaks) | **API 8** – List all streaks |

Your filenames might look like `Screenshot_2026-03-10_175442.png` or have an extra part (e.g. `-44ece0e9-4e5e-448a-9e91-71cf49e18107.png`). Use the **time** part (175442, 175545, 180029, etc.) to match the row above.

---

### If you renamed them (or want to double-check by what’s in the image)

| What the screenshot shows | Put it in |
|---------------------------|-----------|
| **POST** to `/api/help-requests`, Body with JSON, **201 Created** | **API 1** – Create a help request |
| **GET** to `/api/help-requests`, **200 OK**, `data` is an **array** | **API 2** – List all help requests |
| **GET** to `/api/help-requests/69b0065957da987459458e38`, **200 OK**, `data` is a **single object** | **API 3** – Get one help request by ID |
| **GET** to `/api/streaks/user21201675`, **200 OK**, streak in `data` | **API 4** – Get user’s streak |
| **PUT** to `/api/streaks/user21201675`, Body `currentStreak`/`longestStreak`, **200 OK** | **API 5** – Update user’s streak |
| **PUT** to `/api/help-requests/69b0065957da987459458e38`, Body `title`/`status`, **200 OK** | **API 6** – Update help request |
| **DELETE** to `/api/help-requests/69b0065957da987459458e38`, **200 OK**, “Help request deleted” | **API 7** – Delete help request |
| **GET** to `/api/streaks` (no userId in URL), **200 OK**, `data` is **array** of streaks | **API 8** – List all streaks |

In your **Word/report**: under each API heading, insert the screenshot from the row that matches it.

---

# Feature 01 – Help Request APIs

---

## API 1 – Create a help request (POST)

**Feature:** 01 – Users can create a help request by filling out the necessary informations.

### Step 1 – New request

- In Postman, click **New** → **HTTP Request** (or press Ctrl+N), or click the **+** tab.
- You should see an empty request with a method dropdown and a URL bar.

### Step 2 – Set method and URL

- In the **method** dropdown (left of the URL bar), select **POST**.
- In the **URL** bar, type exactly:  
  **`http://127.0.0.1:1675/api/help-requests`**  
  (no space at the end, no slash at the end.)

### Step 3 – Headers

- Click the **Headers** tab (below the URL bar).
- Add one header:
  - **Key:** `Content-Type`
  - **Value:** `application/json`
- (If Postman adds this automatically when you pick raw JSON in Body, you can leave it as is.)

### Step 4 – Body

- Click the **Body** tab.
- Select **raw**.
- In the dropdown on the right (often showing "Text"), choose **JSON**.
- In the text area, paste this **exactly** (you can change the values if you like, but keep the keys and format):

```json
{
  "title": "Need help with React hooks",
  "description": "I am stuck with useEffect dependency array.",
  "category": "Programming",
  "userId": "user21201675"
}
```

- Make sure there are **no trailing commas** (e.g. no comma after `"userId": "user21201675"`).

### Step 5 – Send and check response

- Click the blue **Send** button.
- Below, you should see:
  - **Status:** `201 Created` (or `200 OK`).
  - **Body:** JSON with `success: true` and a `data` object containing the created help request (with `_id`, `title`, `description`, `category`, `userId`, `status`, etc.).

### Step 6 – Screenshot (API 1)

**Take a screenshot now.**  
The screenshot must show:

- The **method** (POST) and **URL** (`http://127.0.0.1:1675/api/help-requests`).
- The **Headers** tab with `Content-Type: application/json`.
- The **Body** tab with the raw JSON you sent.
- The **response** area: status code (201/200) and the JSON body.

Save the file as: **`API1_create_help_request.png`**.  
**Which of your 8 screenshots goes here:** The one with **POST**, URL `/api/help-requests`, JSON body, and **201 Created** response → use it for **API 1** in your report.

### If something goes wrong (API 1)

- **Connection refused / Could not get response**  
  - Backend is not running or wrong port. Start the server: in `micro-skill-backend` run `node server.js`. Confirm the terminal says listening on 1675. Check the URL is `http://127.0.0.1:1675` (not 3000 or another port).
- **404 Not Found**  
  - Check the path is exactly `/api/help-requests` (plural, with hyphen). No typo in the base URL.
- **400 Bad Request / 422**  
  - Body must be **raw** and **JSON**. Check for trailing commas, missing quotes, or invalid JSON. Keys must be: `title`, `description`, `category`, `userId` (all required).
- **500 Internal Server Error**  
  - Check MongoDB is running and `.env` has the correct `MONGO_URI`. Check the terminal for the exact error message.

---

## API 2 – List all help requests (GET)

**Feature:** 01 – Help Request.

### Step 1 – New request

- Create a **new** request (new tab or New → HTTP Request).

### Step 2 – Method and URL

- **Method:** **GET**.
- **URL:** **`http://127.0.0.1:1675/api/help-requests`**

### Step 3 – Headers and Body

- **Headers:** You can leave default (no body for GET). If you had set `Content-Type: application/json` globally, it does not harm.
- **Body:** Select **none** (GET usually has no body).

### Step 4 – Send and check response

- Click **Send**.
- You should see **Status:** `200 OK` and **Body:** JSON with `success: true`, `data` as an array of help requests, and `count`.

### Step 5 – Screenshot (API 2)

**Take a screenshot now.**  
It must show:

- **GET** and URL `http://127.0.0.1:1675/api/help-requests`.
- The **response**: status 200 and the JSON body (list of help requests).

Save as: **`API2_list_help_requests.png`**.  
**Which of your 8 screenshots goes here:** The one with **GET** to `/api/help-requests`, **200 OK**, and `data` as an **array** → use it for **API 2** in your report.

### If something goes wrong (API 2)

- **Connection refused** → Same as API 1: start backend, check port 1675.
- **404** → Check URL path is exactly `/api/help-requests`.
- **500** → Check MongoDB and `MONGO_URI` in `.env`.

---

## API 3 – Get one help request by ID (GET)

**Feature:** 01 – Help Request.

You need an existing help request `_id` from the database (e.g. from API 1 response or API 2 list).

### Step 1 – Get an ID (if you don’t have one)

- Run **API 2** (GET list) or use the response from **API 1**.
- From the response body, copy one `_id` value (e.g. `"69b0065957da987459458e38"`).  
  In the next step, replace `69b0065957da987459458e38` with this value.

### Step 2 – New request

- Create a **new** request.

### Step 3 – Method and URL

- **Method:** **GET**.
- **URL:** **`http://127.0.0.1:1675/api/help-requests/69b0065957da987459458e38`**  
  Replace `69b0065957da987459458e38` with the actual `_id` (e.g. `http://127.0.0.1:1675/api/help-requests/69b0065957da987459458e38`).

### Step 4 – Body

- **Body:** **none**.

### Step 5 – Send and check response

- Click **Send**.
- You should see **Status:** `200 OK` and **Body:** JSON with `success: true` and `data` as the single help request object.

### Step 6 – Screenshot (API 3)

**Take a screenshot now.**  
It must show:

- **GET** and the full URL including the id (e.g. `http://127.0.0.1:1675/api/help-requests/69b0065957da987459458e38`).
- **Response:** status 200 and the JSON body.

Save as: **`API3_get_one_help_request.png`**.  
**Which of your 8 screenshots goes here:** The one with **GET** to `/api/help-requests/69b0065957da987459458e38`, **200 OK**, and `data` as a **single object** (not array) → use it for **API 3** in your report.

### If something goes wrong (API 3)

- **404** → The `_id` might be wrong or the document was deleted. Use a fresh id from API 2. Ensure the id is in the URL path with no extra spaces.
- **500** → Check MongoDB and server logs.

---

# Feature 02 – Mentorship Streak Reward APIs

---

## API 4 – Get user’s streak (GET)

**Feature:** 02 – Mentorship Streak Reward System.

### Step 1 – New request

- Create a **new** request.

### Step 2 – Method and URL

- **Method:** **GET**.
- **URL:** **`http://127.0.0.1:1675/api/streaks/user21201675`**  
  You can use any `userId` string; here we use `user21201675` to match the help request example. If you have no streak for this user yet, you will get 404 until you create one with API 5.

### Step 3 – Body

- **Body:** **none**.

### Step 4 – Send and check response

- Click **Send**.
  - If the user already has a streak (e.g. after calling API 5): **Status:** `200 OK`, **Body:** JSON with `success: true` and `data` (userId, currentStreak, longestStreak, lastActivityAt, etc.).
  - If the user has no streak yet: **Status:** `404 Not Found`. In that case, run **API 5** first (PUT streak), then run this GET again.

### Step 5 – Screenshot (API 4)

**Take a screenshot now.**  
Preferably after the user has a streak (run API 5 first if needed). Screenshot must show:

- **GET** and URL `http://127.0.0.1:1675/api/streaks/user21201675` (or the userId you used).
- **Response:** status 200 and the JSON body with streak data.

Save as: **`API4_get_streak.png`**.  
**Which of your 8 screenshots goes here:** The one with **GET** to `/api/streaks/user21201675`, **200 OK**, and streak object in `data` (userId, currentStreak, longestStreak) → use it for **API 4** in your report.

### If something goes wrong (API 4)

- **404** → No streak for this `userId`. Run **API 5** (PUT) first to create/update the streak, then try this GET again.
- **Connection refused / 404 on base URL** → Same as before: backend on 1675, correct path `/api/streaks/:userId`.

---

## API 5 – Update (or create) user’s streak (PUT)

**Feature:** 02 – Mentorship Streak Reward System.

### Step 1 – New request

- Create a **new** request.

### Step 2 – Method and URL

- **Method:** **PUT** (from the method dropdown).
- **URL:** **`http://127.0.0.1:1675/api/streaks/user21201675`**  
  (You can use another userId if you prefer.)

### Step 3 – Headers

- **Headers:** Add **Key:** `Content-Type`, **Value:** `application/json`.

### Step 4 – Body

- **Body:** Select **raw**, type **JSON**.
- Paste this (you can change numbers):

```json
{
  "currentStreak": 5,
  "longestStreak": 10
}
```

- No trailing comma after `10`.

### Step 5 – Send and check response

- Click **Send**.
- You should see **Status:** `200 OK` and **Body:** JSON with `success: true` and `data` containing the streak (userId, currentStreak, longestStreak, lastActivityAt, etc.). If the user had no streak, it will be created.

### Step 6 – Screenshot (API 5)

**Take a screenshot now.**  
It must show:

- **PUT** and URL `http://127.0.0.1:1675/api/streaks/user21201675`.
- **Headers** with `Content-Type: application/json`.
- **Body** with the raw JSON.
- **Response:** status 200 and the JSON body.

Save as: **`API5_update_streak.png`**.  
**Which of your 8 screenshots goes here:** The one with **PUT** to `/api/streaks/user21201675`, Body with `currentStreak` and `longestStreak`, **200 OK** → use it for **API 5** in your report.

### If something goes wrong (API 5)

- **400** → Check Body is raw JSON and valid (no trailing commas). `currentStreak` and `longestStreak` are optional but must be numbers if present.
- **Connection refused / 404** → Backend running on 1675, path `/api/streaks/:userId` (replace `:userId` with actual value).
- **500** → MongoDB connected and `MONGO_URI` correct in `.env`.

---

## API 6 – Update a help request (PUT)

**Feature:** 01 – Help Request.

You need an existing help request `_id` (e.g. from API 1 or API 2).

### Step 1 – Get an ID

- From API 2 (list) or API 1 (create) response, copy one `_id`. Replace `69b0065957da987459458e38` below with it.

### Step 2 – New request

- **Method:** **PUT**.
- **URL:** **`http://127.0.0.1:1675/api/help-requests/69b0065957da987459458e38`**

### Step 3 – Headers and Body

- **Headers:** `Content-Type` = `application/json`.
- **Body:** **raw** → **JSON**. Example (you can change fields):

```json
{
  "title": "Updated: Need help with React hooks",
  "status": "in-progress"
}
```

- You can send only the fields you want to update (`title`, `description`, `category`, `status`). No trailing commas.

### Step 4 – Send and check response

- Click **Send**. You should see **Status:** `200 OK` and **Body:** JSON with `success: true` and updated `data`.

### Step 5 – Screenshot (API 6)

**Take a screenshot now.** Show: **PUT**, full URL, Headers, Body, and response. Save as: **`API6_update_help_request.png`**.  
**Which of your 8 screenshots goes here:** The one with **PUT** to `/api/help-requests/69b0065957da987459458e38`, Body with `title` and `status`, **200 OK** (updated help request in response) → use it for **API 6** in your report.

### If something goes wrong (API 6)

- **404** → Wrong or deleted id; use a valid `_id` from API 2. **400** → Invalid JSON or invalid field values.

---

## API 7 – Delete a help request (DELETE)

**Feature:** 01 – Help Request.

### Step 1 – Get an ID

- Copy one `_id` from API 2 (list) or create one with API 1. Use an id you are okay deleting.

### Step 2 – New request

- **Method:** **DELETE**.
- **URL:** **`http://127.0.0.1:1675/api/help-requests/69b0065957da987459458e38`**

### Step 3 – Body

- **Body:** **none**.

### Step 4 – Send and check response

- Click **Send**. You should see **Status:** `200 OK` and **Body:** JSON with `success: true`, `message: "Help request deleted"`, and `data`.

### Step 5 – Screenshot (API 7)

**Take a screenshot now.** Show: **DELETE**, full URL, and response. Save as: **`API7_delete_help_request.png`**.  
**Which of your 8 screenshots goes here:** The one with **DELETE** to `/api/help-requests/69b0065957da987459458e38`, **200 OK**, and `"message": "Help request deleted"` in the response → use it for **API 7** in your report.

### If something goes wrong (API 7)

- **404** → No help request with that id (maybe already deleted). Use a valid `_id` from API 2.

---

## API 8 – List all streaks (GET)

**Feature:** 02 – Mentorship Streak Reward System.

### Step 1 – New request

- **Method:** **GET**.
- **URL:** **`http://127.0.0.1:1675/api/streaks`**  
  (No `/:userId` — this returns all streaks.)

### Step 2 – Body

- **Body:** **none**.

### Step 3 – Send and check response

- Click **Send**. You should see **Status:** `200 OK` and **Body:** JSON with `success: true`, `data` (array of streaks), and `count`. If no one has a streak yet, `data` will be `[]`.

### Step 4 – Screenshot (API 8)

**Take a screenshot now.** Show: **GET**, URL `http://127.0.0.1:1675/api/streaks`, and response. Save as: **`API8_list_all_streaks.png`**.  
**Which of your 8 screenshots goes here:** The one with **GET** to `http://127.0.0.1:1675/api/streaks` (no userId in URL), **200 OK**, and `data` as an **array** of streak objects → use it for **API 8** in your report.

### If something goes wrong (API 8)

- **Connection refused** → Start backend. **404** → URL must be exactly `http://127.0.0.1:1675/api/streaks` (no extra path).

---

## Summary – What to submit

| API | Feature | Method | Endpoint | Screenshot file |
|-----|---------|--------|----------|------------------|
| 1 | 01 – Help Request | POST | `/api/help-requests` | API1_create_help_request.png |
| 2 | 01 – Help Request | GET | `/api/help-requests` | API2_list_help_requests.png |
| 3 | 01 – Help Request | GET | `/api/help-requests/:id` | API3_get_one_help_request.png |
| 4 | 02 – Streak/Reward | GET | `/api/streaks/:userId` | API4_get_streak.png |
| 5 | 02 – Streak/Reward | PUT | `/api/streaks/:userId` | API5_update_streak.png |
| 6 | 01 – Help Request | PUT | `/api/help-requests/:id` | API6_update_help_request.png |
| 7 | 01 – Help Request | DELETE | `/api/help-requests/:id` | API7_delete_help_request.png |
| 8 | 02 – Streak/Reward | GET | `/api/streaks` | API8_list_all_streaks.png |

- Suggested order: **1 → 2 → 3 → 6 → 7** (help requests), then **5 → 4 → 8** (streaks). For API 7, use an id you can delete (e.g. create one with API 1 first).
- One screenshot per API; each screenshot should show the request (method, URL, headers/body as applicable) and the response (status + body).
