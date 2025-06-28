from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db

# Flask 앱 생성
app = Flask(__name__)
CORS(app)  # React와 통신하기 위해 필요

# Firebase 연동 초기화
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://handong-carpool-25-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

# 간단한 테스트 API
@app.route('/')
def home():
    return jsonify({
        "message": "한동대 카풀 서비스 API 서버가 작동중입니다!",
        "status": "success"
    })

# 카풀 목록을 가져오는 API (일단 가짜 데이터)
@app.route('/api/carpools', methods=['GET'])
def get_carpools():
    ref = db.reference('carpools')
    carpools_dict = ref.get() or {}
    # Firebase는 dict로 반환하므로 리스트로 변환
    carpools = []
    for key, value in carpools_dict.items():
        value['id'] = key
        carpools.append(value)
    return jsonify({
        "carpools": carpools,
        "count": len(carpools)
    })

# 새로운 카풀 등록 API
@app.route('/api/carpools', methods=['POST'])
def create_carpool():
    data = request.get_json()
    required_fields = ['departure', 'destination', 'time', 'driver', 'seats']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} 필드가 없습니다"}), 400
    ref = db.reference('carpools')
    new_ref = ref.push(data)
    data['id'] = new_ref.key
    return jsonify({
        "message": "카풀이 성공적으로 등록되었습니다!",
        "data": data
    }), 201

if __name__ == '__main__':
    print("🚗 한동대 카풀 서버를 시작합니다...")
    print("📍 http://localhost:5000 에서 확인하세요")
    app.run(debug=True, port=5000)