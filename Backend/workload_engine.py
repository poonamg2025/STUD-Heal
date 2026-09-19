from datetime import date

from database import SessionLocal
from models import Assessment, Subject


PRIORITY_MULTIPLIER = {
    "low": 0.8,
    "medium": 1.0,
    "high": 1.3,
}


def calculate_assessment_workload(
    estimated_hours,
    due_date,
    priority="medium",
):
    """
    Calculate workload for one assessment.
    """

    today = date.today()

    estimated_hours = float(estimated_hours)

    days_remaining = (due_date - today).days

    if days_remaining <= 0:
        days_remaining = 1

    multiplier = PRIORITY_MULTIPLIER.get(
        priority.lower(),
        1.0,
    )

    daily_hours = (
        estimated_hours / days_remaining
    ) * multiplier

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
    Get workload information for all pending
    assessments belonging to a user.
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


def calculate_overall_workload(user_id):
    """
    Calculate an overall workload signal for a student.
    """

    workload_items = get_user_workload(user_id)

    if not workload_items:
        return {
            "risk_level": "low",
            "total_assessments": 0,
            "total_estimated_hours": 0,
            "average_daily_hours": 0,
            "message": "No pending assessments found.",
        }

    total_hours = sum(
        item["estimated_hours"]
        for item in workload_items
    )

    total_daily_hours = sum(
        item["daily_hours"]
        for item in workload_items
    )

    assessment_count = len(workload_items)

    if total_daily_hours < 2:
        risk_level = "low"

    elif total_daily_hours < 4:
        risk_level = "moderate"

    elif total_daily_hours < 6:
        risk_level = "high"

    else:
        risk_level = "very_high"

    if risk_level == "low":
        message = (
            "Your current academic workload appears manageable."
        )

    elif risk_level == "moderate":
        message = (
            "Your workload is becoming significant. "
            "Planning study sessions and breaks may help."
        )

    elif risk_level == "high":
        message = (
            "Your current workload is high. "
            "Consider prioritizing tasks and spreading "
            "study sessions across available days."
        )

    else:
        message = (
            "Your current workload is very high. "
            "Consider reviewing deadlines and seeking "
            "support from a trusted academic or campus resource."
        )

    return {
        "risk_level": risk_level,
        "total_assessments": assessment_count,
        "total_estimated_hours": round(total_hours, 2),
        "average_daily_hours": round(total_daily_hours, 2),
        "message": message,
        "assessments": workload_items,
    }