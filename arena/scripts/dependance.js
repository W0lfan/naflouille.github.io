let switchSlider = 1;
let slided = 0;

window.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#Resources').addEventListener('click',function() {
        window.scrollTo({top:0,behavior:"smooth"});
        fetch("workspaces/resources.txt")
        .then(response => response.text())
        .then(htmlContent => {
            document.querySelector('.main-container').innerHTML = htmlContent;
        });
        window.scrollTo({top:0,behavior:"smooth"});
    });


    document.querySelector('#Updates').addEventListener('click',function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetch("workspaces/updates.txt")
            .then(response => response.text())
            .then(htmlContent => {
                document.querySelector('.main-container').innerHTML = htmlContent;
                let updates = document.querySelectorAll('.update');
                let i = 0.5;
                for (let update of updates) {
                    update.style.animationDelay = i + 's';
                    update.classList.add('updt');
                    i += 0.3;
                }
                setTimeout(() => {
                    document.querySelector('.updates-linear .line').animate(
                        [
                            { height: "0px" },
                            { height: (document.body.offsetHeight - 125) + "px" }
                        ],
                        {
                            duration: 5000,
                            fill: "forwards"
                        }
                    );
                }, 2500);
            });
        window.scrollTo({ top: 0, behavior: "smooth" });
    });



    document.querySelector('#Home').addEventListener('click',function() {

        let slide_titles = [
            "Understandable UIs",
            "Comprehensive Discord Server",
            "Clear Codes",
            "Ship Armadas",
            "Unusual Duels",
            "All-knowing Terminal",
            "All Game Statistics"
        ]


        fetch("workspaces/home.txt")
        .then(response => response.text())
        .then(htmlContent => {
            document.querySelector('.main-container').innerHTML = htmlContent;
            switchSlider = 1;
            document.querySelector('.screenshot-title').innerHTML = slide_titles[switchSlider - 1];
            document.getElementById("switch_next").addEventListener('click', function() {
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).classList.remove('slide-left-start');
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).classList.add('slide-left');
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).style.zIndex = "1";
                if (switchSlider < 7) {
                    switchSlider++;
                } else {
                    switchSlider = 1;
                }
                document.querySelector('.screenshot-title').innerHTML = slide_titles[switchSlider - 1];
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).classList.remove('slide-left');
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).classList.add('slide-left-start');
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).style.opacity = "1";
                document.querySelector(`.screenshots img:nth-child(${switchSlider})`).style.zIndex = "2";
            });
            function Slide() {
                setTimeout(() => {
                    const switchNextElement = document.querySelector('#switch_next');
                    const clickEvent = new Event('click');
                    switchNextElement.dispatchEvent(clickEvent);
                    Slide();
                }, 10000);
            }
            if(!slided) {
                Slide();
                slided = true;
            }
            function animatePopup() {
                const spans = document.querySelectorAll("#sentence span");
                let delay = 0;
                spans.forEach((span) => {
                  span.animate([
                    {
                        opacity : 0,
                    }, {
                        opacity:1
                    }
                  ], {duration : 500, fill:"forwards",delay:delay})
            
                  delay += 100; // 0.1s in milliseconds
                });
              }
              animatePopup()
        });
        window.scrollTo({top:0,behavior:"smooth"});


    });


    document.getElementById('download-lastest').addEventListener('click',function() {
        fetch("workspaces/download.txt")
        .then(response => response.text())
        .then(htmlContent => {
            document.querySelector('.main-container').innerHTML = htmlContent;
            let versions = document.querySelectorAll('.version');

            let names = [];
            let status = ["stable","latest","beta"]
            let i = 0;

            for (let ver of versions) {
                names.push(`STF ${ver.id} - ${VERSIONS[ver.id]}.txt`);
                ver.querySelector('.title .name .spec').innerHTML = VERSIONS[status[i]];
                i++;
            }

            function DownLoad(url, name) {
                fetch(url)
                .then(response => response.text())
                .then(data => {
                        var fileContent = data;
                        var fileName = name;

                        
                        var fileBlob = new Blob([fileContent], { type: 'text' });
        
                        var downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(fileBlob);
                        downloadLink.download = fileName;
                        downloadLink.click();
        
                        URL.revokeObjectURL(downloadLink.href);
                })
                .catch(error => {
                    console.error('Error fetching file:', error);
                    alert('An error occured. Please join the Discord server in order to report it.')
                });
            }
            document.querySelector('#stable').addEventListener("click",function(){
                DownLoad('https://raw.githubusercontent.com/W0lfan/STF/main/main/stable.js',`STF Stable - ${VERSIONS["stable"]}.txt`)
            })
            document.querySelector('#latest').addEventListener("click",function(){
                DownLoad('https://raw.githubusercontent.com/W0lfan/STF/main/main/latest.js',`STF Latest - ${VERSIONS["latest"]}.txt`)
            });
            document.querySelector('#beta').addEventListener("click",function(){
                DownLoad('https://raw.githubusercontent.com/W0lfan/STF/main/archives/main/Starbast%20Arena%20Version%201-09.js',`STF Beta (SA).txt`)
            });
        });
        window.scrollTo({top:0,behavior:"smooth"});
    });
    document.getElementById('Home').click();

    document.querySelector('#Contributions').addEventListener('click',function() {
        fetch("workspaces/contributions.txt")
        .then(response => response.text())
        .then(htmlContent => {
            document.querySelector('.main-container').innerHTML = htmlContent;
        });
        window.scrollTo({top:0,behavior:"smooth"});
    });

    
})
