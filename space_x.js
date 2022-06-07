var url = "https://api.spacexdata.com/v3/launches?limit=100";
var years = [];
var button = [];
var response;
var data=[];
var path="";
var body = document.querySelector("body");
body.style.width = window.innerWidth;
var url1 = "https://api.spacexdata.com/v3/launches?limit=100";
var ifConnected=window.navigator.onLine;
if(!ifConnected){
  body.style.height="600px";
  var body=document.querySelector("body");
  body.innerHTML="";
  var img=document.createElement("img");
  img.src="interneterror.jpg";
  document.body.appendChild(img);
  body.className="noInternet";
}
else{
//document.querySelector("#launch").launch.addEventListener("click",successfulLaunch);

async function createButtons() {
  await fetchData(url);

  for (var i = 0; i < data.length; i++) {
    years.push(`${data[i].launch_year}`);
  }

  for (var i = 0; i < years.length; i++) {
    if (years[i] != -1) {
      button.push(years[i]);
      for (var j = i + 1; j < years.length; j++) {
        if (years[i] == years[j]) {
          years[j] = -1;
        }
      }
    }
  }
  for (var i = 0; i < button.length; i++) {
    var x = document.querySelector(".img-div");
    var button1 = document.createElement("button");
    button1.innerHTML = `${button[i]}`;
    button1.addEventListener("click", clicked);
    x.appendChild(button1);
  }
  //x.addEventListener("click",clicked);
}
createButtons();
document.querySelector(".launch_success").addEventListener("click", successfulLaunch);
document.querySelector(".landing_success").addEventListener("click", successfullanding);


//get imgs function

function getimgs() {

  //response = await fetch(url);
//  data = await (response.json());
  console.log(data.length);
  var x = document.querySelector(".img-div1");
  if (data.length <= 0) {
    var nodata = document.createElement("h2");
    nodata.style.color = "red";
    nodata.innerHTML = "No Data Found";
    x.appendChild(nodata);
  }

  for (var i = 0; i < data.length; i++) {
    //flight container
    var x1 = document.createElement("div");
    x1.id = "img-Divs";
    // image in container
    var img = document.createElement("img");
    img.src = `${data[i].links.mission_patch_small}`;
    img.style.width = "100px";
    img.style.height = "100px";
    x1.appendChild(img);
    // filght title
    var h3 = document.createElement("h3");
    h3.innerHTML = `${data[i].mission_name} # ${data[i].flight_number}`;
    h3.style.color = "lightblue";
    x1.appendChild(h3);
    x.appendChild(x1);
    var h3_1 = document.createElement("h3");
    h3_1.innerHTML = "Mission id's";
    x1.appendChild(h3_1);
    x.appendChild(x1);
    ul = document.createElement("ul");

    li = document.createElement("li");
    if (`${data[i].mission_id.length}` > 0) {
      li.innerHTML = `${data[i].mission_id}`;
    } else {
      li.innerHTML = "{list Mission Id's}";
    }
    li.style.color = "lightblue";
    ul.appendChild(li);
    x1.appendChild(ul);
    x.appendChild(x1);
    h3_2 = document.createElement("h3");
    h3_2.innerHTML = "Launch Year";
    span = document.createElement("span");
    span.innerHTML = `::${data[i].launch_year}`;
    span.style.color = "lightblue";
    h3_2.appendChild(span);
    x1.appendChild(h3_2);
    x.appendChild(x1);
    h3_3 = document.createElement("h3");
    h3_3.innerHTML = "Success Launch";
    span = document.createElement("span");
    span.innerHTML = `::${data[i].launch_success}`;
    span.style.color = "lightblue";
    h3_3.appendChild(span);
    x1.appendChild(h3_3);
    x.appendChild(x1);
    h3_4 = document.createElement("h3");
    h3_4.innerHTML = "Success Landing";
    span = document.createElement("span");
    span.innerHTML = `::${data[i].rocket.first_stage.cores[0].land_success}`;
    span.style.color = "lightblue";
    h3_4.appendChild(span);
    x1.appendChild(h3_4);
    x.appendChild(x1);
  }
}
//getimgs(url);
async function clicked(e) {
  var x = document.querySelector(".img-div1");
  x.innerHTML = "";
  //alert(e.target.textContent);
  url = `https://api.spacexdata.com/v3/launches?limit=100&launch_year=${e.target.textContent}`;
  console.log(url);
  path=`?launch_year=${e.target.textContent}`;
  fetchData(url);

}

function successfulLaunch(e) {
  var x = document.querySelector(".img-div1");
  x.innerHTML = "";
  url1 = `${url}&launch_success=${e.target.textContent}`;
  console.log(url1);
  fetchData(url1);
}
function successfullanding(e) {
  var x = document.querySelector(".img-div1");
  x.innerHTML = "";
  url2 = `${url1}&land_success=${e.target.textContent}`;
  console.log(url2);
  fetchData(url2);
}

async function fetchData(url) {
  response = await fetch(url)
  data = await (response.json());
    getimgs();
}
function pathChange(path){

}
}
