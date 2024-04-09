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

