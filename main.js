//랜덤번호 지정
//유저가 번호를 입력하고, go 버튼 누른다.
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.!
// 만약 랜덤번호 < 유저번호 Down!!
// 랜덤번호 > 유저번호 up!!
// reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 주고, 기회를 다쓰면 게임 끝난다.( 버튼이 disable)

// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 숫자가 아닌 문자를 입력하면 알려준다. 기회를 깍지 않는다.
document.addEventListener('DOMContentLoaded', () => {
            new TypeIt('#mission')
                .pause(1000)
                .delete(3, { delay: 1000 })
                .type('100까지의 숫자를 맞추세요!')
                .go()
        })


let isFirst
let computerNumber
let userNumber
let userNumberList
let chances
let gameOver

const playButton = document.getElementById('play-button')
const userInput = document.getElementById('user-input')
const chancesTag = document.getElementById('chances-tag')
const resultTag = document.getElementById('result-tag')
const messageTag = document.getElementById('message')
const message2Tag = document.getElementById('message2')
const resetButton = document.getElementById('reset-button')
const image = document.getElementById('image')
const mission =document.querySelector('#mission')
const flipCardInner = document.querySelector('.flip-card-inner');

const pending ='https://i.pinimg.com/originals/04/3b/7a/043b7a72e6f3fd332bdf88e94f7ecff3.gif'
const down ='https://media.tenor.co/images/1a344b45b97ac46cf0f23610392899ac/raw'
const up ='https://i.pinimg.com/originals/e3/a8/b0/e3a8b02ab7761dc6d938668fc879a350.gif'
const success ='https://media.giphy.com/media/F3i3pwWJtS5c4/giphy.gif'
const fail ='https://i.pinimg.com/originals/c6/c0/09/c6c0099d50376c25d1e436a93197ae26.gif'

// 모든 셋팅을 초기화하는 함수 
function initialize(){
    isFirst = true
    chances = 6
    userNumberList =[]
    gameOver = false
    chancesTag.innerHTML = `남은횟수: ${chances}`
    messageTag.innerHTML = '메시지'
    message2Tag.innerHTML ='깍꿍!~'
    userInput.value =''
    image.src = pending

    playButton.disabled = false;
    playButton.addEventListener('click', play);
    userInput.addEventListener('keydown', enterKeyHandler);
    userInput.addEventListener('focus', inputInitialize)
    resetButton.addEventListener('click', reset)
}
initialize()


// 인풋을 넣고 enter를 눌러도 go버튼(playButton)누른 효과 나타나게

function enterKeyHandler(event){
    if(event.key == 'Enter'){
        play()
    }
}

// userInput에 숫자가 적혔다가, 다른 곳을 눌렀다가, 다시 userInput을 눌렀을 때, 새로 입력할 수 있게 '' 환경을 만드는 것
function inputInitialize(){
    userInput.value =''
    userInput.placeholder='1~100사이'
}

function makeComputerNumber(){
    computerNumber = Math.floor(Math.random()*100)+1;   // randomd은 0=< 숫자 < 1
    console.log(computerNumber);
}

function play() {
    if (isFirst) makeComputerNumber();
    isFirst = false;
    userNumber = userInput.value  // innerText, textContent로는 안된다.
    
    if (userNumber >100 || userNumber <1){
        // 결과창에 '1~100사이 숫자를 입력하라고 알려줌
        messageTag.innerHTML = "1~100사이 잉!~"
        // input 창 숫자를 리셋
        userInput.value = ''
   } else if ( userNumberList.includes(userNumber)){
        // 결과창에 이미 입력한 숫자라고 알려줌.
        messageTag.innerHTML = '이미 입력한 숫자입니다.'
        // input 창 숫자를 리셋
        userInput.value = ''
   } else if (userNumber > computerNumber){
        // 결과창 'down'
        messageTag.innerHTML = 'down ↓'
        image.src = down
        // input창 리셋
        userInput.value =''
        chances--
        chancesTag.innerHTML = `남은 횟수: ${chances}` //화면 반영 위해!!
        userNumberList.push(userNumber)
    } else if(userNumber < computerNumber){
        messageTag.innerHTML = 'up ↑'
        image.src = up
        userInput.value =''
        chances--
        chancesTag.innerHTML = `남은 횟수: ${chances}` //화면 반영 위해!!
        userNumberList.push(userNumber)
    } else if ( userNumber == computerNumber){
        message2Tag.innerHTML = '정답!!'
        flipCard();
        image.src = success
        gameOver = true;
    }    
    if (chances ==0){
        gameOver = true;
    }
    
    if (gameOver){
        //go 버튼 비활성화
        playButton.disabled =true;
        if(chances ==0){
            message2Tag.innerHTML=`실패 (정답:${computerNumber})`
            flipCard();
            image.src = fail
            mission.innerHTML = '다시하려면 "reset"을 누르세요'
        }
    }
    
}

function reset() {
    resetFlipCard()
    initialize()

    userInput.placeholder ='1~100사이'
    mission.innerText ='1부터 200'
    new TypeIt('#mission')
                .pause(1000)
                .delete(3, { delay: 1000 })
                .type('100까지의 숫자를 맞추세요!')
                .go()
}

function flipCard() {
    flipCardInner.style.transform = 'rotateY(180deg)';
  }
function resetFlipCard(){
    messageTag.innerHTML = '메시지';
    const flipCardBack = document.querySelector('.flip-card-back')
    flipCardBack.style.backgroundColor = '#4d59fb)'; 
    flipCardInner.style.transform = 'rotateY(0deg)';

    // hover 효과를 다시 활성화
    flipCardInner.addEventListener('mouseover', function() {
        flipCardInner.style.transform = 'rotateY(180deg)';
    });
    // 마우스가 요소를 벗어났을 때 다시 원래대로 돌아오기
    flipCardInner.addEventListener('mouseout', function() {
        flipCardInner.style.transform = 'rotateY(0deg)';
    });
}