# 🏥 Vera Health – E/M Classifier MVP

AI-powered emergency medicine documentation assistant that classifies clinical notes based on AMA 2023 and ACEP guidelines. 

Built with **FastAPI**, **LangChain**, **OpenAI**, **ChromaDB** (Backend) and **Next.js**, **Tailwind CSS** (Frontend).

---

## 🔧 Project Structure

vera-health-mvp/
├── backend/                     # FastAPI backend
│   ├── main.py                  # Classification endpoint
│   └── rag/
│       ├── embed_guidelines.py # Embeds guideline PDF
│       ├── retriever.py        # RAG-based retrieval logic
│       └── db/                 # Vector DB (Chroma) storage
│
├── frontend/                    # Next.js frontend
│   ├── app/
│   │   ├── page.tsx            # Main app page
│   │   ├── templates/
│   │   │   ├── page.tsx
│   │   │   ├── mock_patient_1.py
│   │   │   ├── mock_patient_2.py
│   │   │   └── index.ts
│   │   └── references/         # Static references if needed
│   ├── public/
│   │   └── 2023-e-m-descriptors-guidelines.pdf
│   └── components/             # Shared UI components
│
├── .env                        # Local API key storage (gitignored)
├── .gitignore
├── README.md
├── requirements.txt            # Python backend dependencies
└── package.json                # Frontend dependencies


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
Paste a clinical note or load a mock template

Enter your OpenAI API key when prompted

Click “Analyze E/M Level” to get:

Suggested E/M code

MDM breakdown (COPA, Data, Risk)

Additional CPTs

Documentation gaps

Optionally view document source & guideline context

---

## Credits
Personal project
Built by Victor Soto for Vera Health