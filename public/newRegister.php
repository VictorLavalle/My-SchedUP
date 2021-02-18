<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>New User Register</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/Cool-Navbar.css">
    <link rel="stylesheet" href="assets/css/Profile-Edit-Form.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <header class="header-nav">
        <nav class="navbar navbar-light navbar-expand-md fixed-top text-capitalize bg-inverse scrolling-navbar"
            id="main-navbar">
            <div class="container"><a class="navbar-brand" href="index.php"><img id="brand-image"
                        src="assets/img/Main/Logo.png"></a><button data-toggle="collapse" class="navbar-toggler"
                    data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span
                        class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navcol-1">
                    <ul class="nav navbar-nav mr-auto w-100 justify-content-end">
                        <li class="nav-item" id="Home"><a class="nav-link" href="index.php">Home</a></li>
                        <li class="nav-item" id="ContainerSchedUP">
                            <p id="MySchedUP">My SchedUP</p>
                        </li>
                        <li class="nav-item" id="Team"><a class="nav-link" href="team.php">Team</a></li>
                        <li class="nav-item" id="Login"><a class="nav-link" id="Changelogin" href="login.php">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main class="main-login">
        <div class="container">
            <div class="container profile profile-view" id="profile">

                <form method="POST" enctype="multipart/form-data" name="myForm">
                    <div class="form-row profile-row">
                        <div class="col-md-4 relative">
                            <div class="avatar">
                                <div class="avatar-bg center"></div>
                            </div><input type="file" class="form-control" name="avatar-file" id="imgInput">
                            <p id="dragText"><strong>Select or drop here your file</strong></p>
                        </div>
                        <div class="col-md-8">
                            <h1>Profile </h1>
                            <hr>
                            <div class="form-row">

                                <!--Input First name-->
                                <div class="col-sm-12 col-md-6">
                                    <div class="form-group"><label>Firstname </label><input class="form-control"
                                            type="text" name="name" id="firstName" required></div>
                                    <!--Notification first name-->
                                    <div id="Invalidname">

                                    </div>

                                </div>


                                <!--Input Last Name-->
                                <div class="col-sm-12 col-md-6">
                                    <div class="form-group" id="lName"><label>Lastname </label><input
                                            class="form-control" type="text" name="lastname" id="lastName" required>
                                    </div>
                                    <!--Notification LastName-->
                                    <div id="Invalidlastname">

                                    </div>

                                </div>


                            </div>

                            <!--Input Email-->
                            <div class="form-group" id="emailForm"><label>Email </label>
                                <input class="form-control" id="email" type="email" autocomplete="off" required=""
                                    name="email" placeholder="user@exampledomain.com" required>
                            </div>

                            <!--Notification Email-->
                            <div id="Invalidemail">

                            </div>

                            <!--Input Password-->
                            <div class="form-row">
                                <div class="col-sm-12 col-md-6">
                                    <div class="form-group" id="passwordForm">
                                        <label>Password </label><input class="form-control" id="password"
                                            type="password" name="password1" autocomplete="off" required=""
                                            placeholder="*********" maxlength="16" required>
                                    </div>
                                    <!--Notification Password-->
                                    <div id="Invalidpassword1">

                                    </div>
                                </div>


                                <!--Input Confirm Password-->
                                <div class="col-sm-12 col-md-6">
                                    <div class="form-group" id="passwordConfirmForm">
                                        <label>Confirm Password</label><input class="form-control" id="passwordConfirm"
                                            type="password" name="password2" autocomplete="off" required=""
                                            placeholder="*********" maxlength="16">
                                    </div>
                                    <!--Notification Confirm Password-->
                                    <div id="Invalidpassword2">

                                    </div>

                                </div>


                                <!--Notification Passwords-->
                                <div id="InvalidPasswords">

                                </div>

                            </div>
                            <hr>
                            <div class="form-row">
                                <div class="col-md-12 content-right">
                                    <input class="btn btn-primary form-btn" id="Register-Button" name="register"
                                        type="button" value="SAVE">
                                    <button class="btn btn-danger form-btn" id="Cancel-Button" type="reset" onclick="CancelBTN()">CANCEL
                                    </button></div>
                            </div>
                        </div>
                    </div>


                </form>
                <p id="terms" class="termsConditions">By registering you accept our&nbsp;<a href="#">Terms and
                        Conditions</a></p>
            </div>
        </div>
    </main>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/Cool-Navbar.js"></script>
    <script src="assets/js/Profile-Edit-Form.js"></script>
    <script src="assets/js/Register.js"></script>

</body>

</html>