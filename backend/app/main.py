from fastapi import FastAPI
from app.routers.countries import router as countries_router

app = FastAPI(
    title="EasyTrip API"
)

app.include_router(countries_router)

@app.get("/")
def root():
    return {"message": "EasyTrip API Running"}