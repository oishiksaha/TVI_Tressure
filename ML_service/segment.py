import cv2
import numpy as np
from pathlib import Path
import matplotlib.pyplot as plt
import os

# Print current working directory
print(f"Current working directory: {os.getcwd()}")

# Try different path approaches
# 1. From project root (if hair_pictures is at project root)
input_path = Path.cwd().parent / "hair_pictures" / "test" / "test1.jpg"   # Go up to project root


image = cv2.imread(str(input_path))

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply GaussianBlur to smooth the image (optional, reduces noise)
blurred = cv2.GaussianBlur(gray, (5, 5), 0)

# Use Canny edge detection to find edges (this will highlight the black boundary)
edges = cv2.Canny(blurred, threshold1=30, threshold2=100)

# Find contours from the edges
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter contours: find the largest one (the head region with the headset)
max_contour = max(contours, key=cv2.contourArea)

# Create a mask for the head (scalp + hair)
mask = np.zeros_like(gray)
cv2.drawContours(mask, [max_contour], -1, (255), thickness=cv2.FILLED)

# Apply the mask to the original image to extract the head region
segmented_image = cv2.bitwise_and(image, image, mask=mask)

# Optionally, refine the edges by applying morphological transformations
kernel = np.ones((10, 10), np.uint8)  # Larger kernel for bigger areas
mask_refined = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

# Refine the segmented image
segmented_image_refined = cv2.bitwise_and(image, image, mask=mask_refined)

# Replace all cv2.imshow() calls with matplotlib
plt.figure(figsize=(15, 5))

# Original Image
plt.subplot(131)
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))  # Convert BGR to RGB for correct colors
plt.title('Original Image')
plt.axis('off')

# Segmented Image
plt.subplot(132)
plt.imshow(cv2.cvtColor(segmented_image, cv2.COLOR_BGR2RGB))
plt.title('Segmented Image')
plt.axis('off')

# Refined Segmentation
plt.subplot(133)
plt.imshow(cv2.cvtColor(segmented_image_refined, cv2.COLOR_BGR2RGB))
plt.title('Refined Segmentation')
plt.axis('off')

plt.tight_layout()
plt.show()
