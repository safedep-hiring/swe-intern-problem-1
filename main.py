import fastapi as  _fastapi
from api.v1 import endpoints as _endpoint
from model import create_table

async def lifespan_context(app: _fastapi.FastAPI):
    create_table()
    yield

app = _fastapi.FastAPI(lifespan = lifespan_context)

app.include_router(_endpoint.router, prefix="/api/v1/commands",tags=["Commands"])