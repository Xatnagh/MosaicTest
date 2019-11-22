import base64
from PIL import Image
from io import BytesIO
import uuid
import re
def blob_to_image_converter(image):
    image_data = re.sub('data:image/.+;base64,', '', image)
    
    