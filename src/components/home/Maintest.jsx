import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import { usePost } from '../../contexts/post.context';

function Maintest() {
  //input창에 입력할 title,content context모듈에 보내줘야함
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  //현재 url의 쿼리 문자열을 가져오거나 동적 url로 변경 가능
  const [searchParams] = useSearchParams();
  //문자열의 category를 selectedCategory안에 담기
  const selectedCategory = searchParams.get('category');
  //selectedCategory 값이 존재하면 selectedCategory 값으로 초기화
  //값이 존재하지 않으면 '발라드'로 초기화
  const [category, setCategory] = useState(selectedCategory || '발라드');
  //로그인한 사용자 값 따로 구조분해할당으로 가져오기
  const { userInfo } = useAuth();
  //컴포넌트에서 해당 컨텍스트 안에 값을 사용하기 위해 사용
  const { createPost, post } = usePost();
  //데이터를 가져오기 때문에 async 사용
  const handleCreatePost = async (event) => {
    // 함수 실행시 홈페이지 새로고침 방지
    event.preventDefault();
    // title과 content의 여백이 없을 시
    if (title.trim() && content.trim()) {
      // post생성함수에 title,content,category, userInfo 제공
      createPost({ title, content, category, userInfo });
      //입력 후 title과 content는 다시 빈 여백으로 만들기
      setTitle('');
      setContent('');
    } else {
      //title,content 하나라도 입력안되면 경고창
      alert('제목 내용 모두 입력');
    }
  };
  return (
    <div>
      {/* submit 제출될시 함수 실행 */}
      <form onSubmit={(event) => handleCreatePost(event)}>
        {/* title글씨가 15줄 넘을시 경고창 실행     */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 15) {
              setTitle(e.target.value);
            } else {
              alert('제목이 너무 깁니다!');
            }
          }}
          placeholder="제목을 입력해주세요"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setContent(e.target.value);
            } else {
              alert('내용이 너무 깁니다!');
            }
          }}
          placeholder="어떤 이야기를 나누고 싶나요?"
        />
        {/* 카테고리의 값이 바뀌었을때 적용해줌   */}
        <select onChange={(e) => setCategory(e.target.value)}>
          {/* selected는 옵션을 선택된 상태로 만듬
  category가 '발라드' 일 경우에만 선택된다는 의미
  value는 실제로 서버로 제출되거나 js에서 사용되는 옵션의 값 */}
          <option selected={category === '발라드'} value={'발라드'}>
            발라드
          </option>
          <option selected={category === '힙합'} value={'힙합'}>
            힙합
          </option>
          <option selected={category === 'R&B'} value={'R&B'}>
            R&B
          </option>
          <option selected={category === '락'} value={'락'}>
            락
          </option>
          <option selected={category === '댄스'} value={'댄스'}>
            댄스
          </option>
          <option selected={category === '연예인'} value={'연예인'}>
            연예인
          </option>
        </select>
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

export default Maintest;
