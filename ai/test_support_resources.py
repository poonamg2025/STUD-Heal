from support_resources import get_support_resources


print("===== STUD-Heal SUPPORT HUB =====")

resources = get_support_resources()

for resource in resources:
    print("\nCategory:", resource["category"])
    print("Title:", resource["title"])
    print("Type:", resource["type"])
    print("Description:", resource["description"])


print("\n===== ACADEMIC SUPPORT ONLY =====")

academic_resources = get_support_resources("Academic Support")

for resource in academic_resources:
    print("•", resource["title"])