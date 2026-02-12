from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import auth, general

app = FastAPI(title="Cyber Portfolio API")

# ✅ CORS for local + Vercel deployments
# Note: FastAPI's CORS middleware doesn't reliably support wildcard entries like "https://*.vercel.app"
# so we use allow_origin_regex for Vercel subdomains.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API Routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(general.router, prefix="/api", tags=["general"])


@app.get("/", tags=["system"])
async def root():
    return {"message": "System Online", "status": "Secure"}


@app.get("/health", tags=["system"])
async def health():
    return {"status": "ok"}


# ✅ Do NOT run uvicorn here in production.
# Railway / Vercel deployments will start the server via Procfile / Start Command.
# If you want to run locally, use:
#   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
