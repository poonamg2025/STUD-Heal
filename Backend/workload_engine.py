from datetime import date

from database import SessionLocal
from models import Assessment, Subject


def calculate_assessment_workload(
    estimated_hours,
    due_date,
    priority="medium",
):
    """
    Calculate the daily study workload for one assessment.
    """

    today = date.today()

    # Convert database Decimal values safely
    estimated_hours = float(estimated_hours)

    # Calculate days remaining
    days_remaining = (due_date - today).days

    # Avoid division by zero
    if days_remaining <= 0:
        days_remaining = 1

    # Priority multiplier
    priority_multiplier = {
        "low": 0.8,
        "medium": 1.0,
        "high": 1.3,
    }

    multiplier = priority_multiplier.get(
        priority.lower(),
        1.0,
    )

    # Calculate daily workload
    daily_hours = (
        estimated_hours / days_remaining
    ) * multiplier

    # Determine workload level
    if daily_hours < 1:
        workload_level = "light"
    elif daily_hours < 2:
        workload_level = "moderate"
    elif daily_hours < 4:
        workload_level = "heavy"
    else:
        workload_level = "very_heavy"

    return {
        "estimated_hours": estimated_hours,
        "days_remaining": days_remaining,
        "daily_hours": round(daily_hours, 2),
        "priority": priority,
        "workload_level": workload_level,
    }


def get_user_workload(user_id):
    """
    Get workload information for all pending assessments
    belonging to a specific user.
    """

    db = SessionLocal()

    try:
        assessments = (
            db.query(Assessment)
            .join(
                Subject,
                Assessment.subject_id == Subject.id,
            )
            .filter(
                Subject.user_id == user_id,
                Assessment.status == "pending",
            )
            .all()
        )

        results = []

        for assessment in assessments:
            workload = calculate_assessment_workload(
                estimated_hours=assessment.estimated_hours,
                due_date=assessment.due_date,
                priority=assessment.priority,
            )

            workload["assessment_id"] = assessment.id
            workload["title"] = assessment.title
            workload["subject_id"] = assessment.subject_id

            results.append(workload)

        return results

    finally:
        db.close()