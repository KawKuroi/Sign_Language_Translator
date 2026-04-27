import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.main import app
from app.model import inference


@pytest_asyncio.fixture(scope="session", autouse=True)
async def load_model():
    """Load the Keras model and MediaPipe detector once for the entire test session."""
    inference.load_resources()


@pytest_asyncio.fixture(scope="session")
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac
