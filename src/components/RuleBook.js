import React from 'react';

const RuleBook = () => {
    return (
        <div className="rulebook">
            <h2 >가이드 북</h2>
            <p>1. 시작 버튼을 누르면 게임이 시작 됩니다.</p>
            <p>2. 2초 동안 카드 위치가 보이게 됩니다.</p>
            <p>3. 같은 그림끼리 연결하면 점수를 얻고, 틀리면 점수가 차감됩니다.</p>
            <p>4. 정해진 시간 내에 높은 점수를 얻으세요!</p>
            <hr/>
            <p>정답      : +1점</p>
            <p>실패      : -1점</p>
        </div>
    );
};

export default RuleBook;