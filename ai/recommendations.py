def generate_recommendation(workload, energy, deadline_days, stress):
    recommendations = []

    if workload == "high":
        recommendations.append(
            "Your workload is high. Break large tasks into smaller steps."
        )

    if deadline_days <= 1:
        recommendations.append(
            "You have a deadline very soon. Prioritize the most urgent task first."
        )
    elif deadline_days <= 3:
        recommendations.append(
            "A deadline is approaching. Consider creating a short focused study plan."
        )

    if energy <= 2:
        recommendations.append(
            "Your energy level is low. Try a shorter study session with regular breaks."
        )
    if stress >= 4:
        recommendations.append(
            "Your stress level is elevated. Break your work into smaller manageable steps."
        )
    if len(recommendations) == 0:
        recommendations.append(
            "Your current workload looks manageable. Keep following your study plan."
        )

    return recommendations