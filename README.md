# 🏥 Vera Health – E/M Classifier MVP

AI-powered emergency medicine documentation assistant that classifies clinical notes based on AMA 2023 and ACEP guidelines. 

Built with **FastAPI**, **LangChain**, **OpenAI**, **ChromaDB** (Backend) and **Next.js**, **Tailwind CSS** (Frontend).

---

## 🔧 Project Structure

```bash
vera-health-mvp/
├── backend/                     # FastAPI backend
│   ├── main.py                  # Classification endpoint
│   └── rag/
│       ├── embed_guidelines.py # Embeds guideline PDF
│       ├── retriever.py        # RAG-based retrieval logic
│       └── db/                 # Vector DB (Chroma) storage
│
├── frontend/                    # Next.js 14+ frontend
│   ├── app/
│   │   ├── page.tsx            # Landing page with Google OAuth
│   │   ├── new/                # E/M classification page
│   │   ├── templates/          # Template selection page
│   │   ├── references/         # Static guideline references
│   │   ├── settings/           # API key configuration page
│   │   └── providers/          # Auth & session providers
│   ├── public/
│   │   └── 2023-e-m-descriptors-guidelines.pdf
│   └── components/             # Shared UI components (navbar, buttons, etc.)
│
├── .env.local                  # Environment variables (gitignored)
├── .env                        # Local API key storage (gitignored)
├── .gitignore
├── README.md
├── requirements.txt            # Python backend dependencies
└── package.json                # Frontend dependencies
```

---

## ⚙️ Prerequisites

- Python 3.10+
- Node.js 18+
- OpenAI API Key

---

## 🧪 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/your-username/vera-health-mvp.git
cd vera-health-mvp

### BACKEND
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# (Optional) Embed guidelines
python rag/embed_guidelines.py

# Run FastAPI server
uvicorn main:app --reload

### FRONTEND
cd frontend
npm install
npm run dev

Then go to: http://localhost:3000
```

### 2. Requirements

```bash
cd backend
pip install -r requirements.txt
```

---

## 🔑 Usage
1. Visit the [Vera Health - E/M Classifier Website](https://vera-health-mvp-soto.vercel.app/) - DON'T FORGET to equip yourself with an [OpenAI API Key](https://platform.openai.com/api-keys).

2. You can either:
   - Try 1 of our Templates.
   - Analyze one of your clinical notes.


Once you click “Analyze E/M Level”, you will get:
- The suggested E/M code.
- The MDM breakdown (COPA, Data, Risk).
- Additional CPTs.
- Documentation gaps.

You can optionally view document source & guideline context.

---

## Credits
Personal project
Built by Victor Soto for [Vera Health](https://www.vera-health.ai/) :)
