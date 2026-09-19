from workload_engine import calculate_overall_workload
from wellbeing_engine import get_user_checkins


def create_support_plan(user_id):
    """
    Combine academic workload and recent wellbeing
    check-in information into a preventive support plan.

    This is a support-planning tool, not a medical
    or mental-health diagnostic system.
    """

    workload = calculate_overall_workload(user_id)

    checkins = get_user_checkins(user_id)

    if checkins:
        latest_checkin = checkins[0]

        workload_manageability = (
            latest_checkin["workload_manageability"]
        )
        stress_level = latest_checkin["stress_level"]
        energy_level = latest_checkin["energy_level"]

    else:
        latest_checkin = None

        workload_manageability = None
        stress_level = None
        energy_level = None

    recommendations = []

    # Academic workload recommendations
    if workload["risk_level"] in ["high", "very_high"]:
        recommendations.append(
            "Prioritize assessments with the nearest deadlines."
        )

        recommendations.append(
            "Break large assignments into smaller study sessions."
        )

    elif workload["risk_level"] == "moderate":
        recommendations.append(
            "Keep a consistent study schedule and avoid "
            "leaving large tasks until the deadline."
        )

    else:
        recommendations.append(
            "Your current workload appears manageable. "
            "Continue using a consistent study routine."
        )

    # Wellbeing-based recommendations
    if stress_level is not None:

        if stress_level >= 4:
            recommendations.append(
                "Consider adding short breaks between study sessions."
            )

        if energy_level <= 2:
            recommendations.append(
                "Consider shorter study sessions with recovery "
                "time between them."
            )

        if workload_manageability <= 2:
            recommendations.append(
                "Consider breaking difficult tasks into smaller "
                "steps and discussing workload concerns with "
                "a trusted academic support person."
            )

    # Combined signal
    if (
        workload["risk_level"] in ["high", "very_high"]
        and stress_level is not None
        and stress_level >= 4
    ):
        overall_signal = "high_support_need"

        summary = (
            "Your academic workload and recent check-in both "
            "suggest that your current routine may benefit "
            "from additional planning and support."
        )

    elif (
        workload["risk_level"] in ["moderate", "high"]
        or (
            stress_level is not None
            and stress_level >= 4
        )
    ):
        overall_signal = "needs_attention"

        summary = (
            "Some parts of your current academic routine "
            "may benefit from adjustment."
        )

    else:
        overall_signal = "stable"

        summary = (
            "Your current academic and routine signals "
            "appear relatively manageable."
        )

    return {
        "user_id": user_id,
        "overall_signal": overall_signal,
        "summary": summary,
        "workload": workload,
        "latest_checkin": latest_checkin,
        "recommendations": recommendations,
    }