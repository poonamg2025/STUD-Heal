def process_checkin(energy, stress):
    result = {
        "energy": energy,
        "stress": stress
    }
    if energy <= 2:
        result["energy_status"] = "Low"
    else:
        result["energy_status"] = "Normal"
    if stress >= 4:
        result["stress_status"] = "High"
    else:
        result["stress_status"] = "Normal"
    if energy <= 2 and stress >= 4:
        result["overall_status"] = "Needs Attention"
    elif energy <= 2 or stress >= 4:
        result["overall_status"] = "Monitor"
    else:
        result["overall_status"] = "Stable"

    return result