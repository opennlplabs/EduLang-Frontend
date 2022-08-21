from lib2to3.pytree import convert
import sys
import pdf2image
import os 
import numpy as np
from tqdm import tqdm
from PIL import Image
import base64
from io import BytesIO
import json

def convertPDFToImage (file): 
    pages = pdf2image.convert_from_path(file)
    array = {}
    for index, page in enumerate(pages):
        arr = np.array(page)
        PIL_image = Image.fromarray(np.uint8(arr)).convert('RGB')
        img_buffer = BytesIO()
        PIL_image.save(img_buffer, format='JPEG')
        byte_data = img_buffer.getvalue()
        base64_str = base64.b64encode(byte_data).decode("utf-8")

        array["page"+str(index+1)] = base64_str

    if os.path.exists(file):
        os.remove(file)
    new_file = file[:-4] + ".json"
    with open(new_file, "w") as f:
        print(json.dumps(array), file=f)


def findDirectory (directory, array=[]):
    for file in os.listdir(directory):
        abs_file = os.path.join(directory, file)
        if file.endswith(".pdf"):
            array.append(abs_file)
        if os.path.isdir(abs_file):
            array = findDirectory(abs_file, array)
    return array

argument_count = len(sys.argv) - 1 
if argument_count != 1: 
    print("Need one argument: directory")
    exit(-1)
input_pdf_path = os.path.join(os.getcwd(), sys.argv[1])
array = findDirectory(input_pdf_path)
if len(array) > 0:
    print(f"Found {len(array)} path(s)")
    for path in tqdm(array, desc="Converting to Base 64"):
        convertPDFToImage(path)
else:
    print(f"No PDFs found in desired directory.")