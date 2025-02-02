from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot import router as chatbot_router
from recommend_yoga import router as yoga_recommendation_router
from recommend_meditation import router as meditation_recommendation_router
from score_journal import router as score_journal_router
from recommend_blog import router as blog_recommendation_router
from recommend_chants import router as chants_recommendation_router
from general_recommend import router as general_recommendation_router
app = FastAPI(
    title="ML Services API", 
    description="API combining multiple ML services", 
    version="1.0"
)

# CORS Configuration
origins = ["http://localhost:5180"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include various routers
app.include_router(chatbot_router, prefix="/api", tags=["Chatbot"]);
app.include_router(yoga_recommendation_router, prefix="/yoga", tags=["Yoga Recommendations"]);
app.include_router(meditation_recommendation_router, prefix="/meditation", tags=["Meditation Recommendations"]);
app.include_router(score_journal_router, prefix="/score", tags=["Score Journal"]);
app.include_router(blog_recommendation_router, prefix="/blog", tags=["Blog Recommendations"]);
app.include_router(chants_recommendation_router, prefix="/chants", tags=["Chants Recommendations"]);
app.include_router(general_recommendation_router, prefix="/general", tags=["General Recommendations"]);
@app.get("/")
async def root():
    return {"message": "Welcome to the ML Services API!"}
