from flask_cors import CORS
from api import app

if __name__ == '__main__':
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.run(debug=True, port=8080)
