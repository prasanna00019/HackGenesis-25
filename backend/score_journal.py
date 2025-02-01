from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from transformers import pipeline

# Define the request model
class SentimentRequest(BaseModel):
    text: str

# Load a pre-trained sentiment analysis model
sentiment_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

router=APIRouter()

@router.post("/analyze-sentiment")
async def analyze_sentiment(request: SentimentRequest):
    journal_entry = request.text.strip()

    if not journal_entry:
        raise HTTPException(status_code=400, detail="No text provided")

    # Analyze sentiment using Hugging Face Transformers
    result = sentiment_pipeline(journal_entry)[0]
    sentiment = result["label"]
    confidence = result["score"]

    return {
        "text": journal_entry,
        "sentiment": sentiment,
        "confidence": confidence,
    }