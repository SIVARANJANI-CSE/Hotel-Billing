
import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path
import base64

st.set_page_config(
    page_title="Pandiyan Mess",
    layout="wide"
)

BASE = Path(__file__).parent

# Read HTML, CSS and JavaScript
html = (BASE / "index.html").read_text(encoding="utf-8")
css = (BASE / "style.css").read_text(encoding="utf-8")
js = (BASE / "script.js").read_text(encoding="utf-8")

# Embed food images into JavaScript
image_folder = BASE / "images"

if image_folder.exists():
    for img in image_folder.iterdir():
        if img.is_file():
            ext = img.suffix.lower()
            mime = {
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".png": "image/png",
                ".webp": "image/webp"
            }.get(ext)

            if mime:
                encoded = base64.b64encode(
                    img.read_bytes()
                ).decode("utf-8")

                image_path = "images/" + img.name
                data_url = f"data:{mime};base64,{encoded}"

                js = js.replace(
                    image_path,
                    data_url
                )

# Remove external CSS and JS references
html = html.replace(
    '<link rel="stylesheet" href="style.css">',
    ""
)
html = html.replace(
    '<script src="script.js"></script>',
    ""
)

# Add CSS and JavaScript directly
final_html = html.replace(
    "</head>",
    f"<style>{css}</style></head>"
)

final_html = final_html.replace(
    "</body>",
    f"<script>{js}</script></body>"
)

components.html(
    final_html,
    height=950,
    scrolling=True
)
