from datetime import datetime, timezone, timedelta

from sqlalchemy.orm import Session

from app.models.assignment import Assignment


def calculate_what_if(
    db: Session,
    user_id: int,
    additional_hours: int,
    extra_days: int
):

    assignments = db.query(Assignment).filter(
        Assignment.user_id == user_id,
        Assignment.is_completed == False
    ).all()

    total_hours = 0
    high_priority = 0

    for assignment in assignments:

        total_hours += assignment.estimated_hours

        if assignment.priority.lower() == "high":
            high_priority += 1

    # Apply hypothetical additional study hours
    adjusted_hours = max(
        0,
        total_hours - additional_hours
    )

    # Calculate adjusted workload
    if adjusted_hours == 0:
        workload_level = "Low"

    elif adjusted_hours <= 5:
        workload_level = "Low"

    elif adjusted_hours <= 15:
        workload_level = "Medium"

    else:
        workload_level = "High"

    # Count assignments affected by postponement
    affected_assignments = 0

    if extra_days > 0:

        current_time = datetime.now(timezone.utc)

        new_date = current_time + timedelta(
            days=extra_days
        )

        for assignment in assignments:

            if assignment.deadline <= new_date:
                affected_assignments += 1

    return {
        "current_pending_hours": total_hours,
        "additional_study_hours": additional_hours,
        "adjusted_pending_hours": adjusted_hours,
        "high_priority_assignments": high_priority,
        "postponed_days": extra_days,
        "affected_assignments": affected_assignments,
        "projected_workload": workload_level
    }