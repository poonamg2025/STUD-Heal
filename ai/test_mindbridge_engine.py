from mindbridge_engine import analyze_student


result = analyze_student(
    workload="high",
    energy=2,
    stress=4,
    deadline_days=1
)

print("===== STUD-Heal ANALYSIS =====")

print("\nWellbeing:")
print(result["wellbeing"])

print("\nRecommendations:")

for recommendation in result["recommendations"]:
    print("•", recommendation)