# 🧠 DevCards

> A flashcard-based learning platform for software engineers.

DevCards helps software engineers learn and review technical concepts through short, focused flashcards.

The goal is simple: **learn one concept at a time, build strong fundamentals, and keep expanding your engineering knowledge.**

---

## ✨ What is DevCards?

DevCards organizes software engineering knowledge into **categories → skills → flashcards**.

📚 **Categories**

Group related areas of software engineering.

🛠️ **Skills**

Represent specific technologies, concepts, or topics.

🃏 **Flashcards**

Contain focused questions, concise answers, and detailed explanations.

🤖 **AI-generated Content**

Gemini is used to help generate new flashcard content while avoiding duplicate questions.

---

## 🗂️ Topics

DevCards aims to cover software engineering broadly, including:

💻 Computer Science
🧑‍💻 Programming Languages
⚙️ Backend
🎨 Frontend
🗄️ Database
🏗️ System Design
☁️ Cloud
🖥️ Infrastructure
🔐 Security
📊 Data Engineering
🧠 AI & Machine Learning
🧪 Testing
🏛️ Software Architecture
🛠️ Developer Tools

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have:

- 🐍 Python 3.12+
- 🟢 Node.js
- 🐘 PostgreSQL

For AI content generation:

- ✨ Gemini API key

---

## ⚙️ Backend Setup

Go to the backend directory:

```bash
cd service
```

Create the environment file:

### 🪟 Windows / PowerShell

```powershell
cp .env.example .env
```

Then update `.env` with your local configuration and credentials.

---

### 📦 Install Dependencies

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it.

#### 🪟 PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

### 🗄️ Database Setup

Run Django migrations:

```bash
python manage.py migrate
```

Create a superuser if needed:

```bash
python manage.py createsuperuser
```

---

### ▶️ Run Backend

```bash
python manage.py runserver
```

The backend will run on:

```text
http://localhost:8000
```

---

## 🎨 Frontend Setup

Go to the frontend directory:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

---

## 🧑‍💻 VS Code

The project already includes VS Code configuration for development.

You can use the included:

- 📁 Workspace configuration
- 🐛 `launch.json`
- ▶️ VS Code debugger

Open the workspace and use **Run and Debug** to start the configured development environment.

---

## 🤖 AI Content Generation

DevCards uses Gemini to generate flashcard content.

The generator is designed to:

1. 🎯 Select a skill
2. 🔎 Retrieve existing questions
3. 🤖 Ask Gemini to generate new content
4. 🚫 Avoid duplicate questions
5. 📝 Generate concise answers
6. 📖 Generate detailed explanations
7. 💾 Save the generated content to PostgreSQL

The AI model can be configured through the environment:

```env
GEMINI_MODEL=gemini-2.5-flash
```

This allows the model to be changed without modifying application code.

---

## 🃏 Flashcard Content

Each flashcard is designed with two levels of explanation:

### 💬 Answer

A short and concise explanation designed to fit inside the flashcard.

### 📖 Learn More

A longer explanation that can cover:

- 🔍 What it is
- ⚙️ How it works
- 💡 Why it exists
- 📌 When to use it
- ⚖️ Advantages and disadvantages
- 🔄 Alternatives
- 🏗️ Practical considerations
- 💻 Examples

Markdown can be used in the `learn_more` content.

---

## 🎯 Goal

DevCards is built around a simple idea:

> **Software engineering is too broad to learn all at once.**

Instead of trying to consume large amounts of documentation or tutorials, DevCards focuses on **small, repeatable learning sessions**.

🧠 Learn a concept.
🃏 Review it later.
🔁 Repeat.
📈 Build deeper engineering knowledge over time.
