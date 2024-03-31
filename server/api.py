import os
from flask import Flask, request, jsonify
from filtres import black_and_white_filter, gaussian_blur_filter, oil_painting_effect, sepia_filter
from PIL import Image, ImageFilter,ImageEnhance

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/api/update-value', methods=['POST'])
def update_value():
    try:
        data = request.get_json()
        value = int(data.get('value'))  # Convert value to integer
        title = (data.get('title'))  # Convert value to integer


        print(f'Received value: {value}')
        print(f'Received value: {title}')

        # Load the original image
        original_image_path = os.path.join(UPLOAD_FOLDER, 'original.png')
        original_image = Image.open(original_image_path)

        if title == "Brightness":
            # Apply brightness adjustment
            brightness_factor = value / 50.0  # Scale value to range between 0 and 2 (PIL brightness factor)
            enhanced_image = ImageEnhance.Brightness(original_image).enhance(brightness_factor)
            # Save the updated image
            updated_image_path = os.path.join(UPLOAD_FOLDER, 'Bright.png')
            enhanced_image.save(updated_image_path)
        else:
            return jsonify({'error': f'Invalid adjustment title: {title}'}), 200



        return jsonify({'message': f'Value updated successfully', 'updated_image_path': updated_image_path})

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

        if card_id == 1:
            filtered_image = black_and_white_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'bw.png')
            message = 'Black and white filter applied.'
        elif card_id == 2:
            filtered_image = gaussian_blur_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'gaussian.png')
            message = 'Gaussian blur filter applied.'
        elif card_id == 3:
            filtered_image = sepia_filter(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'sepia.png')
            message = 'Sepia filter applied.'
        elif card_id == 4:
            filtered_image = oil_painting_effect(image)
            save_path = os.path.join(UPLOAD_FOLDER, 'oilPainting.png')
            message = 'Oil painting effect applied.'


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
