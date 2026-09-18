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

    return {
        "wellbeing": wellbeing_result,
        "recommendations": recommendations
    }