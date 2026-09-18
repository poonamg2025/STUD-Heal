from fastapi import FastAPI

from workload_engine import get_user_workload


app = FastAPI(
    title="STUDHeal API",
    description="Student wellbeing and workload support API",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "message": "STUDHeal API is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/workload/{user_id}")
def get_workload(user_id: int):
    return {
        "user_id": user_id,
        "workload": get_user_workload(user_id),
    }