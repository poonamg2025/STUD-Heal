from database import SessionLocal
from models import WellbeingCheckin


def calculate_wellbeing_signal(
    workload_manageability,
    stress_level,
    energy_level,
):
    """
    Calculate a simple wellbeing support signal.

    Scores are 1-5:
    workload_manageability: 1 = difficult to manage, 5 = manageable
    stress_level: 1 = low, 5 = high
    energy_level: 1 = low, 5 = high

    This is NOT a medical or mental-health diagnosis.
    """

    support_score = 0

    # Difficult-to-manage workload
    if workload_manageability <= 2:
        support_score += 2
    elif workload_manageability == 3:
        support_score += 1

    # Higher stress
    if stress_level >= 4:
        support_score += 2
    elif stress_level == 3:
        support_score += 1

    # Lower energy
    if energy_level <= 2:
        support_score += 2
    elif energy_level == 3:
        support_score += 1

    if support_score <= 1:
        signal = "stable"
        message = (
            "Your recent check-in looks relatively stable. "
            "Keep using healthy study routines and regular breaks."
        )

    elif support_score <= 3:
        signal = "needs_attention"
        message = (
            "Your check-in suggests that your current routine "
            "may benefit from some adjustments. Consider "
            "breaking large tasks into smaller sessions and "
            "taking regular breaks."
        )

    else:
        signal = "additional_support"
        message = (
            "Your check-in suggests you may benefit from "
            "additional support. Consider reducing workload "
            "where possible and connecting with a trusted "
            "person, academic advisor, or campus support service."
        )

    return {
        "signal": signal,
        "support_score": support_score,
        "message": message,
    }


def save_wellbeing_checkin(
    user_id,
    workload_manageability,
    stress_level,
    energy_level,
):
    """
    Save a voluntary wellbeing check-in.
    """

    db = SessionLocal()

    try:
        checkin = WellbeingCheckin(
            user_id=user_id,
            workload_manageability=workload_manageability,
            stress_level=stress_level,
            energy_level=energy_level,
        )

        db.add(checkin)
        db.commit()
        db.refresh(checkin)

        signal = calculate_wellbeing_signal(
            workload_manageability,
            stress_level,
            energy_level,
        )

        return {
            "checkin_id": checkin.id,
            "user_id": checkin.user_id,
            "workload_manageability": (
                checkin.workload_manageability
            ),
            "stress_level": checkin.stress_level,
            "energy_level": checkin.energy_level,
            "signal": signal,
        }

    finally:
        db.close()


def get_user_checkins(user_id):
    """
    Get wellbeing check-ins for a user.
    """

    db = SessionLocal()

    try:
        checkins = (
            db.query(WellbeingCheckin)
            .filter(
                WellbeingCheckin.user_id == user_id
            )
            .order_by(
                WellbeingCheckin.created_at.desc()
            )
            .all()
        )

        return [
            {
                "id": checkin.id,
                "workload_manageability": (
                    checkin.workload_manageability
                ),
                "stress_level": checkin.stress_level,
                "energy_level": checkin.energy_level,
                "created_at": checkin.created_at,
            }
            for checkin in checkins
        ]

    finally:
        db.close()