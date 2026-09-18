from wellbeing import process_checkin
from recommendations import generate_recommendation


def analyze_student(workload, energy, stress, deadline_days):


    wellbeing_result = process_checkin(
        energy=energy,
        stress=stress
    )

    recommendations = generate_recommendation(
        workload=workload,
        energy=energy,
        deadline_days=deadline_days,
        stress=stress
    )

    if (
        workload == "high"
        and energy <= 2
        and stress >= 4
        and deadline_days <= 1
    ):
        risk_level = "High"

    elif (
        workload == "high"
        or energy <= 2
        or stress >= 4
        or deadline_days <= 3
    ):
        risk_level = "Moderate"

    else:
        risk_level = "Low"

    return {
        "risk_level": risk_level,
        "wellbeing": wellbeing_result,
        "recommendations": recommendations
    }