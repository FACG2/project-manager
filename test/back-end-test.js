const tape = require('tape');
const shot = require('shot');
const router = require('../src/routes.js');

tape('Home Route Test' , (t) => {
  shot.inject(router , {method: 'get' , url: "/"} , (res) => {
    t.equal(res.statusCode , 200 , "statusCode should equal 200");
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/addteam' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/tm' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/mem' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});

tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/addmember' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/deletemember' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/editteam' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/deleteteam' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/addproject' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/editproject' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/deleteproject' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/pj' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/addtask' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/edittask' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});


tape('Search Route Test' , (t) => {
  shot.inject(router , {method: 'post' , url: '/deletetask' , payload:"samerelaila"} , (res) => {
    t.equal( res.statusCode, 200 , 'should equal 200');
    t.equal(JSON.parse(res.payload).login.toLowerCase() , 'samerelaila' , 'should equal samerelaila');
    t.end();
  });
});



tape('Not Found Route (/404) Test' , (t) => {
  shot.inject(router , {method: 'get' , url: '/404'} , (res) => {
    t.equal(res.statusCode , 404 , 'should equal 404');
    t.end();
  });
});

tape('Css Request Test' , (t) => {
  shot.inject(router , {method: 'get' , url: '/css/style.css'} , (res) => {
    t.equal(res.statusCode ,200 ,'should equal 200' );
    t.end();
  });
});

tape('JS Request Test' , (t) => {
    shot.inject(router , {method: 'get', url: '/js/index.js'} , (res) =>{
      t.equal(res.statusCode , 200 , 'should equal 200');
      t.end();
    });
});
