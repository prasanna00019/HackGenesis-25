from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from typing import List
from pymongo import MongoClient
import numpy as np

# MongoDB connection setup
MONGO_URI = "mongodb+srv://prasanna000019:ZjaJsXFAKp7bFCBR@cluster1.jmmvbov.mongodb.net/MentalHealthDB?retryWrites=true&w=majority&appName=Cluster1"
DB_NAME = "MentalHealthDB"
COLLECTION_NAME = "blogs"

# Initialize MongoDB client
db_client = MongoClient(MONGO_URI)
db = db_client[DB_NAME]
blogs_collection = db[COLLECTION_NAME]
# Load sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")
# Define router for blogs recommendations
router = APIRouter()
class BlogsRecommendationRequest(BaseModel):
    user_query: str
@router.post("/recommend", response_model=List[dict])
async def get_blog_recommendation(request: BlogsRecommendationRequest):
    user_query = request.user_query
    query_embedding = model.encode(user_query, convert_to_tensor=True)
    # Fetch blogs data from MongoDB
    blogs_data = list(blogs_collection.find({}, {"_id": 0}))
    if not blogs_data:
        raise HTTPException(status_code=404, detail="No blogs data found.")
    blogs_embeddings = []
    texts = []
    for entry in blogs_data:
        text = f"{entry.get('title', '')} {entry.get('description', '')} {entry.get('Benefits', '')}"
        embedding = model.encode(text, convert_to_tensor=True)
        blogs_embeddings.append(embedding)
        texts.append(entry)
    # Calculate similarity scores
    similarity_scores = [util.cos_sim(query_embedding, emb).item() for emb in blogs_embeddings]
    # Sort matches by similarity scores
    sorted_indices = np.argsort(similarity_scores)[::-1]
    top_matches = []
    threshold = 0.42
    for idx in sorted_indices[:3]:
        if similarity_scores[idx] >= threshold:
            match = {
                "title": texts[idx].get("title"),
                "description": texts[idx].get("description"),
                "benefits": texts[idx].get("Benefits"),
                "link": texts[idx].get("link", "No link provided")
            }
            top_matches.append(match)
    if top_matches:
        return top_matches
    else:
        raise HTTPException(status_code=404, detail="No suitable recommendations found for your condition.")
