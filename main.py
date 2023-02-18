# # https://convertingcolors.com/rgb-color-80_51_16.html

from bs4 import BeautifulSoup
from requests import get

# def 

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the simulator!"
    }


@app.get("/ryb/{red}/{yellow}/{blue}")
async def get_ryb_value(red: str, yellow: str, blue: str):
    fetched_html = get(f"https://convertingcolors.com/ryb-color-{red}_{yellow}_{blue}.html").text
    soup = BeautifulSoup(fetched_html, "html.parser")
    ryb_value = soup.find("a", id="copyRybtext")
    return ryb_value.get_text()
