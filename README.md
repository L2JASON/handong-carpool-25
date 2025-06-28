# handong-carpool-25

## 소개
한동대 학생들의 카풀 매칭을 돕는 서비스입니다.

## 팀원
- 이준혁(팀장)
- 성하민
- 문하영

## 사용 기술
- Frontend: React
- Backend: Flask
- DB: Firebase Realtime DB
- 지도: Kakao Map API

## 폴더 구조
```
project-root/
├── frontend/        # React 앱
├── backend/         # Flask API 서버
├── docs/            # 보고서, 발표자료
├── README.md
```

## 시작하기

### 1. 필수 파일 준비
- `backend/serviceAccountKey.json` 파일은 **절대 깃허브에 포함되지 않습니다.**
- `backend/.env` 파일도 **절대 깃허브에 포함되지 않습니다.**
- 팀장 또는 관리자에게 별도로 받아서 `backend` 폴더에 직접 복사해 주세요.
- `.env` 파일에는 다음과 같이 작성합니다:

```
DATABASE_URL=실제_파이어베이스_데이터베이스_URL
```

### 2. 프론트엔드 실행
```bash
cd frontend
npm install
npm start
```
- 개발 서버: http://localhost:3000

### 3. 백엔드 실행
```bash
cd backend
pip install -r requirements.txt
python app.py
```
- API 서버: http://localhost:5000

### 4. Firebase 연동
- `backend/serviceAccountKey.json` 파일과 `app.py`의 `databaseURL`이 실제 Firebase 콘솔의 Realtime Database URL과 일치해야 합니다.
- 예시: `https://handong-carpool-25-default-rtdb.firebaseio.com/`

### 5. 문서
- docs 폴더에 보고서 및 발표자료가 있습니다.

---

## 협업 시 주의사항
- **비밀키 파일(`serviceAccountKey.json`)은 반드시 직접 전달받아야 하며, 깃허브에 올리지 마세요.**
- `.gitignore`에 이미 추가되어 있습니다.
- 팀원은 파일을 직접 backend 폴더에 복사해야 정상적으로 Firebase 연동이 가능합니다.

---

## 문의
- 궁금한 점은 팀장 또는 관리자에게 문의하세요.