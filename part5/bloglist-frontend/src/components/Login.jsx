import PropTypes from 'prop-types'

const Login = ({handleLogin, setUsername, username, setPassword, password}) => {

    Login.propTypes = {
        handleLogin: PropTypes.func.isRequired,
        setUsername: PropTypes.func.isRequired,
        setPassword: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }

    return (  
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>

        </div>
    );
}
 
export default Login