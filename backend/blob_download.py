import base64
from datetime import timezone

from azure.storage.blob import BlobServiceClient
import os
from io import BytesIO
from PIL import Image

def convert_to_base64(image_data):
    return base64.b64encode(image_data).decode('utf-8')

def get_image_data(username=None, ui_mode=False):
    """Download image from Azure Blob Storage.
    
    Args:
        ui_mode (bool): Whether to return image for UI display
        username (str): Username to filter images
        
    Returns:
        bytes: Raw image data if ui_mode is False
        str: Base64 encoded image if ui_mode is True
    """
    connection_string = 'DefaultEndpointsProtocol=https;AccountName=oishik;AccountKey=aleUFtKbyShYewMZZZ1vKx+iQK9tmfaqy3pkGdsB0Sv5a+MeiePSpii8s6JpOyWi1Yh7uXiNxW+s+AStq044EQ==;EndpointSuffix=core.windows.net'
    container_name = "tvi"
    
    # Create the BlobServiceClient
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    container_client = blob_service_client.get_container_client(container_name)
    
    # List all blobs and get the most recent one
    if username:
        blobs = container_client.list_blobs(name_starts_with=f"raspberry_pi_uploads/{username}/")
    else:
        blobs = container_client.list_blobs()
    
    # Get the two latest blobs
    sorted_blobs = sorted(blobs, key=lambda x: x.last_modified, reverse=True)[:2]
    latest_blob, second_latest_blob = sorted_blobs[0], sorted_blobs[1]

    # Download both blobs
    latest_blob_client = container_client.get_blob_client(latest_blob.name)
    second_latest_blob_client = container_client.get_blob_client(second_latest_blob.name)

    latest_image_data = latest_blob_client.download_blob().readall()
    second_latest_image_data = second_latest_blob_client.download_blob().readall()
    print("Blobs downloaded")
    return [
            {
                "image": convert_to_base64(latest_image_data),
                "timestamp": latest_blob.last_modified.astimezone(timezone.utc).isoformat(),
                "name": latest_blob.name
            },
            {
                "image": convert_to_base64(second_latest_image_data),
                "timestamp": second_latest_blob.last_modified.astimezone(timezone.utc).isoformat(),
                "name": second_latest_blob.name
            }
        ]
            
