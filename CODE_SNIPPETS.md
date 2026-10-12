# Code Snippets for Assignment Report (CSE471 – API Postman Collection)

Use these snippets in your report for **each API** as required (Endpoint URL, HTTP Method, Headers, Body/Parameters, and code snippet).

**Base URL:** `http://127.0.0.1:1675` (port = last 4 digits of student ID 21201675)

---

## API 1 – Create help request (Feature 01)

- **Endpoint URL:** `http://127.0.0.1:1675/api/help-requests`
- **HTTP Method:** POST
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "title": "Need help with React hooks",
  "description": "I am stuck with useEffect dependency array.",
  "category": "Programming",
  "userId": "user21201675"
}
```

**Code snippet (route):**
```javascript
// routes/helpRequests.js
router.post('/', createHelpRequest);
```

**Code snippet (controller):**
```javascript
// controllers/helpRequestController.js
exports.createHelpRequest = async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;
    const helpRequest = new HelpRequest({ title, description, category, userId });
    await helpRequest.save();
    res.status(201).json({ success: true, data: helpRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
```

---

## API 2 – List all help requests (Feature 01)

- **Endpoint URL:** `http://127.0.0.1:1675/api/help-requests`
- **HTTP Method:** GET
- **Headers:** None
- **Body/Parameters:** None

**Code snippet (route):**
```javascript
// routes/helpRequests.js
router.get('/', getAllHelpRequests);
```

**Code snippet (controller):**
```javascript
// controllers/helpRequestController.js
exports.getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: helpRequests, count: helpRequests.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
```

---

## API 3 – Get one help request by ID (Feature 01)

- **Endpoint URL:** `http://127.0.0.1:1675/api/help-requests/:id`  
  Example: `http://127.0.0.1:1675/api/help-requests/64f1a2b3c4d5e6f7a8b9c0d1`
- **HTTP Method:** GET
- **Headers:** None
- **Body/Parameters:** `:id` = MongoDB ObjectId of the help request (in URL path)

**Code snippet (route):**
```javascript
// routes/helpRequests.js
router.get('/:id', getHelpRequestById);
```

**Code snippet (controller):**
```javascript
// controllers/helpRequestController.js
exports.getHelpRequestById = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findById(req.params.id);
    if (!helpRequest) return res.status(404).json({ success: false, error: 'Help request not found' });
    res.status(200).json({ success: true, data: helpRequest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
```

---

## API 4 – Get user’s streak (Feature 02 – Mentorship Streak Reward)

- **Endpoint URL:** `http://127.0.0.1:1675/api/streaks/:userId`  
  Example: `http://127.0.0.1:1675/api/streaks/user21201675`
- **HTTP Method:** GET
- **Headers:** None
- **Body/Parameters:** `:userId` = user identifier (in URL path)

**Code snippet (route):**
```javascript
// routes/streaks.js
router.get('/:userId', getStreakByUserId);
```

**Code snippet (controller):**
```javascript
// controllers/streakController.js
exports.getStreakByUserId = async (req, res) => {
  try {
    const streak = await Streak.findOne({ userId: req.params.userId });
    if (!streak) {
      return res.status(404).json({ success: false, error: 'No streak found for this user' });
    }
    res.status(200).json({ success: true, data: streak });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
```

---

## API 5 – Update (or create) user’s streak (Feature 02 – Mentorship Streak Reward)

- **Endpoint URL:** `http://127.0.0.1:1675/api/streaks/:userId`  
  Example: `http://127.0.0.1:1675/api/streaks/user21201675`
- **HTTP Method:** PUT
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "currentStreak": 5,
  "longestStreak": 10
}
```

**Code snippet (route):**
```javascript
// routes/streaks.js
router.put('/:userId', updateStreak);
```

**Code snippet (controller):**
```javascript
// controllers/streakController.js
exports.updateStreak = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentStreak, longestStreak } = req.body;
    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = new Streak({
        userId,
        currentStreak: currentStreak ?? 0,
        longestStreak: longestStreak ?? 0,
        lastActivityAt: new Date(),
      });
    } else {
      if (currentStreak !== undefined) streak.currentStreak = currentStreak;
      if (longestStreak !== undefined) streak.longestStreak = longestStreak;
      streak.lastActivityAt = new Date();
    }
    await streak.save();
    res.status(200).json({ success: true, data: streak });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
```

---

## API 6 – Update a help request (Feature 01)

- **Endpoint URL:** `http://127.0.0.1:1675/api/help-requests/:id`
- **HTTP Method:** PUT
- **Headers:** `Content-Type: application/json`
- **Body (JSON):** Any of `title`, `description`, `category`, `status` (only send fields to update)

**Code snippet (route):**
```javascript
router.put('/:id', updateHelpRequest);
```

**Code snippet (controller):**
```javascript
exports.updateHelpRequest = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    const helpRequest = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { ...(title && { title }), ...(description && { description }), ...(category && { category }), ...(status && { status }) },
      { new: true, runValidators: true }
    );
    if (!helpRequest) return res.status(404).json({ success: false, error: 'Help request not found' });
    res.status(200).json({ success: true, data: helpRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
```

---

## API 7 – Delete a help request (Feature 01)

- **Endpoint URL:** `http://127.0.0.1:1675/api/help-requests/:id`
- **HTTP Method:** DELETE
- **Headers:** None
- **Body/Parameters:** None (`:id` in URL)

**Code snippet (route):**
```javascript
router.delete('/:id', deleteHelpRequest);
```

**Code snippet (controller):**
```javascript
exports.deleteHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByIdAndDelete(req.params.id);
    if (!helpRequest) return res.status(404).json({ success: false, error: 'Help request not found' });
    res.status(200).json({ success: true, message: 'Help request deleted', data: helpRequest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
```

---

## API 8 – List all streaks (Feature 02 – Mentorship Streak Reward)

- **Endpoint URL:** `http://127.0.0.1:1675/api/streaks`
- **HTTP Method:** GET
- **Headers:** None
- **Body/Parameters:** None

**Code snippet (route):**
```javascript
router.get('/', getAllStreaks);
```

**Code snippet (controller):**
```javascript
exports.getAllStreaks = async (req, res) => {
  try {
    const streaks = await Streak.find().sort({ longestStreak: -1 });
    res.status(200).json({ success: true, data: streaks, count: streaks.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
```

---

## Summary table for report

| API | Feature | Method | Endpoint | Headers | Body |
|-----|---------|--------|----------|---------|------|
| 1 | 01 – Help Request | POST | `/api/help-requests` | Content-Type: application/json | JSON: title, description, category, userId |
| 2 | 01 – Help Request | GET | `/api/help-requests` | None | None |
| 3 | 01 – Help Request | GET | `/api/help-requests/:id` | None | None (id in URL) |
| 4 | 02 – Streak/Reward | GET | `/api/streaks/:userId` | None | None (userId in URL) |
| 5 | 02 – Streak/Reward | PUT | `/api/streaks/:userId` | Content-Type: application/json | JSON: currentStreak, longestStreak |
| 6 | 01 – Help Request | PUT | `/api/help-requests/:id` | Content-Type: application/json | JSON: title, description, category, status (optional) |
| 7 | 01 – Help Request | DELETE | `/api/help-requests/:id` | None | None (id in URL) |
| 8 | 02 – Streak/Reward | GET | `/api/streaks` | None | None |
