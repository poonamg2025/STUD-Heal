from mindbridge_engine import analyze_student


def run_test(title, workload, energy, stress, deadline_days):

    result = analyze_student(
        workload=workload,
        energy=energy,
        stress=stress,
        deadline_days=deadline_days
    )

    print("\n==============================")
    print(title)
    print("==============================")

    print("Risk Level:", result["risk_level"])

    print("\nWellbeing:")
    print(result["wellbeing"])

    print("\nRecommendations:")

    for recommendation in result["recommendations"]:
        print("•", recommendation)


run_test(
    "Scenario 1 - High Workload",
    workload="high",
    energy=2,
    stress=4,
    deadline_days=1
)

run_test(
    "Scenario 2 - Normal Situation",
    workload="medium",
    energy=4,
    stress=2,
    deadline_days=5
)

run_test(
    "Scenario 3 - Approaching Deadline",
    workload="medium",
    energy=3,
    stress=3,
    deadline_days=2
)