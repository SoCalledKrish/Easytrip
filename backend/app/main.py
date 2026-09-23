from fastapi import FastAPI
from app.routers.countries import router as countries_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EasyTrip API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(countries_router)

@app.get("/")
def root():
    return {"message": "EasyTrip API Running"}