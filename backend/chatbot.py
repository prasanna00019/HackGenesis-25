from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
import os
import re

# Import LangChain and related modules
from langchain_groq import ChatGroq
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.document_loaders import PyPDFLoader
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.text_splitter import RecursiveCharacterTextSplitter
router=APIRouter()
# Define the request body model
class ChatRequest(BaseModel):
    query: str

# Create the FastAPI app instance
app = FastAPI(title="Chatbot API", description="A mental health chatbot using LangChain", version="1.0")

# Global variables to hold our initialized components
llm = None
qa_chain = None

# Configuration
GROQ_API_KEY = "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"
MODEL_NAME = "llama-3.3-70b-versatile"
PDF_FILE_PATH = "mental_health_Document.pdf"  # Update the path to your PDF file.
CHROMA_DB_DIR = "./chroma_db"                # Directory to persist the vector store.

ALLOWED_TOPICS = [
    "mental health", "wellbeing", "yoga", "spirituality", "meditation", "mindfulness"
]

REJECTION_MESSAGE = "I'm sorry, but I only answer questions related to mental health, wellbeing, yoga, and spiritual topics."

# Helper function to check allowed topics
def is_valid_topic(query: str) -> bool:
    query_lower = query.lower()
    return any(topic in query_lower for topic in ALLOWED_TOPICS)


def initialize_llm():
    """Initialize the ChatGroq LLM."""
    return ChatGroq(
        temperature=0,
        groq_api_key=GROQ_API_KEY,
        model_name=MODEL_NAME
    )


def create_vector_db():
    """Create and persist the vector database from the PDF document."""
    loader = PyPDFLoader(PDF_FILE_PATH)
    documents = loader.load()

    # Split the document into smaller chunks for processing
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    # Initialize embeddings
    embeddings = HuggingFaceBgeEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Create the vector store and persist it
    vector_db = Chroma.from_documents(texts, embeddings, persist_directory=CHROMA_DB_DIR)
    vector_db.persist()

    print("ChromaDB created and data saved")
    return vector_db


def setup_qa_chain(vector_db, llm):
    """Setup the RetrievalQA chain using the vector DB and the LLM."""
    retriever = vector_db.as_retriever()

    prompt_template = (
        "You are a compassionate mental health and wellness chatbot. "
        "Respond thoughtfully to the following question:\n\n"
        "Context: {context}\n"
        "User: {question}\n"
        "Chatbot:"
    )
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": PROMPT}
    )
    return qa_chain


@router.on_event("startup")
def startup_event():
    """Initialize the LLM, vector DB, and QA chain at startup."""
    global llm, qa_chain

    print("Initializing Chatbot components...")
    llm = initialize_llm()

    # Check if the vector database already exists
    if not os.path.exists(CHROMA_DB_DIR):
        vector_db = create_vector_db()
    else:
        embeddings = HuggingFaceBgeEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vector_db = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
        print("Loaded existing ChromaDB from disk.")

    qa_chain = setup_qa_chain(vector_db, llm)
    print("Chatbot is ready to receive queries.")


@router.post("/chat")
def chat_endpoint(chat_request: ChatRequest):
    """Endpoint to process a chat message and return the chatbot's response."""
    if not qa_chain:
        raise HTTPException(status_code=500, detail="Chatbot not initialized.")

    query = chat_request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    # Check if the query is related to allowed topics
    if not is_valid_topic(query):
        return {"response": REJECTION_MESSAGE}

    try:
        response = qa_chain.run(query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
