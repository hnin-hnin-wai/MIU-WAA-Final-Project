import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { UserService } from "../../service/userservice"
import { useRef } from "react"
import { ROLES } from "../../constant/Roles"

const Login = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const loginHandler = (e) => {
        e.preventDefault();
        let data = formRef.current;
        let userInfo = {
            userName: data["username"].value,
            password: data["password"].value
        }
        UserService.login(userInfo).then(res => {
            if (UserService.isInRole(ROLES.ADMIN))
                navigate("/admin");
            if (UserService.isInRole(ROLES.CUSTOMER))
                navigate("/customer");
            if (UserService.isInRole(ROLES.OWNER))
                navigate("/owner");
        });
    }

    return <>
        <div class="page-header align-items-start min-vh-100">
            <div class="container my-auto">
                <div class="row">
                  <div class="col-lg-4 col-md-8 col-12 mx-auto">
                    <div class="card z-index-0 fadeIn3 fadeInBottom">
                      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-indigo-600 shadow-primary border-radius-lg py-3 pe-1">
                            <h4 className="text-xl text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                            <div class="row mt-3">
                                <div className="text-white font-weight-bolder text-center mt-3 mb-2">
                                    <p>Enter your email and password to start</p>
                                </div>
                            </div>
                        </div>
                      </div>
                        <div class="card-body">
                            <form role="form" ref={formRef} class="text-start">
                            <div class="input-group input-group-outline my-3">
                            {/* <label class="form-label">User Name</label> */}
                            <input type="text" placeholder="User name" name="username" class="form-control"/>
                          </div>
                          <div class="input-group input-group-outline mb-3">
                            {/* <label class="form-label">Password</label> */}
                            <input type="password" placeholder="password" name="password" class="form-control"/>
                          </div>
                          <div class="form-check form-switch d-flex align-items-center mb-3">
                            <input class="form-check-input" type="checkbox" id="rememberMe" checked/>
                            <label class="form-check-label mb-0 ms-3" for="rememberMe">Remember me</label>
                          </div>
                          <div class="text-center">
                            <button type="button" onClick={(e) => loginHandler(e)}
                                    class="btn bg-indigo-600 w-100 my-4 mb-2 hover:bg-indigo-500 text-white">Sign in</button>
                          </div>
                          <p class="mt-4 text-sm text-center">
                            Don't have an account?
                            <Link to="/register" class="text-indigo-600 font-weight-bold ml-2 ">Sign up</Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
}

export default Login