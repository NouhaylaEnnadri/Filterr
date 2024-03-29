from flask import Flask, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/convert-to-bw', methods=['GET'])
def convert_to_bw():
    # Define the path to the image
    image_path = "server/uploads/Noyl.png"

    # Check if the image exists
    if not os.path.exists(image_path):
        return jsonify({'error': 'Image not found'}), 404

    # Read the image
    img = Image.open(image_path)

    # Convert image to black and white
    bw_img = img.convert('L')

    # Define the path for the black and white image
    bw_image_path = "server/uploads/Noyl_bw.png"

    # Save the black and white image
    bw_img.save(bw_image_path)

    # Return the black and white image
    return send_file(bw_image_path, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=8080)
