import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // useState: 데이터를 저장하고 업데이트하는 React 기능
  const [carpools, setCarpools] = useState([]);  // 카풀 목록
  const [loading, setLoading] = useState(true);   // 로딩 상태
  const [error, setError] = useState(null);       // 에러 상태

  // 새 카풀 등록을 위한 폼 데이터
  const [newCarpool, setNewCarpool] = useState({
    departure: '',
    destination: '',
    time: '',
    driver: '',
    seats: 1
  });

  // useEffect: 컴포넌트가 처음 렌더링될 때 실행되는 함수
  useEffect(() => {
    fetchCarpools();
  }, []);

  // Flask 서버에서 카풀 목록을 가져오는 함수
  const fetchCarpools = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/carpools', {
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error('서버에서 데이터를 가져올 수 없습니다');
      }
      
      const data = await response.json();
      setCarpools(data.carpools);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('에러 발생:', err);
    } finally {
      setLoading(false);
    }
  };

  // 폼 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCarpool(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 새 카풀을 등록하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    try {
      const response = await fetch('http://localhost:5000/api/carpools', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarpool)
      });

      if (!response.ok) {
        throw new Error('카풀 등록에 실패했습니다');
      }

      // 성공하면 폼 초기화하고 목록 새로고침
      setNewCarpool({
        departure: '',
        destination: '',
        time: '',
        driver: '',
        seats: 1
      });
      
      alert('카풀이 성공적으로 등록되었습니다!');
      fetchCarpools(); // 목록 새로고침
      
    } catch (err) {
      alert('에러: ' + err.message);
      console.error('등록 에러:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 한동대 카풀 서비스</h1>
        <p>함께 타고 가요!</p>
      </header>

      <main className="main-content">
        {/* 새 카풀 등록 폼 */}
        <section className="carpool-form-section">
          <h2>새 카풀 등록</h2>
          <form onSubmit={handleSubmit} className="carpool-form">
            <div className="form-group">
              <label>출발지:</label>
              <input
                type="text"
                name="departure"
                value={newCarpool.departure}
                onChange={handleInputChange}
                placeholder="예: 한동대"
                required
              />
            </div>

            <div className="form-group">
              <label>목적지:</label>
              <input
                type="text"
                name="destination"
                value={newCarpool.destination}
                onChange={handleInputChange}
                placeholder="예: 포항역"
                required
              />
            </div>

            <div className="form-group">
              <label>출발 시간:</label>
              <input
                type="datetime-local"
                name="time"
                value={newCarpool.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>운전자:</label>
              <input
                type="text"
                name="driver"
                value={newCarpool.driver}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>탑승 가능 인원:</label>
              <select
                name="seats"
                value={newCarpool.seats}
                onChange={handleInputChange}
                required
              >
                <option value={1}>1명</option>
                <option value={2}>2명</option>
                <option value={3}>3명</option>
                <option value={4}>4명</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              카풀 등록하기
            </button>
          </form>
        </section>

        {/* 카풀 목록 */}
        <section className="carpool-list-section">
          <h2>현재 카풀 목록</h2>
          
          {loading && <p>로딩 중...</p>}
          
          {error && (
            <div className="error-message">
              에러: {error}
              <button onClick={fetchCarpools} className="retry-btn">
                다시 시도
              </button>
            </div>
          )}
          
          {!loading && !error && (
            <div className="carpool-grid">
              {carpools.length === 0 ? (
                <p>등록된 카풀이 없습니다.</p>
              ) : (
                carpools.map(carpool => (
                  <div key={carpool.id} className="carpool-card">
                    <div className="carpool-info">
                      <h3>{carpool.departure} → {carpool.destination}</h3>
                      <p><strong>시간:</strong> {carpool.time}</p>
                      <p><strong>운전자:</strong> {carpool.driver}</p>
                      <p><strong>남은 자리:</strong> {carpool.seats}명</p>
                    </div>
                    <button className="join-btn">
                      참여하기
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;