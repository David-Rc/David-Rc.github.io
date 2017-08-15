/**
 * Created by david on 13/02/2017.
 */

var interScore = document.querySelector('#score');
var interLevel = document.querySelector('#level');
interScore.setAttribute('visible', false);
interLevel.setAttribute('visible', false);

var camera = document.querySelector('a-camera');
var cursor = document.querySelector('a-cursor');
var scene = document.querySelector('a-scene');
var timeline;
var time = 0;
var highScore = 0;

scene.addEventListener('loaded', function(){
   starsFactory(1000);
   var readyText = document.createElement('a-text');
   readyText.setAttribute('mixin', 'text');
   camera.appendChild(readyText);
   readyText.setAttribute('position', '0 0 -3');
   cursor.setAttribute('visible', false);

    var s = 3;
    readyText.setAttribute('text', 'value:'+s);

   var introTime = setInterval(function() {
       readyText.setAttribute('text', 'value:'+s);
       s--;
       if(s == -1)
       {
           readyText.setAttribute('text', 'value: GO!');
       }
       if(s < -1)
       {
           cursor.setAttribute('visible', true);
           interScore.setAttribute('visible', true);
           interLevel.setAttribute('visible', true);
           clearInterval(introTime);
           readyText.parentNode.removeChild(readyText);
           timeline = setInterval(function() {
               time++;
               if(time == 120)
               {
                   clearInterval(timeline);
                   clearInterval(overTrigger);
                   for(var s = 0; s < document.getElementsByClassName('meteor').length; s++)
                   {
                       document.getElementsByClassName('meteor')[s].parentNode.removeChild(document.getElementsByClassName('meteor')[s])
                       cursor.setAttribute('visible', false);
                       document.querySelector('#score').setAttribute('visible', false);
                       document.querySelector('#level').setAttribute('visible', false);

                   }

                   var gOver = document.createElement('a-text');
                   camera.appendChild(gOver);
                   gOver.setAttribute('position', '-1 1 -3');
                   gOver.setAttribute('text', 'value: GAME OVER');
                   gOver.setAttribute('mixin', 'over');
                   var tOver = document.createElement('a-text');
                   camera.appendChild(tOver);
                   tOver.setAttribute('position', '-1 0 -3');
                   tOver.setAttribute('text', 'value: Time : ' + time + 's.');
                   tOver.setAttribute('mixin', 'over');
                   var sOver = document.createElement('a-text');
                   camera.appendChild(sOver);
                   sOver.setAttribute('position', '-1 -0.5 -3');
                   sOver.setAttribute('text', 'value: High Score : ' + highScore + ' pts.' );
                   sOver.setAttribute('mixin', 'over');
               }
               run();
           }, 1000);
       }
   }, 1000);

});

var stars = document.getElementsByClassName('stars');

setInterval(function() {

        stars[Math.floor(Math.random() * stars.length)].parentNode.removeChild(stars[Math.floor(Math.random() * stars.length)]);

        var randomX = Math.floor(Math.random() * (4600 - -4600) + -4600);
        var randomY = Math.floor(Math.random() * (4600 - -4600) + -4600);
        var randomZ = Math.floor(Math.random() * (2500 - -4600) + -2500);
        var star = document.createElement('a-sphere');

        star.setAttribute('position', {x: randomX, y: randomY, z: randomZ});
        star.setAttribute('color', 'white');
        star.setAttribute('class', 'stars');
        scene.appendChild(star);

}, 10);

function starsFactory(n)
{
    for(var j = 0; j <= n; j++)
    {
        var randomX = Math.floor(Math.random() * (1000 - -3600) + -3600);
        var randomY = Math.floor(Math.random() * (1000 - -3600) + -3600);
        var randomZ = Math.floor(Math.random() * (1000 - -3600) + -3600);
        var star = document.createElement('a-sphere');

        star.setAttribute('position', {x: randomX, y: randomY, z: randomZ});
        star.setAttribute('color', 'white');
        star.setAttribute('class', 'stars');
        scene.appendChild(star);
    }
}

var score = 0;
var meteorInter;


interScore.setAttribute('text', 'value:'+ 'Score : ' + score + ' pts.');

function meteorFactory(nbMeteor, nbDur)
{

        for(var i = 0; i <= nbMeteor; i++)
        {
            var random = Math.floor(Math.random() * (20 - -20) + -20);

            var sphere = document.createElement('a-sphere');
            sphere.setAttribute('position', {x: random, y: 10, z: -200});
            sphere.setAttribute('src', '#meteor');
            sphere.setAttribute('class', 'meteor');
            scene.appendChild(sphere);
            sphere.addEventListener('mouseenter', function(){
                score++;
                highScore++;
                interScore.setAttribute('text', 'value:'+ 'Score : ' + score + ' pts.');
                this.parentNode.removeChild(this);
            });

            var finalPos = random + ' 2 0';

            var animPos = document.createElement('a-animation');
            animPos.setAttribute('attribute', 'position');
            animPos.setAttribute('dur', nbDur);
            animPos.setAttribute('to', finalPos);
            animPos.setAttribute('end', 'mouseenter');

            var animRot = document.createElement('a-animation');
            animRot.setAttribute('dur', 5000);
            animRot.setAttribute('attribute', 'rotation');
            animRot.setAttribute('to', '0 360 0');
            sphere.appendChild(animPos);
            sphere.appendChild(animRot);
        }
}

function run()
{
    if(score < 10)
    {
        meteorFactory(1, 5000);
        interLevel.setAttribute('text', 'value:'+ 'Level 1');
    }

    if(score < 20 && score > 10)
    {
        clearInterval(meteorInter);
        meteorFactory(2, 5000);
        interLevel.setAttribute('text', 'value:'+ 'Level 2');
    }
    if(score < 30 && score > 20)
    {

        clearInterval(meteorInter);
        meteorFactory(4, 5000);
        interLevel.setAttribute('text', 'value:'+ 'Level 3');
    }
    if(score < 40 && score > 30)
    {
        interLevel.setAttribute('text', 'value:'+ 'Level 4');
        clearInterval(meteorInter);
        meteorFactory(4, 3000)
    }
    if(score < 50 && score > 40)
    {
        interLevel.setAttribute('text', 'value:'+ 'Level 5');
        clearInterval(meteorInter);
        meteorFactory(2, 2000);
    }

    for(var s = 0; s < document.getElementsByClassName('meteor').length; s++)
    {
        if(document.getElementsByClassName('meteor')[s].components.position.attrValue.z == 0)
        {
            score--;
            interScore.setAttribute('text', 'value:'+ 'Score : ' + score + ' pts.');
            document.getElementsByClassName('meteor')[s].parentNode.removeChild(document.getElementsByClassName('meteor')[s])
        }
    }
}

var overTrigger = setInterval(function()
{

    if(score <= -1 || score == 65)
    {
        clearInterval(timeline);
        clearInterval(overTrigger);
        for(var s = 0; s < document.getElementsByClassName('meteor').length; s++)
        {
                document.getElementsByClassName('meteor')[s].parentNode.removeChild(document.getElementsByClassName('meteor')[s])
                cursor.setAttribute('visible', false);
                document.querySelector('#score').setAttribute('visible', false);
                document.querySelector('#level').setAttribute('visible', false);

        }

        var gOver = document.createElement('a-text');
        camera.appendChild(gOver);
        gOver.setAttribute('position', '-1 1 -3');
        gOver.setAttribute('text', 'value: GAME OVER');
        gOver.setAttribute('mixin', 'over');
        var tOver = document.createElement('a-text');
        camera.appendChild(tOver);
        tOver.setAttribute('position', '-1 0 -3');
        tOver.setAttribute('text', 'value: Time : ' + time + 's.');
        tOver.setAttribute('mixin', 'over');
        var sOver = document.createElement('a-text');
        camera.appendChild(sOver);
        sOver.setAttribute('position', '-1 -0.5 -3');
        sOver.setAttribute('text', 'value: High Score : ' + highScore + ' pts.' );
        sOver.setAttribute('mixin', 'over');
    }
}, 10);