from datetime import date, timedelta

from database import SessionLocal
from models import Assessment


def calculate_adaptive_plan(
    assessment_id,
    postponed_days=0,
):
    """
    Recalculate an assessment's study plan after a
    hypothetical deadline change.

    This is a planning simulation, not a prediction.
    """

    db = SessionLocal()

    try:
        assessment = (
            db.query(Assessment)
            .filter(
                Assessment.id == assessment_id
            )
            .first()
        )

        if not assessment:
            return {
                "error": "Assessment not found"
            }

        original_due_date = assessment.due_date

        new_due_date = (
            original_due_date
            + timedelta(days=postponed_days)
        )

        today = date.today()

        original_days_remaining = (
            original_due_date - today
        ).days

        new_days_remaining = (
            new_due_date - today
        ).days

        if original_days_remaining <= 0:
            original_days_remaining = 1

        if new_days_remaining <= 0:
            new_days_remaining = 1

        estimated_hours = float(
            assessment.estimated_hours
        )

        original_daily_hours = (
            estimated_hours
            / original_days_remaining
        )

        new_daily_hours = (
            estimated_hours
            / new_days_remaining
        )

        if new_daily_hours < 1:
            workload_level = "light"

        elif new_daily_hours < 2:
            workload_level = "moderate"

        elif new_daily_hours < 4:
            workload_level = "heavy"

        else:
            workload_level = "very_heavy"

        if postponed_days <= 0:
            recommendation = (
                "Keep the current deadline and follow "
                "a consistent study schedule."
            )

        elif new_daily_hours < original_daily_hours:
            recommendation = (
                "The postponed deadline reduces the "
                "required daily study time. However, "
                "avoid delaying the task further."
            )

        else:
            recommendation = (
                "The new deadline creates a tighter "
                "study schedule. Consider starting earlier "
                "or breaking the task into smaller sessions."
            )

        return {
            "assessment_id": assessment.id,
            "title": assessment.title,
            "estimated_hours": estimated_hours,

            "original": {
                "due_date": original_due_date,
                "days_remaining": original_days_remaining,
                "daily_study_hours": round(
                    original_daily_hours,
                    2,
                ),
            },

            "simulated": {
                "postponed_days": postponed_days,
                "new_due_date": new_due_date,
                "days_remaining": new_days_remaining,
                "daily_study_hours": round(
                    new_daily_hours,
                    2,
                ),
                "workload_level": workload_level,
            },

            "recommendation": recommendation,
        }

    finally:
        db.close()