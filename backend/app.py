from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Handong Carpool 백엔드 서버 동작 중!'

if __name__ == '__main__':
    app.run(debug=True)
