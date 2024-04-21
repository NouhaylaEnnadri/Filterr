from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw

def black_and_white_filter(image):
    bw_image = image.convert('L')
    return bw_image

def gaussian_blur_filter(image):
    blurred_image = image.filter(ImageFilter.GaussianBlur(radius=5))
    return blurred_image

def sepia_filter(image):
    enhancer = ImageEnhance.Color(image)
    sepia_image = enhancer.enhance(3)
    return sepia_image

def sharpen_filter(image):
    factor = 4
    for _ in range(factor):
        image = image.filter(ImageFilter.SHARPEN)
    return image

def saturation_filter(image, factor=-3.0):
    enhancer = ImageEnhance.Color(image)
    saturated_image = enhancer.enhance(factor)
    return saturated_image

def contrast_filter(image, factor=3.0): #ok
    enhancer = ImageEnhance.Contrast(image)
    contrasted_image = enhancer.enhance(factor)
    return contrasted_image

def vignette_filter(image, factor=0.1): #ok
    width, height = image.size
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, width, height), fill=255, outline=0)
    blurred_mask = mask.filter(ImageFilter.GaussianBlur(radius=width * factor))
    vignette_image = Image.composite(image, Image.new("RGB", (width, height), "white"), blurred_mask)
    return vignette_image

def warmth_filter(image, factor=4.0): #ok
    enhancer = ImageEnhance.Color(image)
    warmed_image = enhancer.enhance(1 + factor)
    return warmed_image


def lens_flare_filter(image, factor=-0.5):
    flare_image = image.filter(ImageFilter.GaussianBlur(radius=50))
    flare_image = ImageEnhance.Brightness(flare_image).enhance(2)
    flare_image = ImageEnhance.Contrast(flare_image).enhance(1.5)
    lens_flare_image = Image.blend(image, flare_image, factor)
    return lens_flare_image

def watercolor_filter(image, blur_radius=0, saturation_factor=0, contrast_factor=5):
    # Apply the contour filter to enhance edges
    watercolor_image = image.filter(ImageFilter.CONTOUR)
    
    # Apply Gaussian blur to soften the effect
    watercolor_image = watercolor_image.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    
    # Enhance saturation
    enhancer_saturation = ImageEnhance.Color(watercolor_image)
    watercolor_image = enhancer_saturation.enhance(saturation_factor)
    
    # Enhance contrast
    enhancer_contrast = ImageEnhance.Contrast(watercolor_image)
    watercolor_image = enhancer_contrast.enhance(contrast_factor)
    
    return watercolor_image

def oil_painting_filter(image, radius=3, levels=1):
    # Apply the oil painting effect
    oil_painting_image = image.filter(ImageFilter.EDGE_ENHANCE_MORE)
    oil_painting_image = oil_painting_image.filter(ImageFilter.CONTOUR)
    oil_painting_image = oil_painting_image.filter(ImageFilter.BLUR)
    oil_painting_image = oil_painting_image.filter(ImageFilter.EDGE_ENHANCE_MORE)
    
    # Apply a posterize effect to reduce colors if needed
    if levels > 1:
        oil_painting_image = ImageOps.posterize(oil_painting_image, levels)
    
    return oil_painting_image
