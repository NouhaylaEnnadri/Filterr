from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from PIL import Image  # Import the Image module from PIL
import io

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/filtre/card', methods=['POST'])
def handle_card_click():
    data = request.get_json()
    card = data.get('card')

    # Access each property of the card object directly
    card_id = card.get('id')
    card_title = card.get('title')
    card_description = card.get('description')
    card_img_url = card.get('imgUrl')

    print(f'Card ID: {card_id}')
    print(f'Card Title: {card_title}')
    print(f'Card Description: {card_description}')
    print(f'Card Image URL: {card_img_url}')

    # Add your processing logic here based on card data

    return jsonify({'message': 'Card data processed successfully'}), 200

@app.route('/api/filtre/image', methods=['POST'])
def handle_image_upload():
    if 'image' in request.files:
        image_file = request.files['image']
        
        # Process the image file
        print(f'Uploaded image filename: {image_file.filename}')
        
        # Open the uploaded image
        image = Image.open(image_file)
        
        # Convert the image to black and white
        bw_image = image.convert('L')
        
        # Convert the black and white image to byte stream
        img_byte_array = io.BytesIO()
        bw_image.save(img_byte_array, format='JPEG')
        img_byte_array.seek(0)
        
        # Return the byte stream as response
        return send_file(img_byte_array, mimetype='image/jpeg')
    else:
        return jsonify({'error': 'No image uploaded'}), 400


if __name__ == '__main__':
    app.run(debug=True, port=8080)