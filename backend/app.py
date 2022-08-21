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
from flask import Flask, request, send_file

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
        pdf.add_page()
        pdf.image(image,0,0,300,225) #the 300 and 250 is the size for the image to be blown up to
    pdf.output(output_file, "F")

app = Flask(__name__)

@app.route('/translate', methods=["GET", "POST"])
def translateBase64 ():    
    print("Received Translation Message")
    base64Image = request.form['base64Image']
    languageId = request.form['languageId']
    page = processImage(base64Image, languageId)
    base64Out = changeImage(page)
    
    return {"response": base64Out.decode("utf-8")}

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)