var completed = document.getElementsByClassName("completed");
var trash = document.getElementsByClassName("fa-trash");
const item =document.querySelectorAll('.todoItem')

Array.from(item).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('messages', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbUp':thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(completed).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
        fetch('markComplete', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
        
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
        console.log(this.parentNode.childNodes)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name.trim(),
            
          })
        }).then(function (response) {
           window.location.reload()
        })
      });
});
