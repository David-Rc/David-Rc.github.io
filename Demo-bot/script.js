var saibot = 'Sybot';
var user;
var state = 0;
var data;
var video = document.createElement('video');
var prog = 0;
var score = 0;
var point = ['.', '.', '.'];
var timePoint;

var request = new XMLHttpRequest();
request.onload = getData;
request.open("get", "bot.json", true);
request.send(null);

function getData()
{
    if(request.readyState == 4)
    {
        data = JSON.parse(this.responseText);
        user = prompt('Enter your name : ');
        answerBot(state);
    }
}

function answerUser()
{
    console.log('answerUser state : ', state);
    showBotMessage(user, userSay.value);

    state == 4 ? runQuiz() : answerBot(userSay.value);
    userSay.value = "";
}

var yes = ['yes', 'oui'];
var no = ['non', 'no', 'plus tard'];


function answerBot(userAnswer)
{

    switch(state)
    {
        case 0:
            showBotMessage(saibot, data.greet[0] + user + data.greet[1], 1500);
            showBotMessage(saibot, data.message[0].pre, 3500, 1500);
            showBotMessage(saibot, data.message[0].end, 5500, 3500);
            showBotMessage(saibot, data.question[0].one, 6000, 5500);
            state++;
            break;
        case 1:
            if(yes.indexOf(userAnswer.toLowerCase()) > -1)
            {
                video.src = 'assets/creation_monetaire2.mp4';
                video.load();

                showBotMessage(saibot, data.question[1].two, 2000);
                state++;
            } else if (no.indexOf(userAnswer.toLowerCase()) > -1)
            {

                showBotMessage(saibot, data.question[0].no, 1500);
                state -= 1;
            } else {

                showBotMessage(saibot, data.default[0], 1000);
            }
            break;
        case 2:
            if(yes.indexOf(userAnswer.toLowerCase()) > -1)
            {

                showBotMessage(saibot, data.question[1].yes + ' environs ' + (Math.floor(video.duration / 60)) + " minutes.", 1000);
                setTimeout(function(){videoCheck()}, 2000);
                video.onended = function()
                {

                    showBotMessage(saibot, data.question[2].pre, 1500);

                    showBotMessage(saibot, data.question[2].end, 2500, 1500);
                };
                state++;
            } else if (no.indexOf(userAnswer.toLowerCase()) > -1)
            {

                showBotMessage(saibot, data.question[1].no, 1500);
                state -= 1;
            } else
            {

                showBotMessage(saibot, data.default[0], 1000);

            }
            break;
        case 3:
            if(userAnswer == '1' || yes.indexOf(userAnswer.toLowerCase()) > -1)
            {

                showBotMessage(saibot, data.question[2].yes, 1000);
                setTimeout(function() { buttonPlay(); }, 1500);
            }
             else if (userAnswer == '2') {

                showBotMessage(saibot, data.question[3].pre, 1500);
                setTimeout(function () {
                    showRessources(data.question[3].ressources);
                }, 2000);
                showBotMessage(saibot, data.question[3].end, 4500, 2000);
                setTimeout(function () {
                    buttonPlay();
                }, 5000);
            }else if(no.indexOf(userAnswer.toLowerCase()) > -1)
            {
                showBotMessage(saibot, data.question[1].no, 1000);
            } else {
                showBotMessage(saibot, data.default[0], 1500);
                state = 3;

            }
            break;
        case 5:
            if(score == 3)
            {
               var result = '100%';
                setTimeout(function() {
                    showBotMessage(saibot, data.question[4].pre[0] + ' ' + result +' ' + data.question[4].pre[1], 1500);
                    showBotMessage(saibot, data.exercice[3].question, 2500, 1500);
                    showBotReponse(saibot, data.exercice[3].a, 3000);
                    showBotReponse(saibot, data.exercice[3].b, 3000);
                    showBotReponse(saibot, data.exercice[3].c, 3000);
                }, 1000);
               state = 7;
            } else if (score == 2)
            {
                var result = '66%';
                setTimeout(function(){
                    showBotMessage(saibot, data.question[4].pre[0] + ' ' + result +' ' + data.question[4].pre[1], 1500);
                    showBotMessage(saibot, data.exercice[3].question, 2500, 1500);
                    showBotReponse(saibot, data.exercice[3].a, 3000);
                    showBotReponse(saibot, data.exercice[3].b, 3000);
                    showBotReponse(saibot, data.exercice[3].c, 3000);
                }, 1000);
                state = 7;
            } else {

                showBotMessage(saibot, data.question[4].lose, 1500);
                state = 6;
            }
            break;
        case 6:
            if(yes.indexOf(userAnswer.toLowerCase()) > -1)
            {

                showBotMessage(saibot, data.question[1].yes + ' environs ' + (Math.floor(video.duration / 60)) + " minutes.", 1000);
                setTimeout(function(){videoCheck()}, 2000);
                video.onended = function()
                {

                    showBotMessage(saibot, data.question[2].pre, 1500);

                    showBotMessage(saibot, data.question[2].end, 2500);
                };
                state = 3;
            } else if (no.indexOf(userAnswer.toLowerCase()) > -1)
            {
                showBotMessage(saibot, data.question[1].no, 1500);
                showBotMessage(saibot, data.exercice[3].question, 2500, 1500);
                showBotReponse(saibot, data.exercice[3].a, 3000);
                showBotReponse(saibot, data.exercice[3].b, 3000);
                showBotReponse(saibot, data.exercice[3].c, 3000);
                state = 7;
            } else
            {

                showBotMessage(saibot, data.default[0], 1000);

            }
            break;
        case 7:
            showBotMessage(saibot, data.question[4].end, 2000);
            state = 0;
            break;
    }

}



function showBotMessage(actor, answer, time1, time2)
{

    var message = document.createElement('div');
    actor == 'Sybot' ? message.setAttribute('class','Sybot message') : message.setAttribute('class', 'User message');

    var span = document.createElement('span');
    span.textContent = actor + ' : ';


        setTimeout(function() {

            var p = 0;
            field.appendChild(span);
            field.appendChild(message);
            field.scrollTop = field.scrollHeight;
            timePoint = setInterval(function() {
                if (p >= 3) {
                    p = 0;
                    message.textContent = '';
                }
                var text = document.createTextNode(point[p]);
                message.appendChild(text);
                field.scrollTop = field.scrollHeight;
                p++;
            }, 200);
        }, time2);

    setTimeout(function() {
        clearInterval(timePoint);
        message.textContent = '';
        message.textContent +=  answer;
    }, time1);
}



function videoCheck()
{
    video.controls = true;
    video.setAttribute('id', 'video');
    field.appendChild(video);
    field.scrollTop = field.scrollHeight;
}


function showRessources(ressources)
{
    for(var i = 0; i <= ressources.length - 1; i++)
    {
        var a = document.createElement('a');
        a.setAttribute('href', ressources[i]);
        a.textContent = ressources[i] + '\n';
        field.appendChild(a);
        field.scrollTop = field.scrollHeight;
    }
}


function buttonPlay()
{
    state++;
    var button = document.createElement('button');
    button.textContent = "play";
    button.setAttribute('onclick', 'runQuiz()');
    button.setAttribute('class', 'play');
    field.appendChild(button);
    field.scrollTop = field.scrollHeight;
}


function showBotReponse(actor, answer, time)
{
    var message = document.createElement('div');
    message.setAttribute('class', actor + ' message');


    setTimeout(function() {
        clearInterval(timePoint);
        message.textContent = answer;
        field.appendChild(message);
        field.scrollTop = field.scrollHeight;
    }, time);
}

function runQuiz()
{

    console.log('run quizz state : ', state);
    switch(prog)
    {
        case 0:
            showBotMessage(saibot, data.exercice[0].question, 1500);
            showBotReponse(saibot, data.exercice[0].a, 2000);
            showBotReponse(saibot, data.exercice[0].b, 2000);
            showBotReponse(saibot, data.exercice[0].c, 2000);

            prog = 10;
            break;
        case 10:
            prog = 2;
         if(userSay.value.toLowerCase() == "a")
         {
             showBotMessage(saibot, data.exercice[0].true, 1000);
             score++;
             runQuiz();
         } else if (userSay.value.toLowerCase() == "b".toLowerCase() || userSay.value.toLowerCase() == "c".toLowerCase()){
             showBotMessage(saibot, data.exercice[0].false, 1000);
             runQuiz();
         } else {
             showBotMessage(saibot, data.default[0]);
             prog = 0;
         }
         break;
        case 2:
            setTimeout(function() {
                showBotMessage(saibot, data.exercice[1].question, 1500);
                showBotReponse(saibot, data.exercice[1].a, 2000);
                showBotReponse(saibot, data.exercice[1].b, 2000);
            }, 1000);

            prog = 20;
            break;
        case 20:
            prog = 3;
            if(userSay.value.toLowerCase() == "b".toLowerCase())
            {

                showBotMessage(saibot, data.exercice[1].true, 1000)
                score++;
                runQuiz();
            } else if(userSay.value.toLowerCase() == "a".toLowerCase() || userSay.value.toLowerCase() == "c".toLowerCase()) {

                showBotMessage(saibot, data.exercice[1].false, 1000);
                runQuiz();
            } else {

                showBotMessage(saibot, data.default[0]);
                prog = 2;
            }
            break;
        case 3:
            setTimeout(function() {
                showBotMessage(saibot, data.exercice[2].question, 1500);
                showBotReponse(saibot, data.exercice[2].a, 2000);
                showBotReponse(saibot, data.exercice[2].b, 2000);
                showBotReponse(saibot, data.exercice[2].c, 2000);
            }, 1000);

            prog = 30;
            break;
        case 30:
            if(userSay.value.toLowerCase() == "b".toLowerCase())
            {
                showBotMessage(saibot, data.exercice[1].true, 1000);
                score++;
                state++;
                answerBot()
            } else if(userSay.value.toLowerCase() == "a".toLowerCase() || userSay.value.toLowerCase() == "c".toLowerCase()) {
                showBotMessage(saibot, data.exercice[1].false, 1000);
                state++;
                answerBot()
            } else {
                showBotMessage(saibot, data.default[0]);
                prog = 3;
                runQuiz();
            }
    }
}

function enter(event)
{
   if(event.key == 'Enter' || event.keyCode == 13)
   {
       answerUser();
   }
}
