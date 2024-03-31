from PIL import Image, ImageEnhance,ImageFilter
import cv2
def black_and_white_filter(image):
    # Convert the image to black and white
    bw_image = image.convert('L')
    return bw_image

def gaussian_blur_filter(image):
    blurred_image = image.filter(ImageFilter.GaussianBlur(radius=5))  # Adjust radius as needed
    return blurred_image

def sepia_filter(image):
    """Apply sepia tone filter to the image."""
    enhancer = ImageEnhance.Color(image)
    sepia_image = enhancer.enhance(3)  # Adjust the enhancement factor as needed
    return sepia_image


import cv2

def oil_painting_effect(image):
    """Apply oil painting effect to the image using OpenCV."""
    # Convert image to OpenCV format
    image_cv = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    
    # Apply oil painting effect with default parameters
    oil_painting_image = cv2.xphoto.oilPainting(image_cv, None, 6, 7)
    
    # Convert image back to RGB format
    oil_painting_image_rgb = cv2.cvtColor(oil_painting_image, cv2.COLOR_BGR2RGB)
    
    return oil_painting_image_rgb
