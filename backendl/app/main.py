from fastapi import FastAPI

from app.database import Base, engine


# ==================================================
# IMPORT DATABASE MODELS
# ==================================================

from app.models import user
from app.models import email_verification
from app.models import assignment
from app.models import checkin
from app.models import resource
from app.models import peer_support


# ==================================================
# IMPORT ROUTES
# ==================================================

from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.assignments import router as assignments_router
from app.routes.workload import router as workload_router
from app.routes.planner import router as planner_router
from app.routes.what_if import router as what_if_router
from app.routes.checkins import router as checkins_router
from app.routes.recommendations import router as recommendations_router
from app.routes.resources import router as resources_router
from app.routes.peer_support import router as peer_support_router


# ==================================================
# CREATE DATABASE TABLES
# ==================================================

Base.metadata.create_all(bind=engine)


# ==================================================
# CREATE FASTAPI APPLICATION
# ==================================================

app = FastAPI(
    title="STUD-Heal API",
    description="Backend API for the STUD-Heal student wellbeing application",
    version="1.0.0"
)


# ==================================================
# INCLUDE API ROUTES
# ==================================================

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(assignments_router)
app.include_router(workload_router)
app.include_router(planner_router)
app.include_router(what_if_router)
app.include_router(checkins_router)
app.include_router(recommendations_router)
app.include_router(resources_router)
app.include_router(peer_support_router)


# ==================================================
# HOME ROUTE
# ==================================================

@app.get("/")
def home():
    return {
        "message": "STUD-Heal Backend is running!"
    }