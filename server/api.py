import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from filtres import black_and_white_filter, gaussian_blur_filter, sepia_filter
from PIL import Image, ImageFilter, ImageEnhance

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
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from filtres import black_and_white_filter, gaussian_blur_filter, sepia_filter
from PIL import Image, ImageFilter, ImageEnhance

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
        value = int(data.get('value'))  # Convert value to integer
        title = data.get('title')  # Update the global title variable

        print(f'Received value: {value}')
        print(f'Received title: {title}')

        # Load the original image
        original_image_path = os.path.join(UPLOAD_FOLDER, 'original.png')
        original_image = Image.open(original_image_path)

        if title == "Bright":
            # Apply brightness adjustment
            brightness_factor = value / 50.0  # Scale value to range between 0 and 2 (PIL brightness factor)
            enhanced_image = ImageEnhance.Brightness(original_image).enhance(brightness_factor)
            # Save the updated image
            updated_image_path = os.path.join(UPLOAD_FOLDER, 'Bright.png')
            enhanced_image.save(updated_image_path)
            return jsonify({'title': title, 'value': value}), 200
        else:
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
       


        else:
            return jsonify({'error': 'Invalid card ID'}), 400

        filtered_image.save(save_path, format='PNG')
        print('Image filtered and saved:', save_path)
        return jsonify({'filtered_image_path': save_path, 'message': message})
    
    except Exception as e:
        print('Error applying filter:', str(e))
        return jsonify({'error': 'Error applying filter'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
