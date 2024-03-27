from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        
    
    return jsonify({'message': 'Image uploaded successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8080)
