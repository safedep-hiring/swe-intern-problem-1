import fastapi
from fastapi import APIRouter,Form
from schema import CommandCreate, Command
from services import CommandServices
from typing import List

router = APIRouter()

@router.post("", response_model=Command)
async def create_command(command: str = Form(...)):
    command_create = CommandCreate(command=command)
    new_command = CommandServices.post_command(command_create)
    if not new_command:
        raise fastapi.HTTPException(status_code=500,detail="Error While adding command into db")
    return new_command


@router.get("",response_model=List[Command])
async def search(keyword:str):
    if not keyword:
        raise fastapi.HTTPException(status_code=404, detail="Keyword is required")
    results = CommandServices.search_command(keyword=keyword)
    if not results:
        raise fastapi.HTTPException(status_code=404, detail = "No commands found matching the search query")
    return results