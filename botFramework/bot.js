const restify = require('restify');
const builder = require('botbuilder');
const fs      = require('fs');

const config = require('./config.js');

var json = "bot.json";

var content = fs.readFileSync(json);

var data = JSON.parse(content);

console.log('init');

const connector = new builder.ChatConnector({

   appId: config.appID,

   appPassword: config.appPassword

});

const bot = new builder.UniversalBot(connector);

bot.beginDialogAction('Réviser', '/revision', { matches: /réviser/i });


bot.dialog('/revision', [
    function(session)
    {
        var dme = fs.readFileSync('dme.json');
        var dmeData = JSON.parse(dme);

        if(/réviser/i.test(session.message.text))
        {
            session.send(dmeData.message[0].send[0] + dmeData.theme);
            session.send(dmeData.message[0].send[1]);
        }
        else
        {
            dmeData.message[1].get.forEach(function(el) {


                console.log('check : ', el);

                var regex = new RegExp(el, 'i');

                if(regex.test(session.message.text.toLowerCase()))
                {

                    var video = new builder.Message(session).addAttachment(createVideoCard(session, dmeData));
                    console.log(video);
                    session.send(video);
                    session.send("Préviens moi quand tu auras fini :)")
                }

            });
        }




    }
]);


function createVideoCard(session, data)
{
    console.log('init vidéo...');
    var vid =  new builder.VideoCard(session)

        .title(data.video.title)

        .subtitle(data.video.subtitle)

        .text(data.video.text)

        .media(
            [{
               url: data.video.media
            }]
        );
    console.log('vidéo ready !');
    return vid;

}

const server = restify.createServer();
server.listen(8080);
server.post('/', connector.listen());

bot.dialog('/', [
    function(session)
    {

     console.log('Get : ', session.message.text);

     console.log('Session : ', session.message.user.name);

     console.log('Check : ', data.message[0].get.indexOf(session.message.text) > -1);

     controlMessageText(session);

    }

 ]);


function createButtonAction(session)
{
    var but = new builder.CardAction(session)
        .type('imBack')
        .title('closup')
        .value('Yes');

    return but;

}



function controlMessageText(session)
{

    if(data.message[0].get.indexOf(session.message.text.toLowerCase()) > -1)
    {

        session.send(data.message[0].send[0] +  session.message.user.name + data.message[0].send[1]);
        session.send(data.message[0].send[2]);

    }
    else
    {
        console.log('default...');

        data.message.forEach(function(el) {

            for(var i = 0; i < el.get.length; i++)
            {
                var regex = new RegExp(el.get[i], 'i');

                if(regex.test(session.message.text.toLowerCase()))
                {
                    session.send(el.send[Math.floor(Math.random() * el.send.length)])
                }
            }

        });
    }
}






