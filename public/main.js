//setting update request
let update = document.getElementById('update');

update.addEventListener('click', function(){
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Joe Blow',
            'quote': 'Trumps election was the biggest fuck you ever recorded in human history.'
        }).then(response =>{
            if(response.ok) return response.json()
        }).then(data =>{
            console.log(data);
            window.location.reload(true);
        })
    })
});