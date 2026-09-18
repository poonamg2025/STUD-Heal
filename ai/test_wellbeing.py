from wellbeing import process_checkin


result = process_checkin(
    energy=2,
    stress=4
)

print("Wellbeing Check-in:")
print(result)