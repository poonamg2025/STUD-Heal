from pydantic import BaseModel


class WhatIfRequest(BaseModel):
    additional_hours: int = 0
    extra_days: int = 0