$( document ).ready(function() {
    let $root = $('#root');
    $root.append("<div class='container'><div class='level mt-2 mb-2'><h1 id='twitterTitle' class='title is-3 level-left'>Twitter</h1><button id='createTweet' class='level-right button is-primary'>Create</button></div>");
    $root.on("click", "#createTweet", function (e) {createHandler(e)});
    loadIndex();
    $root.on("click", ".like", function(e) {likeTweet(this.id)});;
    $root.on("click", ".retweet", function (e) {retweetTweet(this.id);});
    $root.on("click", ".reply", function (e) {replyHandler(this.id);});
    $root.on("click", ".editTweet", function (e) {editTweet(this.id)});
    $root.on("click", ".deleteTweet", function(e){deleteTweet(this.id)})
    return true;
});

async function loadIndex() {
    $('#tweets').remove();
    let data = await getIndex();
    data = data.data;
    console.log(data)
    let $root = $('#root');
    let $indexAppend = $("<div id='tweets' class='container'>")
    $root.append($indexAppend);
    let counter = 0;
    while(counter < data.length){
        let type = data[counter].type;
        let tweet = await readTweet(data[counter].id);
        tweet = tweet.data;
        let ogTweet = tweet;
        if(type == 'tweet'){
            $indexAppend.append("<div id='"+tweet.id+"' class='message'><div class='message-header'><h1>"+tweet.author+"</h1></div><p class='tweetBody'>"+tweet.body+"</p><p id='likeCount'>"+tweet.likeCount +"  " + tweet.retweetCount+ "</p><button id='"+tweet.id+"'class='like button "+ checkIsMyLike(tweet) +"'>Like</button><button id='"+tweet.id+"' class='reply button'>Reply</button><button id='"+data[counter].id+"' class='retweet button'>Retweet</button>");
            if(tweet.replies){
                tweet.replies.forEach(element =>{
                    $('#'+tweet.id).append("<div class='container'><h1 id='replyTitle'><strong>"+element.author+"</strong></h1><p>"+element.body+"</p>")
                })
            }
        }else if(type == 'retweet'){
            let $retweetAppend = $("<h1 class='retweetTitle title is-5'>"+tweet.author+" Retweeted</h1>");
            $retweetAppend.append("<h2>"+tweet.body+"</h2>");
            while(tweet.parent != null){
                tweet = tweet.parent;
            }
            $retweetAppend.append("<div class='container'><div id='"+tweet.id+"' class='message'><div class='message-header'><h1>"+tweet.author+"</h1></div><p>"+tweet.body+"</p><p id='likeCount'>"+tweet.likeCount +"  " + tweet.retweetCount+ "</p><button id='"+tweet.id+"'class='like button "+ checkIsMyLike(tweet) +"'>Like</button><button id='"+tweet.id+"' class='reply button'>Reply</button><button id='"+data[counter].id+"' class='retweet button'>Retweet</button>");
            $indexAppend.append($retweetAppend);
        }else if(type == 'reply'){
            let $replyAppend = $("<h1 class='replyTitle title is-5'>"+tweet.author+" Replied</h1>");
            $replyAppend.append("<h2>"+tweet.body+"</h2>");
            while(tweet.parent != null){
                tweet = tweet.parent;
            }
            $replyAppend.append("<div class='container'><div id='"+tweet.id+"' class='message'><div class='message-header'><h1>"+tweet.author+"</h1></div><p>"+tweet.body+"</p><p id='likeCount'>"+tweet.likeCount +"  " + tweet.retweetCount+ "</p><button id='"+tweet.id+"'class='like button "+ checkIsMyLike(tweet) +"'>Like</button><button id='"+tweet.id+"replyBut' class='reply button'>Reply</button><button id='"+data[counter].id+"' class='retweet button'>Retweet</button>");
            $indexAppend.append($replyAppend);
        }
        if(ogTweet.isMine){
            $('#'+tweet.id).append("<button id='"+ogTweet.id+"' class='editTweet button'>Edit</button><button id='"+ogTweet.id+"' class='deleteTweet button'>Delete</button>")
        }
        counter++;
    }
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
async function loadIndex2(){
    const data = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    const result = await data
    return result
}
function getIndex(){
    let data = loadIndex2();
    return data
}

async function updateTweet(id, body){
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
        data: {
            body: body
        },
    });
    refresh();
}

async function createHandler(e){
    if($('#createForm').length == 0){
        $("<div class='submit-create field'><div class='control'><button id='createInput' class='button is-primary mr-2'>Send message</button><button id='cancelCreate' class='button is-light'>Cancel</button></div></div>").prependTo('#tweets');
        $("<div id='createForm' class='field-body mb-2'><div class='field'><div class='control'><textarea id='createTextInput' class='textarea' placeholder='Insert tweet here'></textarea></div></div></div>").prependTo('#tweets');
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
        $('#cancelCreate').on("click", ()=>{
            $('#createForm').remove();
            $('.submit-create').remove();

        })
    }
}

async function fetchTweet(id){
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });
    const ret = await result;
    return ret
}

function readTweet(id){
    let tweet = fetchTweet(id);
    return tweet;
}

async function likeTweet(id){
    let data = await readTweet(id)
    if(data.data.isLiked){
        return unLikeTweet(id);
    }
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id+'/like',
        withCredentials: true,
    });
    refresh();
    return result;
}

async function unLikeTweet(id){
    const result = await axios({
        method: 'put',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id+'/unlike',
        withCredentials: true,
      });
    refresh();
    return result;
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
async function editTweet(id){
    let tweet = await readTweet(id);
    if($('#editInput').length == 0){
        $('<textarea id="editInput">'+tweet.data.body+'</textarea><button id="editButton" class="button">Submit</button>').insertAfter('#'+id);
        $('#root').on("click", "#editButton", (e)=>{
            e.preventDefault();
            updateTweet(id, $('#editInput').val());
        })
    }
}
function replyHandler(id){
    if($('#replyInput').length == 0){
        $('#'+id).append('<form><input id="replyInput"></input><button id="submitReply">Submit</button></form>')
        $('#root').on('click', "#submitReply", (e)=>{
            e.preventDefault();
            submitReply(id, $('#replyInput').val());
        })
    }
}

async function submitReply(id, body){
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": id,
          "body": body
        },
      });
      refresh();
      return true;
}

async function deleteTweet(id){
    const result = await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });
    refresh();
    return true;
}