from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.assignment import Assignment


def generate_study_plan(
    db: Session,
    user_id: int
):

    assignments = db.query(Assignment).filter(
        Assignment.user_id == user_id,
        Assignment.is_completed == False
    ).order_by(
        Assignment.deadline.asc()
    ).all()

    study_plan = []

    for assignment in assignments:

        current_time = datetime.now(timezone.utc)

        if assignment.deadline <= current_time:
            days_left = 1
        else:
            time_difference = assignment.deadline - current_time
            days_left = max(
                1,
                time_difference.days + 1
            )

        daily_hours = round(
            assignment.estimated_hours / days_left,
            2
        )

        study_plan.append({
            "assignment_id": assignment.id,
            "title": assignment.title,
            "subject": assignment.subject,
            "deadline": assignment.deadline,
            "estimated_hours": assignment.estimated_hours,
            "days_left": days_left,
            "recommended_daily_hours": daily_hours,
            "priority": assignment.priority
        })

    return study_plan