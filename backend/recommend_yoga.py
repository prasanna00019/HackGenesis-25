from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from typing import List
from pymongo import MongoClient
import numpy as np

# MongoDB connection setup
MONGO_URI = "mongodb+srv://prasanna000019:ZjaJsXFAKp7bFCBR@cluster1.jmmvbov.mongodb.net/MentalHealthDB?retryWrites=true&w=majority&appName=Cluster1"
DB_NAME = "MentalHealthDB"
COLLECTION_NAME = "yogas"

# Initialize MongoDB client
db_client = MongoClient(MONGO_URI)
db = db_client[DB_NAME]
yoga_collection = db[COLLECTION_NAME]

# Load sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Define router for yoga recommendations
router = APIRouter()

class YogaRecommendationRequest(BaseModel):
    user_query: str

@router.post("/recommend", response_model=List[dict])
async def get_yoga_recommendation(request: YogaRecommendationRequest):
    user_query = request.user_query
    query_embedding = model.encode(user_query, convert_to_tensor=True)

    # Fetch yoga data from MongoDB
    yoga_data = list(yoga_collection.find({}, {"_id": 0}))

    if not yoga_data:
        raise HTTPException(status_code=404, detail="No yoga data found.")

    yoga_embeddings = []
    texts = []
    for entry in yoga_data:
        text = f"{entry.get('title', '')} {entry.get('description', '')} {entry.get('Benefits', '')}"
        embedding = model.encode(text, convert_to_tensor=True)
        yoga_embeddings.append(embedding)
        texts.append(entry)

    # Calculate similarity scores
    similarity_scores = [util.cos_sim(query_embedding, emb).item() for emb in yoga_embeddings]

    # Sort matches by similarity scores
    sorted_indices = np.argsort(similarity_scores)[::-1]
    top_matches = []
    threshold = 0.42

    for idx in sorted_indices[:3]:
        if similarity_scores[idx] >= threshold:
            match = {
                "Title": texts[idx].get("title"),
                "Description": texts[idx].get("description"),
                "Benefits": texts[idx].get("Benefits"),
                "Link": texts[idx].get("link", "No link provided")
            }
            top_matches.append(match)

    if top_matches:
        return top_matches
    else:
        raise HTTPException(status_code=404, detail="No suitable recommendations found for your condition.")
