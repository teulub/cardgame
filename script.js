document.addEventListener('DOMContentLoaded', () => {
    const totalCards = 40;  // 총 카드 수 (8x5 = 40)
    const pairCount = totalCards / 2; // 20쌍
    let images = [];

    // card1.jpg ~ card20.jpg 이미지 배열 생성
    for (let i = 1; i <= pairCount; i++) {
        images.push(`card${i}.jpg`);
    }

    // 카드 배열 생성 (쌍 만들기)
    let cards = [...images, ...images];
    cards.sort(() => Math.random() - 0.5);

    const gameBoard = document.getElementById('game-board');
    let flippedCards = [];
    let matchedCards = [];

    // 카드 생성 함수
    function createCard(image, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        // 뒷면(기본상태): empty.jpg + 숫자 표시
        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.textContent = index + 1; // 1~40 숫자

        // 앞면(뒤집혔을 때 보여줄 이미지)
        const cardImage = document.createElement('img');
        cardImage.src = `images/${image}`;
        cardImage.alt = `Card ${index + 1}`;

        card.appendChild(backFace);
        card.appendChild(cardImage);

        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
                flipCard(card);
            }
        });

        return card;
    }

    function flipCard(card) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const match = card1.dataset.image === card2.dataset.image;

        if (match) {
            matchedCards.push(card1, card2);
            flippedCards = [];

            if (matchedCards.length === cards.length) {
                alert('You win!');
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    function initializeGame() {
        cards.forEach((image, index) => {
            const card = createCard(image, index);
            gameBoard.appendChild(card);
        });
    }

    // 힌트 기능: 모든 카드를 2초 동안 공개
    function revealAllCardsForHint() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        setTimeout(() => {
            allCards.forEach(card => {
                if (!matchedCards.includes(card)) {
                    card.classList.remove('flipped');
                }
            });
        }, 2000);
    }

    // 시작 버튼 기능: 모든 카드를 10초 동안 공개
    function revealAllCardsForStart() {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        setTimeout(() => {
            allCards.forEach(card => {
                if (!matchedCards.includes(card)) {
                    card.classList.remove('flipped');
                }
            });
        }, 10000);
    }

    const hintButton = document.getElementById('reveal-all');
    hintButton.addEventListener('click', revealAllCardsForHint);

    // '시작' 버튼 클릭 이벤트
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', revealAllCardsForStart);

    initializeGame();
});
