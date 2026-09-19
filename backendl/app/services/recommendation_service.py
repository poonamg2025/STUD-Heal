from sqlalchemy.orm import Session

from app.models.assignment import Assignment
from app.models.checkin import CheckIn


def generate_recommendations(
    db: Session,
    user_id: int
):
    # Get pending assignments
    assignments = db.query(Assignment).filter(
        Assignment.user_id == user_id,
        Assignment.is_completed == False
    ).order_by(
        Assignment.deadline.asc()
    ).all()

    # Get latest wellbeing check-in
    latest_checkin = db.query(CheckIn).filter(
        CheckIn.user_id == user_id
    ).order_by(
        CheckIn.id.desc()
    ).first()

    recommendations = []

    # -----------------------------
    # Workload analysis
    # -----------------------------

    total_hours = 0
    high_priority_count = 0

    for assignment in assignments:

        total_hours += assignment.estimated_hours

        if assignment.priority.lower() == "high":
            high_priority_count += 1

    # -----------------------------
    # Workload recommendations
    # -----------------------------

    if total_hours > 15:
        recommendations.append(
            "Your pending workload is high. Break large tasks into smaller study sessions."
        )

    elif total_hours > 5:
        recommendations.append(
            "You have a moderate workload. Create a daily study schedule and follow it consistently."
        )

    else:
        recommendations.append(
            "Your current workload is manageable. Use the available time to complete pending tasks."
        )

    # -----------------------------
    # Priority recommendations
    # -----------------------------

    if high_priority_count > 0:
        recommendations.append(
            f"You have {high_priority_count} high-priority assignment(s). Try completing these before lower-priority tasks."
        )

    # -----------------------------
    # Deadline recommendation
    # -----------------------------

    if assignments:
        nearest_assignment = assignments[0]

        recommendations.append(
            f"Your nearest deadline is '{nearest_assignment.title}'. Consider working on it first."
        )

    # -----------------------------
    # Wellbeing recommendations
    # -----------------------------

    if latest_checkin:

        if latest_checkin.stress_level >= 8:
            recommendations.append(
                "Your recent stress level was high. Consider taking short breaks between study sessions."
            )

        elif latest_checkin.stress_level >= 5:
            recommendations.append(
                "Your recent stress level was moderate. Include regular short breaks while studying."
            )

        if latest_checkin.energy_level <= 3:
            recommendations.append(
                "Your recent energy level was low. Consider starting with shorter and easier study sessions."
            )

        elif latest_checkin.energy_level >= 8:
            recommendations.append(
                "Your recent energy level was good. You can use this time for more demanding academic tasks."
            )

    else:
        recommendations.append(
            "Complete a wellbeing check-in regularly so STUD-Heal can provide more personalized suggestions."
        )

    # -----------------------------
    # General recommendation
    # -----------------------------

    recommendations.append(
        "Remember to balance study time with breaks, sleep, meals, and personal time."
    )

    return {
        "pending_assignments": len(assignments),
        "pending_hours": total_hours,
        "high_priority_assignments": high_priority_count,
        "recommendations": recommendations
    }