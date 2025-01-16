# from segment import segment_scalp
import matplotlib.pyplot as plt
import cv2
import numpy as np
from pathlib import Path
from segment_anything import SamPredictor, sam_model_registry

input_path = Path("..") / "hair_pictures" / "2.jpeg"


# Read the image
image = cv2.imread(str(input_path))

sam = sam_model_registry["default"](checkpoint="sam_vit_h_4b8939.pth")
sam.predictor = SamPredictor(sam)
# Set image in predictor
sam.predictor.set_image(image)

# Get automatic masks
masks = sam.predictor.generate()

# # Create an initial mask
# mask = np.zeros(image.shape[:2], np.uint8)

# # Define a rectangle for GrabCut (x, y, width, height)
# rect = (50, 50, 450, 290)

# # Apply GrabCut
# bgd_model = np.zeros((1, 65), np.float64)
# fgd_model = np.zeros((1, 65), np.float64)
# cv2.grabCut(image, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)

# # Modify the mask to extract the head and scalp area
# mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

# # Get the final segmented image
# segmented = image * mask2[:, :, np.newaxis]

# # Replace the cv2.imshow code with matplotlib
# plt.figure(figsize=(10, 5))

# # Display original image
# plt.subplot(1, 2, 1)
# plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))  # Convert BGR to RGB for correct colors
# plt.title('Original')
# plt.axis('off')

# # Display segmented image
# plt.subplot(1, 2, 2)
# plt.imshow(cv2.cvtColor(segmented, cv2.COLOR_BGR2RGB))  # Convert BGR to RGB for correct colors
# plt.title('Segmented')
# plt.axis('off')

# plt.tight_layout()
# plt.show()