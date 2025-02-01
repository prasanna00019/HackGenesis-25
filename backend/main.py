from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot import router as chatbot_router

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
app.include_router(chatbot_router, prefix="/api", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "Welcome to the ML Services API!"}
