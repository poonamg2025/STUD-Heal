from app.database import SessionLocal
from app.models.resource import Resource


db = SessionLocal()


resources = [
    Resource(
        title="Study Break Guide",
        description="Simple techniques to take healthy breaks during long study sessions.",
        category="Study",
        url="https://www.example.com/study-break"
    ),

    Resource(
        title="Time Management Tips",
        description="Practical tips for planning assignments, deadlines and study time.",
        category="Academic",
        url="https://www.example.com/time-management"
    ),

    Resource(
        title="Stress Management",
        description="Basic techniques such as breathing, short breaks and relaxation activities.",
        category="Wellbeing",
        url="https://www.example.com/stress-management"
    ),

    Resource(
        title="Sleep and Student Wellbeing",
        description="Information about maintaining a healthy sleep routine while studying.",
        category="Wellbeing",
        url="https://www.example.com/sleep"
    ),

    Resource(
        title="Campus Support",
        description="Information about accessing student support and counselling services.",
        category="Support",
        url="https://www.example.com/campus-support"
    )
]


for resource in resources:
    db.add(resource)


db.commit()

print("Support Hub resources added successfully!")


db.close()