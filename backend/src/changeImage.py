import cv2                # Image processing and countour detection
import os                 # Path
from tqdm import tqdm     # Progress Bar
import math               # Math operations for calculating contrast and floor function
from PIL import ImageDraw # Library for drawing
from PIL import ImageFont # Library for drawing 
from PIL import Image     # Library for drawing
import numpy as np        # For image conversion
from src.Paragraph import *   # Import Paragraph, BoundingBox, and Page classes
from typing import cast   # To enable accurate and helpful autocomplete during developing :) 
from copy import deepcopy # For deepcopying the bounding boxes for comparison
import base64
from io import BytesIO

# https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
def luminance (r, g, b): 
    array = []
    for a in [r, g, b]:
        a /= 255
        if a <= 0.03928: 
            a /= 12.92
        else: 
            a = math.pow(((a + 0.055) / 1.055), 2.4)
        array.append(a)
    return array[0] * 0.2126 + array[1] * 0.7152 + array[2] * 0.0722

def contrast (rgb1, rgb2): 
    lum1 = luminance(rgb1[0], rgb1[1], rgb1[2])
    lum2 = luminance(rgb2[0], rgb2[1], rgb2[2])
    brightest = max(lum1, lum2)
    darkest = min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def changeImage (page): 
    page = cast(Page, page) 
    img = page.original_image
    img_h = img.shape[0] 
    img_w = img.shape[1]  

    print("Len paragraphs " + str(len(page.paragraphs)))
    for orig_paragraph in page.paragraphs:
        #================ Find the Appropiate Bounding Box to Place next to original Text ================#
        
        # get all potential boxes in all four directions
        left_para = deepcopy(orig_paragraph).apply_offset(offset_x=-orig_paragraph.paragraphBox.w)
        right_para = deepcopy(orig_paragraph).apply_offset(offset_x=orig_paragraph.paragraphBox.w)
        top_para = deepcopy(orig_paragraph).apply_offset(offset_y=-orig_paragraph.paragraphBox.h)
        bottom_para = deepcopy(orig_paragraph).apply_offset(offset_y=orig_paragraph.paragraphBox.h)
        options = [left_para, right_para, top_para, bottom_para]

        # Elimate all boxes that are out of bounds from image
        elim = [] 
        for option in options: 
            if option.out_of_bounds(img_w, img_h):
                elim.append(option)
        for el in elim: 
            options.remove(el)
        
        # If there's no boxes left, then continue 
        if len(options) == 0:
            continue

        # For the rest of the boxes, assign a score to them that has the most average color closer to paragraph dominant color
        lowest_score = -1 
        best_para = None
        for option in options: 
            cropped_img = option.paragraphBox.crop_img(img)
            avg_color = np.average(cropped_img, axis=(0,1)).tolist()
            score = contrast(avg_color, orig_paragraph.dominant_color)
            if score < lowest_score or lowest_score == -1: 
                score = lowest_score
                best_para = option
        bb_best = best_para.paragraphBox
        
        #============== Add Translated Text to Bounding Box ==============#
        # Initialize font and text 
        fontpath = os.path.join(os.getcwd(), "src", "Fonts", "ArialUnicodeMs.ttf")
        font_size = 50
        font = ImageFont.truetype(fontpath, font_size, layout_engine=ImageFont.LAYOUT_RAQM)
        entire_text = best_para.translatedText
        
        # Split text if they overflow
        num_lines = 0 
        punctuation = " !?.,<>(){}"
        start = 0
        i_break = -1
        for i in range(len(entire_text)):
            if i == len(entire_text) - 1: 
                break

            if entire_text[i] in punctuation: 
                i_break = i+1

            font_bb = font.getsize(entire_text[start:i])
            if font_bb[0] > bb_best.w - 100:
                start = i
                entire_text = entire_text[:i_break].rstrip() + "\n" + entire_text[i_break:].lstrip()
                num_lines += 1 

            i+=1

        # If the height of the text is too much, then decrease font
        font_bb = font.getsize(entire_text)
        while font_bb[1] * num_lines > bb_best.h - 50: 
            font_size -= 1
            font = ImageFont.truetype(fontpath, font_size)
            font_bb = font.getsize(entire_text)


        # Fill in background color
        img[bb_best.y : bb_best.y + bb_best.h, bb_best.x : bb_best.x + bb_best.w, 0] = best_para.dominant_color[0]
        img[bb_best.y : bb_best.y + bb_best.h, bb_best.x : bb_best.x + bb_best.w, 1] = best_para.dominant_color[1]
        img[bb_best.y : bb_best.y + bb_best.h, bb_best.x : bb_best.x + bb_best.w, 2] = best_para.dominant_color[2]

        # Find which color best contrasts dominant color
        color = (0,0,0)
        if contrast([255, 255, 255], best_para.dominant_color) > contrast([0,0,0], best_para.dominant_color):
            color = (255, 255, 255)

        # Add text
        img_pil = Image.fromarray(img)
        draw = ImageDraw.Draw(img_pil)
        #****************** IMPORTANT TO CHANGE LANGUAGE TO YOUR DESIRED LANGUAGE *************************#
        draw.text((bb_best.x, bb_best.y), entire_text, fill=color, font=font, language="te")
        img = np.array(img_pil)

    # Resize the Window
    PIL_image = Image.fromarray(np.uint8(img)).convert('RGB')
    img_buffer = BytesIO()
    PIL_image.save(img_buffer, format='JPEG')
    byte_data = img_buffer.getvalue()
    base64_str = base64.b64encode(byte_data)
    return base64_str