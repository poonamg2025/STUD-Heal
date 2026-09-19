from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.assignment import Assignment


def calculate_workload(
    db: Session,
    user_id: int
):

    assignments = db.query(Assignment).filter(
        Assignment.user_id == user_id
    ).all()

    total_assignments = len(assignments)

    completed_assignments = 0
    pending_assignments = 0

    total_estimated_hours = 0

    high_priority = 0
    medium_priority = 0
    low_priority = 0

    upcoming_assignments = []

    current_time = datetime.now(timezone.utc)

    for assignment in assignments:

        if assignment.is_completed:
            completed_assignments += 1
        else:
            pending_assignments += 1

            total_estimated_hours += assignment.estimated_hours

            if assignment.priority.lower() == "high":
                high_priority += 1

            elif assignment.priority.lower() == "medium":
                medium_priority += 1

            elif assignment.priority.lower() == "low":
                low_priority += 1

            if assignment.deadline > current_time:
                upcoming_assignments.append(assignment)

    # Calculate workload level
    if pending_assignments == 0:
        workload_level = "Low"

    elif total_estimated_hours <= 5:
        workload_level = "Low"

    elif total_estimated_hours <= 15:
        workload_level = "Medium"

    else:
        workload_level = "High"

    return {
        "total_assignments": total_assignments,
        "completed_assignments": completed_assignments,
        "pending_assignments": pending_assignments,
        "total_estimated_hours": total_estimated_hours,
        "high_priority": high_priority,
        "medium_priority": medium_priority,
        "low_priority": low_priority,
        "upcoming_assignments": len(upcoming_assignments),
        "workload_level": workload_level
    }