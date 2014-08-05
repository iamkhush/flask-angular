from flask import Flask
from flask import render_template

import os

STATIC_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'static/')

app = Flask(__name__, template_folder='',
                  static_folder=STATIC_DIR, static_url_path='')


@app.route("/")
def hello():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)