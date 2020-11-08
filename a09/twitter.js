$( document ).ready( async function() {
    let $root = $('#root');
    $root.append("<button id='createTweet' class='button'>Create</button>");
    $root.on("click", "#createTweet", function (e) {createHandler(e);});
    let index = await getIndex();
    $root.append(loadIndex(index.data));
    return $root;
});

function loadIndex(index) {
    let $root = $('#root');
    let $indexAppend = $("<div id='tweets' class='container'>")
    index.map(element => {
        $indexAppend.append("<div class='message'><div class='message-header'><h1>"+element.author+"</h1></div><p>"+element.body+"</p><p>"+element.likeCount+"</p><button id='like' class='button'>Like</button><button id='reply' class='button'>Reply</button><button id='retweet' class='button'>Retweet</button></div>");
    });
    $root.on("click", "#like", function (e) {likeHandler(e);});
    $root.on("click", "#retweet", function (e) {retweetHandler(e);});
    $root.on("click", "#reply", function (e) {replyHandler(e);});
    return $indexAppend;    
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

function likeHandler(e){
    console.log(e);
}

function retweetHandler(e){
    console.log('retweet');
}

function replyHandler(e){
    console.log('reply');
}