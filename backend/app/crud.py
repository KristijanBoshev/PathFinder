import uuid
from collections.abc import Sequence
from typing import Any

from openai import OpenAI
from sqlalchemy.sql.expression import func
from sqlmodel import Session, select

from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.enums import TopicType
from app.models import (
    Item,
    ItemCreate,
    QuestionsAndAnswers,
    User,
    UserCreate,
    UserUpdate,
)


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_item(*, session: Session, item_in: ItemCreate, owner_id: uuid.UUID) -> Item:
    db_item = Item.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def fetch_questions(*, session: Session) -> dict[str, Sequence[Item]]:
    questions_by_topic = {}
    for topic in TopicType:
        statement = (
            select(Item).where(Item.topic == topic).order_by(func.random()).limit(5)
        )
        questions_by_topic[topic.value] = session.exec(statement).all()

    return questions_by_topic


def openai_response(*, payload: QuestionsAndAnswers) -> str | None:
    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    prompt = "You are a quiz moderator with a fun and engaging tone. Your task is to review the following Q&A pairs and evaluate their accuracy. For each Q&A pair, please check the truthfulness of the answer based on the provided question and topic. \
        After reviewing all pairs, you will need to provide feedback and calculate the overall score for each topic.Here are the Q&A pairs:"

    for pair in payload.payload:
        prompt += f"Topic: {pair.topic}\nQ: {pair.question}\nA: {pair.answer}\n\n"

    prompt += """
    Once you've reviewed all the pairs, please:
    1. Identify the topic(s) with the most truthful answers. Return the name of the topic(s), excluding the enum. If there are no topics with truthful answers, return "None".
    2. Provide the percentage of truthful answers for the identified topic(s). Format the result as "X% truthful answers".
    3. Provide the scores for all topics. For each topic, show the percentage of truthful answers (e.g., "AI: 80% truthful answers").
    4. Based on your evaluation of the Q&A pairs, suggest the most suitable career path for the user. Choose a single word career path, such as "doctor", "engineer", "artist", etc.
    5. Finally, provide a fun congratulatory message with a quiz-like tone, e.g., "Congratulations! Your score was X%. Based on your answers, a career in [chosen career path] seems to be a perfect fit for you!"
    """
    completion = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    model_response = completion.choices[0].message.content

    return model_response


