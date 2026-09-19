from datetime import date, timedelta


def create_study_plan(
    title,
    estimated_hours,
    due_date,
):
    """
    Create a simple daily study plan for one assessment.
    """

    today = date.today()

    estimated_hours = float(estimated_hours)

    days_remaining = (due_date - today).days

    if days_remaining <= 0:
        days_remaining = 1

    daily_hours = estimated_hours / days_remaining

    plan = []

    remaining_hours = estimated_hours

    for day_number in range(days_remaining):
        study_date = today + timedelta(days=day_number)

        hours_today = min(
            daily_hours,
            remaining_hours,
        )

        plan.append({
            "date": study_date.isoformat(),
            "assessment": title,
            "study_hours": round(hours_today, 2),
        })

        remaining_hours -= hours_today

    return plan