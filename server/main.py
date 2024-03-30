import os
from flask import Flask, request, jsonify
from PIL import Image, ImageFilter
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'  # Specify the upload folder
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)  # Create the upload folder if it does not exist

def BlackAndWhiteFilter(image):
    # Convert the image to black and white
    bw_image = image.convert('L')
    return bw_image

def GaussianBlurFilter(image):
    blurred_image = image.filter(ImageFilter.GaussianBlur(radius=5))  # Adjust radius as needed
    return blurred_image

@app.route('/api/process-image', methods=['POST'])
def process_image_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Get the image file
    image_file = request.files['image']
    save_path = os.path.join(UPLOAD_FOLDER, 'original.png')
    image_file.save(save_path)

    # Print debug information
    print('Image saved to:', save_path)

    # Return the path to the saved image
    return jsonify({'image_path': save_path})

@app.route('/api/card', methods=['POST'])
def receive_card_id():
    data = request.get_json()
    card_id = data.get('cardId')
    print('Received card ID:', card_id)

    if card_id == 1:
        try:
            image_path = os.path.join(UPLOAD_FOLDER, 'original.png')
            image = Image.open(image_path)

            bw_image = BlackAndWhiteFilter(image)

            save_path = os.path.join(UPLOAD_FOLDER, 'bw.png')
            bw_image.save(save_path, format='PNG')

            print('Image filtered and saved:', save_path)

            return jsonify({'filtered_image_path': save_path})
        except Exception as e:
            print('Error applying filter:', str(e))
            return jsonify({'error': 'Error applying filter'}), 500
    elif card_id == 2:
        try:
            image_path = os.path.join(UPLOAD_FOLDER, 'original.png')
            image = Image.open(image_path)

            blurred_image = GaussianBlurFilter(image)

            save_path = os.path.join(UPLOAD_FOLDER, 'gaussian.png')
            blurred_image.save(save_path, format='PNG')

            print('Image blurred and saved:', save_path)

            return jsonify({'blurred_image_path': save_path})
        except Exception as e:
            print('Error applying Gaussian blur:', str(e))
            return jsonify({'error': 'Error applying Gaussian blur'}), 500
    else:
        return jsonify({'message': 'No filtering needed for this card'})

if __name__ == '__main__':
    app.run(debug=True, port=8080)