
import { useRef } from "react"
import { ButtonGroup, Button } from "react-bootstrap";
import { Form, Link, useNavigate } from "react-router-dom"
import { API } from "../../service/base-service";
import { UserService } from "../../service/userservice";
import './user.scss'

const Register = () => {
    const formRef = useRef(null);
    const navigate = useNavigate()
    const registerHandler = (e) => {
        e.preventDefault();
        let data = formRef.current;
        let userInfo = {
            name: data["username"].value,
            password: data["password"].value,
            roles: [data["role"].value]
        }
        UserService.register(userInfo).then(res => {
            alert("User registered successfully");
            navigate("/authenticate")
        })
    }
    return <>

        <section>
            <div class="page-header min-vh-100">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-auto">
                            <div class="card card-plain">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-indigo-600 shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-xl text-white font-weight-bolder text-center mt-2 mb-0">Sign up</h4>
                                        <div className="text-white font-weight-bolder text-center mt-3 mb-2">
                                            <p>Enter your email and password to start</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form ref={formRef} role="form">
                                        <div className="input-group input-group-outline mb-3">
                                            {/* <label class="form-label">Name</label> */}
                                            <input type="text" placeholder="name" name="username" class="form-control"/>
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            {/* <label class="form-label">Password</label> */}
                                            <input type="password" name="password" placeholder="Password"
                                                   class="form-control"/>
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            <select className="form-control" name="role">
                                                <option value="Owner">Owner</option>
                                                <option value="Customer">Customer</option>
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            <button type="button" onClick={(e) => registerHandler(e)}
                                                    class="btn bg-indigo-600 w-100 my-4 mb-2 hover:bg-indigo-500 text-white">Sign
                                                Up
                                            </button>
                                        </div>
                                        <div className="text-center pt-0 px-lg-2 px-1">
                                            <p className="mt-4 text-sm mx-auto">
                                                Already have an account?
                                                <Link to="/authenticate" class="text-indigo-600 font-weight-bold ml-2">Sign
                                                    in</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Register