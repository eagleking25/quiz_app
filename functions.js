$(document).ready(
    () => {
        quizes();
        quizes = () => {
            let html = '';
            $.ajax({
                method: "GET",
                url: "http://localhost:3000/quiz/",
                success: (data) => {
                    for (let i = 1; i < data.length + 1; i++) {
                        html += `<tr>
<th scope="row">${i}</th>
<td>${date[i-1]['title']}</td>
<td><button value='${date[i-1]['id']}' id='edit'>EDIT</button></td>
<td><button value='${date[i-1]['id']}' id='take'>TAKE</button></td>
</tr>`
                    }


                }
            });
            console.log(html);
            $('#quizlog').val(html);
        }

        function quizid() {
            $.ajax({
                method: "GET",
                url: "http://localhost:3000/quiz/",
                success: (data) => {
                    $('#quiztitle').html(data[data.length - 1]['title']);
                    $('#qid').val(data.length);

                }
            });
        }
        $('#adder').on('submit', (e) => {
            e.preventDefault();
            let qid = $('#qid').val();
            let ques1 = $('#ques1').val();
            let ropt = $('#ropt').val();
            let opt1 = $('#1opt').val();
            let opt2 = $('#2opt').val();
            let opt3 = $('#opt3').val();
            let data = { qid, ques1, ropt, opt1, opt2, opt3 };
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/questions",
                dataType: 'JSON',
                data: data,
                success: () => {
                    $('#good').show();
                    $('#alertcg').html('Question added!');
                    $('#ques1').val('');
                    $('#qid').val(qid);
                    $('#1opt').val('');
                    $('#2opt').val('');
                    $('#3opt').val('');
                    $('#ropt').val('');
                }
            })
        });
        $('#ques1').on('change', e => {
            $('#good').hide();
        });
        $('#next').on('submit', (e) => {
                e.preventDefault();
                let title = $('#title').val();
                let code = $('#code').val();
                let Category = $('#Category').val();
                let email = $('#useremail').val();
                let data = { title, code, Category, email };
                $.ajax({
                        method: "POST",
                        url: "http://localhost:3000/quiz",
                        dataType: 'JSON',
                        data: data,
                        success: () => {
                            $('#adder').show();
                            quizid();
                            $('#next').hide();
                        }


                    }

                )
            }

        );
        $('#sform').on('submit', (e) => {
            $('#error').hide();
            e.preventDefault();
            var dg = ['zero', 'one', 'two', 'three', 'four',
                'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
            ];
            if (dg[$('#authvalues').val()] === $('#auths').val()) {
                $('#error').hide();
                let fname = $('#fname').val();
                let lname = $('#lname').val();
                let phone = $('#phone').val();
                let email = $('#semail').val();
                let pwd = $('#spassword').val();
                let Category = $('#Category').val();
                $.ajax({
                    method: "GET",
                    url: "http://localhost:3000/access?email=" + email,
                    success: (data) => {
                        console.log(data);

                        if (data.length > 0) {
                            $('#error').show();
                            $('#alertc').html('Email Already exits!Please Login');
                        } else {

                            let data = { fname, lname, phone, Category, email, pwd };
                            $.ajax({
                                method: "POST",
                                url: "http://localhost:3000/access",
                                dataType: 'JSON',
                                data: data,
                                success: () => {
                                    window.location = './app/dashboard.html?email=' + email
                                }

                            })

                        }
                    }

                })

            } else {
                $('#error').show();
                $('#alertc').html('Invalid Authentication');
            }
        })
        $('#lform').on('submit', (e) => {
            e.preventDefault();
            var dg = ['zero', 'one', 'two', 'three', 'four',
                'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
            ];
            if (dg[$('#authvaluel').val()] === $('#authl').val()) {
                let email = $('#lemail').val();
                let pwd = $('#lpassword').val();
                $.ajax({
                    method: "GET",
                    url: "http://localhost:3000/access?email=" + email,
                    dataType: 'JSON',
                    success: (data) => {
                        if (data.length > 0) {
                            console.log(data[0]['pwd'] === pwd);
                            if (data[0]['pwd'] === pwd) {
                                window.location = './app/dashboard.html?email=' + email
                            } else {
                                $('#error').show();
                                $('#alertc').html('Invalid Password');
                            }
                        } else {
                            $('#error').show();
                            $('#alertc').html('Invalid Email');
                        }
                    }

                })

            } else {
                $('#error').show();
                $('#alertc').html('Invalid Authentication');
            }
        })
        let title = window.location.pathname.split('/');
        title = title[title.length - 1];
        title = title.replace('.html', '');
        if (title == 'index') { title = 'Home'; }
        console.log(title);
        $('title').html(`${title}-Eagle Quiz!`);
        $('#sform').on('submit')
        $('#coption').on('click',
            () => {
                $('#equiz').hide();
                $('#cquiz').show();
            })
        $('#eoption').on('click',
            () => {
                $('#equiz').show();
                $('#cquiz').hide();
            })
        $('#loption').on('click',
            () => {
                $('#sform').hide();
                $('#lform').show();
                auth();
            })
        $('#soption').on('click',
            () => {
                $('#sform').show();
                $('#lform').hide();
                auth();
            })

        function auth() {
            $('#error').hide();
            let xout = Math.floor(Math.random() * 20);
            var dg = ['zero', 'one', 'two', 'three', 'four',
                'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
            ];
            $('#auths').val(dg[xout]);
            $('#authl').val(dg[xout]);


            function checkout() {
                $('#authvalues').on('change', () => {

                    if ($('#authvalues').val() == xout) {

                        $('#signup').attr("disabled", "enabled");
                    } else {
                        $('#signup').attr("disabled", "enabled");
                        alert("" + +xout);
                    }

                })

            }
        }
        auth();

        var pos = document.location.toString().indexOf('=');
        if (pos !== -1) {
            var query = document.location
                .toString().split('').slice(pos + 1, document.location
                    .toString().split('').length);
            query = query.join('');
        }
        for (var i = 0; i < $("input[type='email']").length; i++) {
            document.getElementById($("input[type='email']")[i].id).value = query;

        }

    }


);




//get the 'index' query parameter