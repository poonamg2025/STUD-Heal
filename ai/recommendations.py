def generate_recommendation(workload, energy, deadline_days, stress):
    recommendations = []

    if workload == "high":
        recommendations.append(
            "Your workload is high. Try breaking your work into smaller tasks."
        )

    if deadline_days <= 1:
        recommendations.append(
            "You have a deadline very soon. Consider prioritizing this task."
        )

    if energy <= 2:
        recommendations.append(
            "Your energy level is low. Try a shorter study session with breaks."
        )

    if stress >= 4:
        recommendations.append(
            "You reported higher stress. Consider dividing your work into smaller steps and taking regular breaks."
        )

    if len(recommendations) == 0:
        recommendations.append(
            "Your current workload looks manageable. Keep following your study plan."
        )

    return recommendations