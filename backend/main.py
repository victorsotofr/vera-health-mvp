from rag.retriever import get_relevant_guidelines
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from typing import List, Optional
from openai import OpenAI
import json
import os

app = FastAPI()

origins = ["https://vera-health-mvp-soto.vercel.app"]
print("✅ CORS ALLOWED ORIGINS:", origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Authorization", "Content-Type"],
)

class NoteRequest(BaseModel):
    note: str

class CPTCode(BaseModel):
    code: str
    description: str
    confidence: float

class MDMSubsection(BaseModel):
    level: str
    confidence: float
    explanation: str

class MDM(BaseModel):
    level: str
    justification: str
    copa: MDMSubsection
    data: MDMSubsection
    risk: MDMSubsection

class ClassificationResponse(BaseModel):
    suggested_em_level: str
    confidence: float
    mdm: MDM
    cpt_codes: List[CPTCode]
    documentation_gaps: Optional[List[str]] = []
    retrieved_guidelines: Optional[str] = None

@app.post("/classify")
async def classify(request: Request):
    body = await request.json()
    note = body.get("note")
    api_key = request.headers.get("Authorization", "").replace("Bearer ", "").strip()

    if not api_key:
        return {
            "status": "error",
            "reason": "No API key provided in request headers. Make sure it's set in your frontend."
        }

    client = OpenAI(api_key=api_key)
    try:
        relevant_guidelines = get_relevant_guidelines(note, api_key)

        system_prompt = f"""
You are a clinical documentation and emergency medicine billing expert. Your task is to classify a clinical note 
according to AMA 2023 E/M guidelines and ACEP standards.

Below are relevant guideline excerpts retrieved for this case:
{relevant_guidelines}

Follow the Medical Decision Making (MDM) matrix: evaluate 3 key areas—Problems (COPA), Data, and Risk. 
Each should be rated as 'Straightforward', 'Low', 'Moderate', or 'High'. The final E/M level corresponds to the overall MDM level.

IMPORTANT: Your output MUST be a valid JSON object. Include ALL of the following fields at the top level:
- "suggested_em_level": a valid E/M code between 99281 and 99285
- "confidence": a float between 0 and 1 representing your confidence
- "mdm": object with:
    - "level": overall MDM level (string)
    - "justification": explanation for the level (string)
    - "copa": {{ level, confidence, explanation }}
    - "data": {{ level, confidence, explanation }}
    - "risk": {{ level, confidence, explanation }}
- "cpt_codes": array of CPT code objects with {{ code, description, confidence }}
- "documentation_gaps": array of missing items (can be empty)

DO NOT use "COPA", "Data", or "Risk" as keys. Use lowercase: "copa", "data", and "risk".

Only return the structured JSON — no explanation outside the object.
"""

        response = client.chat.completions.create(
            model="gpt-4",
            temperature=0.4,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": note}
            ]
        )

        content = response.choices[0].message.content.strip()
        print("[GPT RAW OUTPUT]:\n", content)

        try:
            structured_dict = json.loads(content)
            mdm_raw = structured_dict.get("mdm", {})
            if "COPA" in mdm_raw and "Data" in mdm_raw and "Risk" in mdm_raw:
                structured_dict["mdm"] = {
                    "level": structured_dict["mdm"].get("level", "High"),
                    "justification": structured_dict["mdm"].get(
                        "justification", "All subfactors (COPA, Data, Risk) were rated High."
                    ),
                    "copa": mdm_raw["COPA"],
                    "data": mdm_raw["Data"],
                    "risk": mdm_raw["Risk"]
                }

            structured = ClassificationResponse(**structured_dict)
            result = structured.dict()
            result["retrieved_guidelines"] = relevant_guidelines
            return result

        except (json.JSONDecodeError, ValidationError) as e:
            return {
                "status": "error",
                "reason": "Response parsing/validation failed.",
                "raw": content,
                "details": str(e)
            }

    except Exception as e:
        return {
            "status": "error",
            "reason": str(e)
        }
