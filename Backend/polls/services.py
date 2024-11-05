from polls.models import Game, Player

def create_game(game_name: str, players: list[str]):
    game = Game.objects.create(name=game_name)

    for player in players:
        Player.objects.create(name=player, game=game)


def retrieve_players(game: Game) -> list[Player]:
    return game.players.all()

def retrieve_players(game_id: int) -> list[Player]:
    game = Game.objects.get(pk=game_id)
    players = game.players.all()
    return players

def update_score(player: Player, score: int = 1) -> None:
    player.increment_score(score)

def change_score(player_id: int, score: int) -> Player:
    player = Player.objects.get(pk=player_id)
    player.score = score
    player.save()
    return player