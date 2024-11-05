from ninja import ModelSchema, Schema
from polls.models import Choice, Question, Game, Player

class ChoiceSchema(ModelSchema):
    class Meta:
        model = Choice
        fields = ["id", "choice_text", "votes"]

class QuestionSchema(ModelSchema):
    class Meta:
        model = Question
        fields = ["id", "question_text", "pub_date"]

    choices: list[ChoiceSchema]

class AddQuestionSchema(Schema):
    question_text: str
    choices: list[str]


class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ["id", "name", "score"]

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ["id", "name", "turn", "ended"]
    
    players: list[PlayerSchema]

class AddGameSchema(Schema):
    name: str
    players: list[str]

