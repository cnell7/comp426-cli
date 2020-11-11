$( document ).ready(async function() {
    let $root = $('#root');
    $root.append("<button id='createTweet' class='button'>Create</button>");
    $root.on("click", "#createTweet", function (e) {createHandler(e)});
    loadIndex();
    $root.on("click", ".like", function(e) {likeTweet(this.id)});;
    $root.on("click", ".retweet", function (e) {retweetTweet(this.id);});
    $root.on("click", "#reply", function (e) {replyHandler(e);});
    return true;
});

async function loadIndex() {
    $('#tweets').remove();
    let index = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });;
    let data = index.data
    console.log(data);
    let $root = $('#root');
    let $indexAppend = $("<div id='tweets' class='container'>")
    data.map(async function(element){
        let type = element.type;
        if(type == 'tweet'){
            let tweet = await axios({
                method: 'get',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+element.id,
                withCredentials: true,
            });
            tweet = tweet.data;
            $indexAppend.append("<div id='"+tweet.id+"' class='message'><div class='message-header'><h1>"+tweet.author+"</h1></div><p>"+tweet.body+"</p><p id='likeCount'>"+tweet.likeCount +"  " + tweet.retweetCount+ "</p><button id='"+tweet.id+"'class='like button "+ checkIsMyLike(tweet) +"'>Like</button><button id='reply' class='button'>Reply</button><button id='"+element.id+"' class='retweet button'>Retweet</button>");
        }else if(type == 'retweet'){
            let tweet = await axios({
                method: 'get',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+element.id,
                withCredentials: true,
            });
            tweet = tweet.data;
            let $retweetAppend = $("<h1 class='title is-5'>"+tweet.author+" Retweeted</h1>");
            $retweetAppend.append("<h2>"+tweet.body+"</h2>");
            while(tweet.parent != null){
                tweet = tweet.parent;
            }
            $retweetAppend.append("<div class='container'><div id='"+tweet.id+"' class='message'><div class='message-header'><h1>"+tweet.author+"</h1></div><p>"+tweet.body+"</p><p id='likeCount'>"+tweet.likeCount +"  " + tweet.retweetCount+ "</p><button id='"+tweet.id+"'class='like button "+ checkIsMyLike(tweet) +"'>Like</button><button id='reply' class='button'>Reply</button><button id='"+element.id+"' class='retweet button'>Retweet</button>");
            $indexAppend.append($retweetAppend);
        }else if(type == 'reply'){
            
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
    return true;
}

function getIndex() {
    return new Promise((resolve, reject) =>{
        try {
            const result = axios({
                method: 'get',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
                withCredentials: true,
            });
            resolve(result);
        } catch(error) {
            reject(error);
    }})
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
            refresh();
            return result;
        } catch(error){
            return error;
        }    
    });
}

function readTweet(id){
    return new Promise((resolve, reject) =>{
        try{
            const result = axios({
                method: 'get',
                url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id,
                withCredentials: true,
            });
            resolve(result);
        } catch(error){
            reject(error);
        }
    });
}

async function likeTweet(id){
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id+'/like',
        withCredentials: true,
    });
    refresh();
}

function retweetTweet(id){
    if($('#retweetInput').length == 0){
        $('#'+id).append('<form><input id="retweetInput"></input><button id="submitRetweet">Submit</button></form>')
        $('#root').on('click', "#submitRetweet", (e)=>{
            e.preventDefault();
            submitRetweet(id, $('#retweetInput').val());
        })
    }
}
async function submitRetweet(id, body){
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": id,
          "body": body
        },
    });
    refresh();
}
function replyHandler(e){
    console.log('reply');
}