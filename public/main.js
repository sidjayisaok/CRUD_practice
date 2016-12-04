//setting update request
var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function(){
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Joe Blow',
            'quote': 'Trumps election was the biggest fuck you ever recorded in human history.'
        })
    }).then(function(response){
            if(response.ok) return response.json()
        }).then(function(data){
            console.log(data);
            window.location.reload(true);
        })
    });


del.addEventListener('click', function(){
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Donald Trump'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload(true)
  })
});
