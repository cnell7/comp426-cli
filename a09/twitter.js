$( document ).ready(async function() {
    let $root = $('#root');
    $root.append("<button id='createTweet' class='button'>Create</button>");
    $root.append("<div><button id='readTweet' class='button'></button></div>")
    $root.on("click", "#createTweet", function (e) {createHandler(e)});
    $root.on("click", "#readTweet", function(e){readTweet(e)});
    loadIndex();
    $root.on("click", ".like", function(e) {likeTweet(this.id)});;
    $root.on("click", ".retweet", function (e) {retweetTweet(this.id);});
    $root.on("click", "#reply", function (e) {replyHandler(e);});
    return true;
});

async function loadIndex() {
    $('#tweets').remove();
    let index = await getIndex();
    let data = index.data
    console.log(data);
    let $root = $('#root');
    let $indexAppend = $("<div id='tweets' class='container'>")
    data.map(element => {
        switch(element.type){
            case 'tweet':
                $indexAppend.append("<div id='"+element.id+"' class='message'><div class='message-header'><h1>"+element.author+"</h1></div><p>"+element.body+"</p><p id='likeCount'>"+element.likeCount +"  " + element.retweetCount+ "</p><button id='"+element.id+"'class='like button "+ checkIsMyLike(element) +"'>Like</button><button id='reply' class='button'>Reply</button><button id='"+element.id+"' class='retweet button'>Retweet</button></div>");
                break;
            case 'retweet':
                break;
            case 'reply':
                break;
            default:
                break;
        }
    });
    $root.append($indexAppend);
    return true;    
}


function checkIsMyLike(element){
    if(element.isLiked){return "is-danger"}
    return null;
}
function refresh(){
    loadIndex();
    let $root = $('#root');
    return true;
}

async function getIndex() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
        });
        return result
    } catch(error) {
        return error;
    }
}

async function createHandler(e){
    $('#createForm').remove();
    let $createBody = $('#tweets').prepend("<div id='createForm' class='field-body'><div class='field'><div class='control'><textarea id='createTextInput' class='textarea' placeholder='Insert tweet here'></textarea></div></div></div>");
    $('#createForm').append("<div class='field is-horizontal'><div class='field-label'></div><div class='field-body'><div class='field'><div class='control'><button id='createInput' class='button is-primary'>Send message</button></div></div></div>");
    $('#createInput').on("click", async function(e){
        try{
            const result = await axios({
                method: 'post',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
                withCredentials: true,
                data: {
                  body: $('#createTextInput').val()
                },
              });
            return result;
        } catch(error){
            return error;
        }    
    });
}

async function readTweet(e){
    console.log(e);
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/12',
        withCredentials: true,
    });
    return true;
}

async function likeTweet(id){
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id+'/like',
        withCredentials: true,
    });
    refresh();
}

async function retweetTweet(id){
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": id,
          "body": "My father had it, I have it, and my twin sister has it."
        },
    });
    refresh();
}

function replyHandler(e){
    console.log('reply');
}