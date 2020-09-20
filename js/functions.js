var engine = {
    "animals": ['monkey','lion','rhino','elephant','owl','giraffe', 'reindeer','camel','snake','alligator','turtle','chicken', 'cricket','panda','rabbit','beaver','snail','kangaroo','dog', 'duck','toucan','skunk','eagle','tiger','leopard','pig', 'sheep','goat','ladybug','cat','zebra','pelican','parrot','horse'],
    
    "coins":0
}

const audioCoin = new Audio ('audio/coin.wav')
const audioError = new Audio ('audio/wrong.wav')

function randomAnimal(){
    var indexAnimal = Math.floor(Math.random() * engine.animals.length)
    var nameAnimal = engine.animals[indexAnimal]
    var showName = document.getElementById("animalName")
    var image = document.getElementById("animalImg")

    for (var i = 0; i<=engine.animals.length; i++) {
        image.src = "img/animal" + [indexAnimal] + ".png";
        showName.innerText = nameAnimal
        showName.style.display = "none"
    }
}

function updateCoin(value) {
    var score = document.getElementById('points')

    engine.coins += value;

    if (value < 0) {
        audioError.play()
    } else {
        audioCoin.play()
    }

    points.innerText = engine.coins;
}

randomAnimal();

//API Speech Recognition
var btnRecorder = document.getElementById('btn-answer')
var transcription = ""
var correctAnswer = ""

if(window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    var recorder = new SpeechAPI();

    recorder.continuos = false;
    recorder.lang = "en-US";

    recorder.onstart = function () {
        btnRecorder.innerText = "Estou Ouvindo"
        btnRecorder.style.backgroundColor = "#585f16"
        btnRecorder.style.color = "white"
    }

    recorder.onend = function () {
        btnRecorder.innerText = "Responder"
        btnRecorder.style.backgroundColor = "white"
        btnRecorder.style.color = "#585f16"
    }

    recorder.onresult = function (event) {
        transcription = event.results[0][0].transcript
        correctAnswer = document.getElementById("animalName")

        if (transcription === correctAnswer.innerText) {
            updateCoin(1)
        } else {
            updateCoin(-1)
        }

        randomAnimal();
    }



} else {
    alert('não tem suporte')
}

btnRecorder.addEventListener('click', function (e) {
    recorder.start()
})