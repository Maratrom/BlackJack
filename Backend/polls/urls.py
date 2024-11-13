from random import shuffle

from django.utils import timezone
from ninja import NinjaAPI
from polls.models import Game, Player
from polls.schemas import (AddGameSchema, GameSchema, PatchGameSchema,
                           PatchPlayerSchema, PlayerSchema)

api = NinjaAPI()

# --- GAME ---
@api.post("/start_game/", response=GameSchema)
def start_game(request, add_game: AddGameSchema):
    game = Game.objects.create(
        name=add_game.name
    )

    order_list = list(range(1, len(add_game.players) + 1))
    shuffle(order_list)

    for player, order in zip(add_game.players, order_list):
        Player.objects.create(
            name=player,
            order=order,
            game=game
        )

    return game

@api.get("/game/{game_id}", response=GameSchema)
def get_game(request, game_id: int):
    game = Game.objects.get(pk=game_id)
    players = game.players.order_by('order')
    return {
        "id": game.id,
        "name": game.name,
        "turn": game.turn,
        "ended": game.ended,
        "players": players,
    }

@api.patch("/game/{game_id}", response=GameSchema)
def patch_game(request, game_id: int, data: PatchGameSchema):
    game = Game.objects.filter(pk=game_id)

    if data.name is not None:    
        game.update(**{"name": data.name})

    if data.turn is not None:    
        game.update(**{"turn": data.turn})

    if data.ended is not None:    
        game.update(**{"ended": data.ended})

    return get_game(None, game_id)



# --- PLAYER ---
@api.get("/player/{player_id}", response=PlayerSchema)
def get_player(request, player_id: int):
    return Player.objects.get(pk=player_id)

@api.patch("/player/{player_id}", response=PlayerSchema)
def patch_player(request, player_id: int, data: PatchPlayerSchema):
    player = Player.objects.filter(pk=player_id)

    if data.name is not None:    
        player.update(**{"name": data.name})

    if data.score is not None:    
        player.update(**{"score": data.score})

    if data.order is not None:    
        player.update(**{"order": data.order})    

    return player[0]

