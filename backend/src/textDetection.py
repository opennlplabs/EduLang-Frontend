from concurrent.futures import process
from distutils.command.clean import clean
from email.mime import base
from fnmatch import translate
from sys import flags
from typing import overload
from urllib import response
import pytesseract              # For Text Extraction  
import cv2                      # Image processing and countour detection
import os                       # Path
from tqdm import tqdm           # Progress Bar
import numpy as np              # average color calculations
import pickle                   # For caching detection (brings it MUCH easier to changeImage.py)
import base64                   # Our image is in base64, this is used for decoding
from io import BytesIO          # Our image is in base64, this is used for decoding

from termcolor import colored   # For color on terminal (used to send out warnings)
import craft_text_detector      # For the detection of text :) 

import re                # For some reason pytesseract adds in \n and \x0c. This will remove it
from src.Paragraph import *  # Paragraph class and Bounding Box class
import src.SensitiveInfo as SensitiveInfo

def removeChar(text): 
    special_char_dict = {
        "’": "'",
        "|": "I",
        "‘": "'",
        "”": "'",
        "“": "'",
        "—": "-",
        "\"": ""
    }
    for key in special_char_dict:
        text = text.replace(key, special_char_dict[key])

    return text 

def translateText (overall_text, target_lang, delay=1, ): 
    # How to convert target_language (ex: turkish) to language token?
    # What is the auth token?
    auth_token = SensitiveInfo.auth_token 

    url = "https://platform.neuralspace.ai/api/translation/v1/translate"
    headers = {}
    headers["Accept"] = "application/json, text/plain, */*"
    headers["authorization"] = auth_token
    headers["Content-Type"] = "application/json;charset=UTF-8"

    # send request
    data = f""" 
    {{
        "text": "{removeChar(overall_text)}",
        "sourceLanguage": "en",
        "targetLanguage": "{target_lang.lower()}"
    }}
    """
    sleep(delay) # If we send too much requests at once, then the server won't respond to the overflow of requests
    resp = requests.post(url, headers=headers, data=data)
    try:
        response_dict = json.loads(resp.text)
        return response_dict["data"]["translatedText"]
    except Exception:
        print(colored("\nError sending response to NeuralSpace API. Deleting Paragraph! \nResponse: ", "red"), end="")
        print(resp)
        print(colored("Text sent: ", "red"), end="")
        print(removeChar(overall_text))
        return None

def constructPage (result, page_num, target_lang, image):
    # Construct black background
    processedImg = np.zeros((image.shape[0], image.shape[1]))
    
    # Add white rectangle in background
    for rect in result: 
        pointOne = (round(rect[0][0]), round(rect[0][1]))
        pointTwo = (round(rect[2][0]), round(rect[2][1]))
        processedImg = cv2.rectangle(processedImg, pointOne, pointTwo, (255, 255, 255), -1)

    # Dilate and find contours to get general paragraphs
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (10,10))
    processedImg = cv2.dilate(processedImg, kernel, iterations=5)
    _, processedImg = cv2.threshold(processedImg, 127, 255, 0)
    
    cnts = cv2.findContours(cv2.convertScaleAbs(processedImg), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    
    # Get bounding boxes
    paragraphs = []
    bboxes = [] 
    for i, c in enumerate(cnts): 
        x,y,w,h = cv2.boundingRect(c)
        bbox = BoundingBox(x, y, w, h)
        bboxes.append(bbox)

        # Get cropped image
        cropped = bbox.crop_img(image)

        # First, extract text using Google's Tesseract OCR engine
        origText = re.sub(r'[\x00-\x1f]+', '',  pytesseract.image_to_string(cropped))

        # Continue text if there is nothing there
        if origText == None or origText.strip() == "": continue

        # Then translate text
        print(f"Start Translating contour #{i+1}")
        TranslatedText = translateText(origText, target_lang)
        print(f"Done Translating contour #{i+1} with translated text: {TranslatedText}")
        
        # Continue text if there is nothing there
        if TranslatedText == None or TranslatedText.strip() == "": continue

        # Construct paragraph
        para = Paragraph(TranslatedText, origText, bbox)
        paragraphs.append(para)

    return Page(paragraphs, page_num, image)

def processImage (base64Image, target_language): 
    # Generate index, full_path, and iamge from base64    
    im_bytes = base64.b64decode(base64Image)   # im_bytes is a binary image
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)  # im_arr is one-dim Numpy array
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)   # img is now PIL Image object
    cwd = os.getcwd()
    path = os.path.join(cwd, "src", "PNGImgs")
    index = len([name for name in os.listdir(path) if os.path.isfile(name)])
    full_path = os.path.join(path, "page"+str(index+1)+".jpg")
    cv2.imwrite(full_path, img)

    # This is the actual processtext array that stores an array of paragraphs 
    craft = craft_text_detector.Craft(cuda=True)

    # Craft Text Detector 
    result = craft.detect_text(full_path)["boxes"]

    # Construct page and append
    page = constructPage(result, index, target_language, img)
    
    craft_text_detector.empty_cuda_cache()
    
    # cache pages
    with open(os.path.join(os.getcwd(), "src", "PagesCache", "Page.pkl"), "wb") as f: # "wb" because we want to write in binary mode
        pickle.dump(page, f)
        
    return page