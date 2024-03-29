from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from PIL import Image
import io
import os
import base64

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = 'uploads'  # Directory to store processed images
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/filtre/image', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            # Read the uploaded image
            img = Image.open(io.BytesIO(file.read()))

            # Convert image to black and white
            bw_img = img.convert('L')

            # Ensure the existence of the upload directory
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

            # Generate a unique filename
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)

            # Ensure file extension
            filename = ensure_extension(filename)

            # Save the black and white image
            bw_img.save(filename)

            # Read the processed image back into memory
            with open(filename, 'rb') as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

            return jsonify({'message': 'File processed and saved successfully', 'filename': filename, 'encoded_image': encoded_string}), 200
        except Exception as e:
            return jsonify({'error': f'An error occurred: {str(e)}'}), 500

def ensure_extension(filename):
    # Ensure the filename has the correct extension (e.g., .jpg, .png)
    _, ext = os.path.splitext(filename)
    if not ext:
        filename += '.png'  # You can change the extension as needed
    return filename

if __name__ == '__main__':
    app.run(debug=True, port=8080)
