 # Vera Health – E/M Classifier MVP

Just a quick MVP for Maxime.

It is an AI-powered emergency medicine documentation assistant that classifies clinical notes based on AMA 2023 and ACEP guidelines. 

[Vera Health - E/M Classifier](https://vera-health-mvp-soto.vercel.app/)

I built it with **FastAPI**, **LangChain**, **OpenAI**, **ChromaDB** (Backend) and **Next.js**, **Tailwind CSS** (Frontend).

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
---

DON'T FORGET to equip yourself with an [OpenAI API Key](https://platform.openai.com/api-keys).

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

by soto for [Vera Health](https://www.vera-health.ai/).
