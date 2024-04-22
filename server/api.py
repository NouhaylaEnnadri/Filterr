import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw
from filtres import (black_and_white_filter, oil_painting_filter, watercolor_filter, contrast_filter,
                      gaussian_blur_filter, lens_flare_filter, saturation_filter,
                      sepia_filter, sharpen_filter, vignette_filter, warmth_filter)

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/update-degree', methods=['POST'])
def update_degree():
    global degree
    try:
        data = request.get_json()
        new_degree = int(data.get('degree'))  # Convert degree to integer
        degree = new_degree  # Update the global degree variable

        print(f'Received degree: {degree}')
        
        # Rotate the existing image based on the updated degree
        rotated_image_path = rotate_image(os.path.join(UPLOAD_FOLDER, 'original.png'), degree)
        
        return jsonify({'image_path': rotated_image_path, 'message': 'Image rotated successfully', 'degree': degree}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rotate the image by the specified degree
def rotate_image(image_path, degree):
    image = Image.open(image_path)
    rotated_image = image.rotate(degree, expand=True)
    rotated_image_path = os.path.join(UPLOAD_FOLDER, f'rotated_{degree}.png')
    rotated_image.save(rotated_image_path)
    return rotated_image_path

@app.route('/api/update-value', methods=['POST'])
def update_value():
    global title  # Access the global title variable
    try:
        data = request.get_json()
        value = float(data.get('value'))  # Convert value to float
        title = data.get('title')  # Update the global title variable

        print(f'Received value: {value}')
        print(f'Received title: {title}')

        # Load the original image
        original_image_path = os.path.join(UPLOAD_FOLDER, 'original.png')
        original_image = Image.open(original_image_path)

        if title == "Bright":
            # Apply brightness adjustment
            brightness_factor = value  # Use the value directly
            enhanced_image = ImageEnhance.Brightness(original_image).enhance(brightness_factor)
            # Save the updated image with degree in the filename
            updated_image_path = os.path.join(UPLOAD_FOLDER, f'Bright_{int(value)}.png')
            enhanced_image.save(updated_image_path)
        elif title == "Hue":
            hue_factor = -5 + (value / 10) * 40  # Adjust hue smoothly from blue to green to red
            # Apply hue adjustment
            enhanced_image = ImageEnhance.Color(original_image).enhance(hue_factor)
            # Save the updated image with degree in the filename
            updated_image_path = os.path.join(UPLOAD_FOLDER, f'Hue_{int(value)}.png')
            enhanced_image.save(updated_image_path)
        else:
            return jsonify({'error': 'Invalid title'}), 400

        return jsonify({'title': title, 'value': value}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/process-image', methods=['POST'])
def process_image_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    save_path = os.path.join(UPLOAD_FOLDER, 'original.png')
    image_file.save(save_path)
    return jsonify({'image_path': save_path})

@app.route('/api/card', methods=['POST'])
def receive_card_id():
    try:
        data = request.get_json()
        card_id = data.get('cardId')
        print('Received card ID:', card_id)

        image_path = os.path.join(UPLOAD_FOLDER, 'original.png')
        image = Image.open(image_path)

        filtered_image = None
        save_path = None
        message = None

        if card_id == 2:
            filtered_image = black_and_white_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'bw.png')
            message = 'Black and white filter applied.'
        elif card_id == 3:
            filtered_image = gaussian_blur_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'gaussian.png')
            message = 'Gaussian blur filter applied.'
        elif card_id == 4:
            filtered_image = sepia_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'sepia.png')
            message = 'Sepia filter applied.'
        elif card_id == 5:
            filtered_image = sharpen_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'sharp.png')
            message = 'Sharpen filter applied.'
        elif card_id == 6:
            filtered_image = saturation_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'saturation_filter.png')
            message = 'Edge enhancement filter applied.'
        elif card_id == 7:
            filtered_image = contrast_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'contrast_filter.png')
            message = 'Contour filter applied.'
        elif card_id == 8:
            filtered_image = vignette_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'vignette_filter.png')
            message = 'Motion blur filter applied.'
        elif card_id == 9:
            filtered_image = warmth_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'warmth_filter.png')
            message = 'Invert colors filter applied.'
        elif card_id == 10:
            filtered_image = watercolor_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'watercolor_filter.png')
            message = 'Invert colors filter applied.'
        elif card_id == 11:
            filtered_image = lens_flare_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'lens_flare_filter.png')
            message = 'Invert colors filter applied.'
        elif card_id == 12:
            filtered_image = oil_painting_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'oil_painting_filter.png')
            message = 'Invert colors filter applied.'
        else:
            return jsonify({'error': 'Invalid card ID'}), 400

        if filtered_image:
            filtered_image.save(save_path, format='PNG')
            print('Image filtered and saved:', save_path)
            return jsonify({'filtered_image_path': save_path, 'message': message})

        return jsonify({'error': 'Error applying filter'}), 500

    except Exception as e:
        print('Error applying filter:', str(e))
        return jsonify({'error': 'Error applying filter'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)