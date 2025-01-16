"""FastAPI controller for image capture and segmentation operations."""

import time
import requests
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
import numpy as np
from PIL import Image
from io import BytesIO

from blob_download import get_image_data

# Initialize FastAPI
app = FastAPI()

# The Raspberry Pi IP address or hostname
raspberry_pi_url = "https://c6bd-65-112-10-84.ngrok-free.app/"
raspberry_pi_capture_url = f"{raspberry_pi_url}/capture_image"

@app.get("/capture_image/{username}")
async def capture_image(username: str):
    """Trigger image capture on Raspberry Pi and retrieve the image data."""
    if not username:
        return {"message": "Username is required", "status_code": 400}
        
    try:
        rasp_capture_url_user = raspberry_pi_capture_url + '?username=' + username
        # response = requests.post(rasp_capture_url_user, timeout=120)
        if 200 == 200:
            time.sleep(5)  # Wait for image upload
            img_data = get_image_data(ui_mode=False, username=username)
            print("HI")
            if img_data is None:
                return {"message": "Failed to retrieve image", "status_code": 500}
            return {"message": "Success", "status_code": 200, "data": img_data}
        else:
            return {"message": "Failed to trigger Raspberry Pi", "status_code": response.status_code}
            
    except Exception as e:
        return {"message": f"Error: {str(e)}", "status_code": 500}

# @app.post("/segment")
# async def segment_image(file: UploadFile = File(...)):
#     """Process uploaded image and return segmented result."""
#     try:
#         # Read and preprocess image
#         img_bytes = await file.read()
#         img = Image.open(BytesIO(img_bytes))
#         img = img.resize((256, 256))
        
#         # Convert to numpy array
#         img_array = np.array(img)
        
#         # TODO: Implement segmentation model
#         # For now, return the original image
#         buffered = BytesIO()
#         img.save(buffered, format="JPEG")
#         return Response(content=buffered.getvalue(), media_type="image/jpeg")
        
#     except Exception as e:
#         return {"message": f"Error: {str(e)}", "status_code": 500}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

