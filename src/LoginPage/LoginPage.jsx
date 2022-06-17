import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {

        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
                    <div className="col-md-offset-3 col-md-6">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <span className="heading">{localStorage.getItem('language') == 'uk'? 'АВТОРИЗАЦІЯ': 'AUTORIZATION'}</span>
                                <label htmlFor="username">{localStorage.getItem('language') == 'uk'? 'Ім`я користувача': 'Username'}</label>
                                <br></br>
                                <input type="text" className="form-control" name="username"
                                       pattern="[a-zA-Z0-9_-]{4,20}" autofocus required title={localStorage.getItem('language') == 'uk'? 'Введіть від 4 до 20 символів':
                                    'Enter from 4 to 20 symbols'}
                                       value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                <div className="help-block">{localStorage.getItem('language') == 'uk'? 'Ім`я користувача необхідне': 'Username is required'}</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">{localStorage.getItem('language') == 'uk'? 'Пароль': 'Password'}</label>
                                <br></br>
                                <input type="password" className="form-control" name="password"
                                       pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                       autofocus required title={localStorage.getItem('language') == 'uk'? 'Невірний формат паролю': 'Invalid password format'}
                                       value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                <div className="help-block">{localStorage.getItem('language') == 'uk'? 'Пароль необхідний': 'Password is required'}</div>
                                }
                            </div>
                            <div className="form-group">
                                <Link to="/register"><span className="text" className='option'>{localStorage.getItem('language') == 'uk'? 'Реєстрація': 'Register'}</span></Link>
                                <button className='option'><span className="glyphicon glyphicon-log-in"></span>{localStorage.getItem('language') == 'uk'? '  Увійти': '  Login'}</button>
                            </div>
                        </form>
                    </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 