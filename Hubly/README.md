# 🌐 **HUBLY**

---

## 🚀 **Features Implemented**

---

### 🏠 **Home Page**

- Users can visit the **Hubly Website Homepage** to explore the features and functionalities the application offers.

---

### 🔐 **Login & Signup Functionality**

- **Admins** can sign up and securely log in to the application.
- **Team Members** invited by the Admin can directly log in without signing up.

---

### 📊 **Dashboard**

- **Admins** can view user queries in the form of **tickets**.
- Each ticket displays the **creation time** and relevant **user details**.
- 🔎 **Search Bar**: Easily search for specific tickets using the **user’s name** or **ticket title**.
- ✅ **Resolved / Unresolved Tabs**: Quickly filter tickets based on their status – **Resolved** or **Unresolved**.

---

### ☎️ **Contact Center**

Accessible via the **Sidebar** or the **"Open Ticket"** button on the Dashboard.

#### The Contact Center is divided into 3 intuitive sections:

- **Left Section**:
  - Displays all tickets assigned to the admin or team members.
- **Middle Section**:

  - Shows the full **conversation history** between the user and the support team.
  - Highlights **missed chats** in **red**, signaling delayed responses.

- **Right Section**:
  - Shows detailed **user information** related to the selected ticket.
  - 👥 **Ticket Assignment**: Assign the ticket to any team member via the dropdown.
  - ✅ **Ticket Status**: Resolve the ticket using the status dropdown.

---

### 📈 **Analytics Page**

- 📊 **Missed Chats**: Weekly graph showing chats that were not replied to within a specified time.
- ⏱️ **Average Reply Time**: Indicates the average response time from admin/team.
- 🟢 **Resolved Tickets**: Displays the number of tickets that have been successfully resolved.
- 💬 **Total Chats**: Reflects the total number of chats handled.

---

### 🤖 **Chatbot Page**

Admins can personalize the chatbot interface that users interact with while raising a ticket.

- 🎨 **Header Color**: Customize the chatbot header color.
- 🖼️ **Background Color**: Set a preferred background color for the chatbot.
- 💬 **Customize Message**: Define the default messages displayed to the user.
- 📝 **Introduction Form**: Design the form that users fill before creating a ticket.
- 🙋 **Welcome Message**: Set a friendly welcome message for new users.
- ⏰ **Missed Chat Timer**: Configure the allowed response time for team replies.

---

### 👥 **Team Page**

- Shows a list of all **team members** under the Admin.
- ➕ **Add Team Member**: Easily invite new members to join the team.
- ❌ **Delete Button**: Remove any existing team member when needed.

---

### ⚙️ **Settings Page**

- Admins can **edit their profile** from the Settings page.
- 🔐 After saving changes, the admin is automatically **logged out** for security.

---

## 🛠️ **Setup Instructions**

1. **Clone** the GitHub repository to your local machine.
2. Navigate to both `frontend` and `backend` folders and run:

   ```bash
   npm install
   ```

3. Navigate to the `frontend` folder and run:

   ```bash
   npm run dev
   ```

4. Navigate to the `backend` folder and run:

   ```bash
   node app.js
   ```

5. Create an .env file in the backend folder with the following details:

- Port
- MongoDB url
- Jwt secret key

## 🛠️ **Demo Credentials**

**Login with the following credentials -**

- Username : "admin1@gmail.com"
- Password : "123456"
