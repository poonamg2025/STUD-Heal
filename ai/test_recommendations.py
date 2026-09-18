from recommendations import generate_recommendation

result = generate_recommendation(
    workload="high",
    energy=2,
    deadline_days=1
)

print("STUD-Heal Recommendations:")
print()

for recommendation in result:
    print("•", recommendation)