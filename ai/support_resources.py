SUPPORT_RESOURCES = [
    {
        "category": "Academic Support",
        "title": "Study Planning",
        "description": "Break large assignments into smaller tasks and plan them across available study sessions.",
        "type": "Study Tip"
    },
    {
        "category": "Academic Support",
        "title": "Time Management",
        "description": "Prioritize tasks by urgency and importance, especially when multiple deadlines are approaching.",
        "type": "Study Tip"
    },
    {
        "category": "Wellbeing",
        "title": "Take Regular Breaks",
        "description": "Use short breaks between focused study sessions to rest and return with better concentration.",
        "type": "Wellbeing Tip"
    },
    {
        "category": "Wellbeing",
        "title": "Healthy Study Routine",
        "description": "Maintain a consistent study schedule while allowing enough time for sleep, meals and rest.",
        "type": "Wellbeing Tip"
    },
    {
        "category": "Wellbeing",
        "title": "When You Feel Overwhelmed",
        "description": "Pause, identify the most important next step, and work on one manageable task at a time.",
        "type": "Wellbeing Tip"
    }
]


def get_support_resources(category=None):
    if category is None:
        return SUPPORT_RESOURCES

    return [
        resource
        for resource in SUPPORT_RESOURCES
        if resource["category"] == category
    ]