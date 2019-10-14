import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="form-popup">
                <div class="form-popup-headline secondary">
                    <h2>Login to your Account</h2>
                    <p>Enter now to your account and start buying and selling!</p>
                </div>
                <div class="form-popup-content">
                    <form id="login-form2">
                        <label for="emailAdress" class="rl-label">Email Adress</label>
                        <input type="email" id="username5" name="emailAdress" placeholder="Enter your email here..." />
                        <label for="password5" class="rl-label">Password</label>
                        <input type="password" id="password5" name="password5" placeholder="Enter your password here..." />
                        <input type="checkbox" id="remember2" name="remember2" checked />
                        <label for="remember2" class="label-check">
                            <span class="checkbox primary primary"><span></span></span>
                            Remember username and password
						</label>
                        <p>Forgot your password? <a href="#" class="primary">Click here!</a></p>
                        <button class="button mid dark">Login <span class="primary">Now!</span></button>
                    </form>
                    <hr class="line-separator double" />
                </div>
            </div>
        );
    }
}

export default Login;