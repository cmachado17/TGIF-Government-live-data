var app = new Vue({
  el: '#app',
  data: {
      member: {},
  }
});
    if (page == "datas"){
      fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
          headers: {
              'X-API-Key': "KXuuIw4yUeCBex8k7vQQP4qWvR4LW5sFXiMEs7Gf"
    
        }
      })
          .then(Response => Response.json())
          .then(datos => {
              this.app.member = datos.results[0].members
              console.log(app.member);
          });
        } else{
            fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
                headers: {
                    'X-API-Key': "KXuuIw4yUeCBex8k7vQQP4qWvR4LW5sFXiMEs7Gf"
          
              }
            })
                .then(Response => Response.json())
                .then(datos => {
                    this.app.member = datos.results[0].members
                    console.log(app.member);
                });    
        }

          