import cv2
import pytesseract

image_path = "houseing_audit_backend/ORC/TestingSample.jpeg"

image = cv2.imread(image_path)

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

thresh = cv2.adaptiveThreshold(gray, 255, 
                               cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                               cv2.THRESH_BINARY, 11, 2)

text = pytesseract.image_to_string(thresh, lang='eng')

print("result：\n", text)

with open("houseing_audit_backend/ORC/output.txt", "w") as f:
    f.write(text)
# python + tesseract + OpenCV