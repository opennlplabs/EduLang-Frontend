from PIL import Image    # Image class for getting dominant color
# For some reason pytesseract adds in \n and \x0c. This will remove it
import re
import pytesseract       # OCR
import cv2               # For drawing circles and rectangles on image
import requests          # For requesting translation to server.
import json              # For extraction of translation from server
# Sensitive Info (ex: auth token) regarding connection to the server
import src.SensitiveInfo
from copy import deepcopy  # For deep copying images
from time import sleep   # For creating downtime between each API request


class BoundingBox:
    x = -1
    y = -1
    w = -1
    h = -1

    def __init__(self, x=-1, y=-1, w=-1, h=-1):
        self.x = round(x)
        self.y = round(y)
        self.w = round(w)
        self.h = round(h)

    def __str__(self):
        return "x: " + str(self.x) + " y: " + str(self.y) + " w: " + str(self.w) + " h: " + str(self.h)

    def apply_offset(self, offset_x=0, offset_y=0):
        self.x += offset_x
        self.y += offset_y

    def crop_img(self, img):
        return img[self.y:self.y+self.h, self.x:self.x+self.w]

    def drawBoundingBox(self, img):
        return cv2.rectangle(img, (self.x, self.y), (self.x + self.w, self.y + self.h), (255, 0, 0), 5)

    def out_of_bounds(self, img_w, img_h, margin=0):
        if (self.x + self.w > img_w + margin) or (self.y + self.h > img_h + margin) or self.x < 0 or self.y < 0:
            return True
        return False


class Paragraph:
    paragraphBox: BoundingBox = None  # BoundingBox of general Paragraph
    paragraphId = -1    # The paragraph unique id in the page
    dominant_color = []  # The rgb values of the dominant color
    translated = ""  # The translated text of the paragraph

    def __init__(self, TranslatedText, origText, bbox):
        self.translatedText = TranslatedText
        self.originalText = origText
        self.paragraphBox = bbox

        # -------------- CHANGE THIS TO YOUR TESSERACT OCR FILE -------------- #
        pytesseract.pytesseract.tesseract_cmd = "C:\\msys64\\mingw32\\bin\\tesseract.exe"
        # -------------------------------------------------------------------- #

    def removeChar(self, text):
        special_char_dict = {
            "’": "'",
            "”": "'",
            "“": "'",
            "—": "-"
        }
        for key in special_char_dict:
            text = text.replace(key, special_char_dict[key])

    def get_dominant_color(self, image):
        # Get dominant color
        cropped = Image.fromarray(self.paragraphBox.crop_img(image))
        cropped.thumbnail((100, 100))
        paletted = cropped.convert('P', palette=Image.ADAPTIVE, colors=16)
        palette = paletted.getpalette()
        color_counts = sorted(paletted.getcolors(), reverse=True)
        palette_index = color_counts[0][1]
        self.dominant_color = palette[palette_index*3:palette_index*3+3]

        return self.dominant_color

    def apply_offset(self, offset_x=0, offset_y=0):
        self.paragraphBox.apply_offset(offset_x, offset_y)
        return self

    def out_of_bounds(self, img_w, img_h):
        return self.paragraphBox.out_of_bounds(img_w, img_h)

    def draw_text_box(self, img):
        img = cv2.putText(img, self.originalText, (self.paragraphBox.x, self.paragraphBox.y),
                          fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0, 0, 255), thickness=2)
        img = cv2.rectangle(img, (self.paragraphBox.x, self.paragraphBox.y), (self.paragraphBox.x +
                            self.paragraphBox.w, self.paragraphBox.y + self.paragraphBox.h), (0, 0, 255), 3)
        return img


class Page:
    paragraphs = []
    original_image = None
    page_num = 0

    def __init__(self, paragraphs, page_num, original_image) -> None:
        self.paragraphs = paragraphs
        self.original_image = original_image
        self.page_num = page_num
        for para in self.paragraphs:
            para.get_dominant_color(original_image)

    def display_page(self, name="Display"):
        img = deepcopy(self.original_image)
        for paragraph in self.paragraphs:
            img = paragraph.draw_text_box(img)

        cv2.namedWindow(name, cv2.WINDOW_NORMAL)
        cv2.resizeWindow(name, 1000, 800)
        cv2.imshow(name, img)
        cv2.waitKey(0)
