$(document).ready(() => {
  showMovies(0);
});

$(".menu-icon").click((e) => {
  let navBodyWidht = $(".nav-body").innerWidth();
  let navHeaderLeft = $(".nav-header").offset().left;

  if (navHeaderLeft == 0) {
    $(".nav-body").animate({ left: "0" });
    $(".nav-header").animate({ left: `${navBodyWidht}` });

    $(".nav-content ul li").eq(0).animate({ padding: 0, opacity: 1 }, 1000);
    $(".nav-content ul li").eq(1).animate({ padding: 0, opacity: 1 }, 1100);
    $(".nav-content ul li").eq(2).animate({ padding: 0, opacity: 1 }, 1200);
    $(".nav-content ul li").eq(3).animate({ padding: 0, opacity: 1 }, 1300);
    $(".nav-content ul li").eq(4).animate({ padding: 0, opacity: 1 }, 1400);
    $(".nav-content ul li").eq(5).animate({ padding: 0, opacity: 1 }, 1500);

    $(".menu-icon i").addClass("fa-x");
    $(".menu-icon i").removeClass("fa-bars");
  } else {
    $(".nav-body").animate({ left: `-${navBodyWidht}` });
    $(".nav-header").animate({ left: "0" });
    $(".nav-content ul li").animate({ paddingTop: 500, opacity: 0 });
    $(".menu-icon i").removeClass("fa-x");
    $(".menu-icon i").addClass("fa-bars");
  }
});

// https://image.tmdb.org/t/p/original/
//movie/ + "now_playing" - "popular" - "top_rated" - "upcoming"
//trending/movie/week

//https://api.themoviedb.org/3/search/movie?api_key=4f6d7634d187033370dff805475982d8&language=en-US&query=

async function getMovies(type) {
  let res = await fetch(
    `https://api.themoviedb.org/3/${type}?api_key=4f6d7634d187033370dff805475982d8&language=en-US`
  );
  let finalRes = await res.json();
  return finalRes.results;
}
async function getSearchMovies(movie) {
  let res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4f6d7634d187033370dff805475982d8&language=en-US&query=${movie}`
  );
  let finalRes = await res.json();
  return finalRes.results;
}

async function showMovies(type) {
  let movieType = [
    "movie/now_playing",
    "movie/popular",
    "movie/top_rated",
    "trending/movie/week",
    "movie/upcoming",
  ];
  let movies = await getMovies(movieType[type]);
  let container = "";
  let movieImgURl = "https://image.tmdb.org/t/p/original/";

  for (let i = 0; i < movies.length; i++) {
    container += `<div class="item overflow-hidden col-lg-4 col-md-6">
              <div class="position-relative">
                <img
                  src="${movieImgURl + movies[i].poster_path}"
                  alt=""
                  class="w-100"
                />
                <div class="move-content">
                  <div>
                    <h2>${movies[i].original_title}</h2>
                    <p>
                      ${movies[i].overview}
                    </p>
                    <p>${movies[i].vote_average}</p>
                    <p>${movies[i].release_date}</p>
                  </div>
                </div>
              </div>
            </div>`;
  }

  document.querySelector(".movies .movies-items div").innerHTML = container;
  // $('.movies .movies-items div').html(container) //the randering slower than the innerHTML

  $(".search-by").keyup(() => {
    container = "";
    let regex = /^[a-zA-Z 1-9]{2,}/gim;
    if (regex.test($(".search-by").val())) {
      for (let i = 0; i < movies.length; i++) {
        let fond = movies[i].original_title
          .toLowerCase()
          .includes($(".search-by").val().toLowerCase());

        if (fond) {
          container += `<div class="item overflow-hidden col-lg-4 col-md-6">
              <div class="position-relative">
                <img
                  src="${movieImgURl + movies[i].poster_path}"
                  alt=""
                  class="w-100"
                />
                <div class="move-content">
                  <div>
                    <h2>${movies[i].original_title}</h2>
                    <p>
                      ${movies[i].overview}
                    </p>
                    <p>${movies[i].vote_average}</p>
                    <p>${movies[i].release_date}</p>
                  </div>
                </div>
              </div>
            </div>`;
          document.querySelector(".movies .movies-items div").innerHTML =
            container;
        }
      }
    } else if ($(".search-by").val() == "") {
      showMovies(type);
    }
  });
}

$(".search-for").keyup(async () => {
  container = "";
  let regex = /^[a-zA-Z 1-9]{2,}/gim;
  if (regex.test($(".search-for").val())) {
    let movies = await getSearchMovies($(".search-for").val());
    let container = "";
    let movieImgURl = "https://image.tmdb.org/t/p/original/";

    for (let i = 0; i < movies.length; i++) {
      container += `<div class="item overflow-hidden col-lg-4 col-md-6">
              <div class="position-relative">
                <img
                  src="${movieImgURl + movies[i].poster_path}"
                  alt=""
                  class="w-100"
                />
                <div class="move-content">
                  <div>
                    <h2>${movies[i].original_title}</h2>
                    <p>
                      ${movies[i].overview}
                    </p>
                    <p>${movies[i].vote_average}</p>
                    <p>${movies[i].release_date}</p>
                  </div>
                </div>
              </div>
            </div>`;
    }

    document.querySelector(".movies .movies-items div").innerHTML = container;
  } else if ($(".search--for").val() == "") {
    showMovies(0);
  }
});

$("nav .nav-content li a").click((e) => {
  let elements = $("nav .nav-content li a");
  for (let i = 0; i < elements.length - 1; i++) {
    if (elements[i] == e.target) {
      showMovies(i);
    }
  }
});

// inputs validation
// name
$("#contact-us form input")
  .eq(0)
  .keyup((e) => {
    e.preventDefault();
    let regex = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/gim;
    if (regex.test($("#contact-us form input").eq(0).val())) {
      $("#namealert").css({ display: "none" });
    } else {
      $("#namealert").css({ display: "block" });
    }
  });

//email
$("#contact-us form input")
  .eq(1)
  .keyup((e) => {
    e.preventDefault();
    let regex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (regex.test($("#contact-us form input").eq(1).val())) {
      $("#emailalert").css({ display: "none" });
    } else {
      $("#emailalert").css({ display: "block" });
    }
  });

//number
$("#contact-us form input")
  .eq(2)
  .keyup((e) => {
    e.preventDefault();
    let regex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (regex.test($("#contact-us form input").eq(2).val())) {
      $("#phonealert").css({ display: "none" });
    } else {
      $("#phonealert").css({ display: "block" });
    }
  });

//age
$("#contact-us form input")
  .eq(3)
  .keyup((e) => {
    e.preventDefault();
    let age = $("#contact-us form input").eq(3).val();
    if (age >= 0 && age <= 150) {
      $("#agealert").css({ display: "none" });
    } else {
      $("#agealert").css({ display: "block" });
    }
  });

//password
$("#contact-us form input")
  .eq(4)
  .keyup((e) => {
    e.preventDefault();
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regex.test($("#contact-us form input").eq(4).val())) {
      $("#passwordalert").css({ display: "none" });
    } else {
      $("#passwordalert").css({ display: "block" });
    }
  });

//repassword
$("#contact-us form input")
  .eq(5)
  .keyup((e) => {
    e.preventDefault();
    let regex = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (
      $("#contact-us form input").eq(5).val() ===
      $("#contact-us form input").eq(4).val()
    ) {
      console.log("right");
      $("#repasswordalert").css({ display: "none" });
    } else {
      $("#repasswordalert").css({ display: "block" });
    }
  });

// clear inputs
$("#contact-us form button").click(() => {
  $("#contact-us form input").val("");
});
