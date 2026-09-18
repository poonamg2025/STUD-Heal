from datetime import date, timedelta

from database import SessionLocal
from models import User, Subject, Assessment


db = SessionLocal()

try:
    # Create demo user
    user = User(
        email="demo@studheal.com",
        password_hash="demo-password",
        email_verified=True,
    )

    db.add(user)
    db.flush()

    # Create subject
    subject = Subject(
        user_id=user.id,
        name="Mathematics",
    )

    db.add(subject)
    db.flush()

    # Create assessment
    assessment = Assessment(
        subject_id=subject.id,
        title="Mathematics Assignment",
        type="assignment",
        due_date=date.today() + timedelta(days=4),
        estimated_hours=12,
        priority="high",
        status="pending",
    )

    db.add(assessment)

    db.commit()

    print("Demo data created successfully!")
    print("User ID:", user.id)
    print("Subject ID:", subject.id)
    print("Assessment ID:", assessment.id)

except Exception as e:
    db.rollback()
    print("Error:", e)

finally:
    db.close()