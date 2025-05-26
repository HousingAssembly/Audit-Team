import cv2
import pytesseract
from matplotlib import pyplot as plt

image_path = "TestingSample.jpeg"
image = cv2.imread(image_path)
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
print("Grayscale Image:")

plt.figure(figsize=(8, 4))
plt.imshow(gray, cmap='gray')
plt.title("Grayscale Image")
plt.axis("off")
plt.show()

plt.figure(figsize=(10, 6))
plt.imshow(image_rgb)
plt.title("Original Image")
plt.axis("off")
plt.show()

extracted_text = pytesseract.image_to_string(image_rgb)
print(" Extracted Text:\n")
print(extracted_text)

<<<<<<< HEAD
=======

# If you want to use it, use
#python3 handwriting_ocr.py
# And then input your testing file
#testing.png 
>>>>>>> fff4aa7be2ac11b7a0f94a8198f83af9b67044ab
