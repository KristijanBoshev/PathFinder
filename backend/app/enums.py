from enum import Enum


class TopicType(str, Enum):
    """Enum for topic types."""

    HISTORY = "history"
    GEOGRAPHY = "geography"
    TECHNOLOGY = "technology"
    GENERAL = "general"
    ART = "art"
    MUSIC = "music"
    LITERATURE = "literature"
    SOCIOLOGY = "sociology"
    PHILOSOPHY = "philosophy"
    PHYSICS = "physics"
    CHEMISTRY = "chemistry"
    BIOLOGY = "biology"
    MATHEMATICS = "mathematics"
