import json
from flask import Flask, request, send_file
import cv2
import numpy as np
import base64
import os
from termcolor import colored             # For color on terminal
import fpdf
from src.Paragraph import BoundingBox, Paragraph, Page
# Used for connecting images to a single pd
# Change the image from text detection for 3rd step
from src.changeImage import changeImage
from src.textDetection import processImage, getbbox  # Text detection for 2nd step
from tqdm import tqdm   # Progress bar!
import pdf2image        # Thankfully, this handles most of step 1
import sys              # getting the arguments
from concurrent.futures import process
import warnings         # Ignore warnings from EasyOCR
from io import BytesIO
from PIL import Image
warnings.filterwarnings("ignore")

app = Flask(__name__)


@app.route('/translate', methods=["GET", "POST"])
def translateBase64():
    print("Received Translation Message")
    base64Image = request.form['base64Image']
    languageId = request.form['languageId']
    page = processImage(base64Image, languageId)
    base64Out = changeImage(page)

    return {"response": base64Out.decode("utf-8")}


@app.route('/getBoundingBoxImage', methods=["GET", "POST"])
def getBoundingBoxImage():
    print("Received Bounding Box request")
    base64Image = request.form['base64Image']
    base64Out, boxes = getbbox(base64Image)
    return {"response": base64Out.decode("utf-8"), "box": json.dumps(boxes)}


@app.route("/ChangeImage", methods=["GET", "POST"])
def changeImageApp():
    print("Received change image request")
    base64Image = request.form['base64Image']
    boxes = json.loads(request.form['boxes'])
    index = json.loads(request.form['index'])
    responses = json.loads(request.form['responses'])

    img = Image.open(BytesIO(base64.b64decode(base64Image)))
    img = np.swapaxes(np.array(img), 0, 1)
    img = np.flip(img, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    paragraphs = []
    for i in range(len(responses)):
        bbox = BoundingBox(*boxes[i])
        paragraphs.append(Paragraph(responses[i], "", bbox))
    page = Page(paragraphs, index+1, img)
    base64Out = changeImage(page)

    return {"response": base64Out.decode("utf-8")}


@app.route("/PDFtoImage", methods=["GET", "POST"])
def PDFtoImage():
    print("Received PDF to image request")
    base64PDF = request.form['PDFBase64'][28:]

    images = []
    pages = pdf2image.convert_from_bytes(base64.b64decode(base64PDF))
    for page in pages:
        buffered = BytesIO()
        page.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        print("len img", len(img_str))
        images.append({"base64": img_str})

    return {"response": json.dumps(images)}


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
