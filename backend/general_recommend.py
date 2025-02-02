from fastapi import FastAPI, HTTPException,APIRouter
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from typing import List
from pymongo import MongoClient
import numpy as np

# MongoDB connection setup
MONGO_URI = "mongodb+srv://prasanna000019:ZjaJsXFAKp7bFCBR@cluster1.jmmvbov.mongodb.net/MentalHealthDB?retryWrites=true&w=majority&appName=Cluster1"
DB_NAME = "MentalHealthDB"
# Initialize MongoDB client
db_client = MongoClient(MONGO_URI)
db = db_client[DB_NAME]

# Load sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Define FastAPI app
router=APIRouter()

class RecommendationRequest(BaseModel):
    user_query: str

@router.post("/recommend", response_model=List[dict])
async def get_recommendations(request: RecommendationRequest):
    user_query = request.user_query
    query_embedding = model.encode(user_query, convert_to_tensor=True)

    # Fetch data from all collections
    collections = {
        "meditations": db["meditations"],
        "yogas": db["yogas"],
        "blogs": db["blogs"],
        "chants": db["chants"]
    }

    all_data = []
    for collection_name, collection in collections.items():
        data = list(collection.find({}))
        for entry in data:
            entry["type"] = collection_name  # Add type to identify the category
            all_data.append(entry)

    if not all_data:
        raise HTTPException(status_code=404, detail="No data found in any collection.")

    # Generate embeddings for all entries
    embeddings = []
    texts = []
    for entry in all_data:
        if entry["type"] == "meditations" or entry["type"] == "yogas":
            text = f"{entry.get('title', '')} {entry.get('description', '')} {entry.get('Benefits', '')}"
        elif entry["type"] == "blogs":
            text = f"{entry.get('title', '')}"
        elif entry["type"] == "chants":
            text = f"{entry.get('description', '')}"
        embedding = model.encode(text, convert_to_tensor=True)
        embeddings.append(embedding)
        texts.append(entry)

    # Calculate similarity scores
    similarity_scores = [util.cos_sim(query_embedding, emb).item() for emb in embeddings]

    # Sort matches by similarity scores
    sorted_indices = np.argsort(similarity_scores)[::-1]
    top_matches = []
    threshold = 0.42
    
    for idx in sorted_indices[:3]:  # Limit to top 3 recommendations
        entry = texts[idx]
        print(entry);
        if similarity_scores[idx] >= threshold:
            entry = texts[idx]
            match = {
    "type": entry["type"],
    "title": entry.get("title", "No title provided"),
    "description": entry.get("description", "No description provided"),
    "benefits": entry.get("Benefits", "No benefits provided"),
    "link": f"http://localhost:5000/article/{entry['_id']}" if entry["type"] == "blogs" else entry.get("link", "No link provided"),
    "content": entry.get("content", "No content provided"),
    "image": entry.get("image", "No image provided")
}
            top_matches.append(match)

    if top_matches:
        return top_matches
    else:
        raise HTTPException(status_code=404, detail="No suitable recommendations found for your condition.")

