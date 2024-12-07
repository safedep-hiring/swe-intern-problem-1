from pydantic import BaseModel, constr

class CommandBase(BaseModel):
    command: constr(min_length=1, max_length=20)

class CommandCreate(CommandBase):
    pass

class Command(CommandBase):
    id:int