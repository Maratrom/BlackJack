from random import shuffle

from django.utils import timezone
from ninja import NinjaAPI
from polls.models import Choice, Game, Player, Question
from polls.schemas import (AddGameSchema, AddQuestionSchema, ChoiceSchema,
                           GameSchema, PatchPlayerSchma, PlayerSchema,
                           QuestionSchema)

api = NinjaAPI()

# --- QUESTION ---
@api.post("/create_question/", response=QuestionSchema)
def add_question(request, add_question: AddQuestionSchema):
    question = Question.objects.create(
        question_text=add_question.question_text,
        pub_date=timezone.now()
        )

    for choice in add_question.choices:
        Choice.objects.create(
            choice_text=choice,
            question=question
        )

    return question

@api.get("/question/{question_id}", response=QuestionSchema)
def get_question(request, question_id: int):
    return Question.objects.get(pk=question_id)

@api.delete("/delete_question/{question_id}", response=None)
def delete_question(request, question_id: int):
    Question.objects.delete(pk=question_id)

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
    return Game.objects.get(pk=game_id)


# --- PLAYER ---
@api.get("/player/{player_id}", response=PlayerSchema)
def get_player(request, player_id: int):
    return Player.objects.get(pk=player_id)

@api.patch("/player/{player_id}", response=PlayerSchema)
def patch_player(request, player_id: int, data: PatchPlayerSchma):
    player = Player.objects.get(pk=player_id)    
    Player.objects.filter(pk=player_id).update(**{"score": data.score})

    return player

