from ninja import ModelSchema, Schema
from polls.models import  Game, Player

# --- PLAYER ---
class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ["id", "name", "score", "order"]

class PatchPlayerSchema(Schema):
    name: str | None = None
    score: int | None = None
    order: int | None = None

# --- GAME ---
class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ["id", "name", "turn", "ended"]
    
    players: list[PlayerSchema]

class AddGameSchema(Schema):
    name: str
    players: list[str]

class PatchGameSchema(Schema):
    name: str | None = None
    turn: int | None = None
    ended: bool | None = None
