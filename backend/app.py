from concurrent.futures import process
import warnings         # Ignore warnings from EasyOCR
warnings.filterwarnings("ignore")   
import sys              # getting the arguments
import pdf2image        # Thankfully, this handles most of step 1
from tqdm import tqdm   # Progress bar!
from src.textDetection import processImage # Text detection for 2nd step
from src.changeImage import changeImage   # Change the image from text detection for 3rd step
import fpdf                               # Used for connecting images to a single pd
from termcolor import colored             # For color on terminal
import os
import base64
import numpy as np
import cv2
import json 

def img_to_pdf (input_dir, output_file): 
    pdf = fpdf.FPDF('L', 'mm', 'A4')
    
    list_dir = os.listdir(input_dir)
    sorted_arr = {}
    for path in list_dir:
        full_path = os.path.join(input_dir, path)
        index = int(str(path).split(".")[0][4:])
        sorted_arr[index] = full_path 

    # imagelist is the list with all image filenames
    for key in sorted(sorted_arr.keys()):
        image = sorted_arr[key]
        if not image.endswith(".jpg"):
            continue
        pdf.add_page()
        pdf.image(image,0,0,300,225) #the 300 and 250 is the size for the image to be blown up to
    pdf.output(output_file, "F")

def convertPDFToImage (path): 
    for file in os.listdir(os.path.join(os.getcwd(), "src", "PNGImgs")):
        if file.endswith(".jpg"):
            print(colored("Skipping Image Extraction! Using images in src/PNGImgs directory.", "red"))
            return
    print("Converting pdf to images...", end="")
    pages = pdf2image.convert_from_path(path)
    for index, page in enumerate(pages):
        cwd = os.getcwd()
        path = os.path.join(cwd, "src", "PNGImgs", "page"+str(index+1)+".jpg")
        page.save(path, "JPEG")
    print("Done")

from flask import Flask, request, send_file

app = Flask(__name__)

@app.route('/translate', methods=["GET", "POST"])
def translateBase64 ():
    base64Image = request.form['base64Image']
    languageId = request.form['languageId']
    page = processImage(base64Image, languageId)
    base64Out = changeImage(page)
    
    return {"response": base64Out.decode("utf-8")}

@app.route('/createPDF', methods=["GET", "POST"])
def createPDF (): 
    print("Received Create PDF response")
    path = os.path.join(os.getcwd(), "src", "PNGImgsOutput")
    base64Images = json.loads(request.form["images"])
    
    pdf = fpdf.FPDF('L', 'mm', 'A4')
    print("base 64 images len: ", len(base64Images))
    for index, image in enumerate(base64Images):
        im_bytes = base64.b64decode(image)   # im_bytes is a binary image
        im_arr = np.frombuffer(im_bytes, dtype=np.uint8)  # im_arr is one-dim Numpy array
        img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)   # img is now PIL Image object
        full_path = os.path.join(path, "page"+str(index+1)+".jpg")
        cv2.imwrite(full_path, img)

        pdf.add_page()
        pdf.image(full_path, 0, 0, 300, 225)
    pdf.output("./output/Output.pdf", "F")
    return {"success": True}

@app.route('/output')
def show_static_pdf():
    with open('./output/Output.pdf', 'wb') as static_file:
        return send_file(static_file, download_name='output.pdf')

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)