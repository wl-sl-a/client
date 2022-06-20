import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        document.getElementById('menu').hidden = true
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
                    <div className="col-md-offset-3 col-md-6">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <span className="heading">{localStorage.getItem('language') == 'uk'? 'Реєстрація': 'Register'}</span>
                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                <label htmlFor="username">{localStorage.getItem('language') == 'uk'? 'Ім`я користувача': 'Username'}</label>
                                <br></br>
                                <input type="text" className="form-control" name="username"
                                       pattern="[a-zA-Z0-9_-]{4,20}" autofocus required title={localStorage.getItem('language') == 'uk'? 'Введіть від 4 до 20 символів':
                                    'Enter from 4 to 20 symbols'}
                                       value={user.username} onChange={this.handleChange} />
                                {submitted && !user.username &&
                                <div className="help-block">{localStorage.getItem('language') == 'uk'? 'Ім`я користувача необхідне': 'Username is required'}</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <label htmlFor="email">{localStorage.getItem('language') == 'uk'? 'Електронна пошта': 'Email'}</label>
                                <br></br>
                                <input type="text" className="form-control" name="email"
                                       pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
                                       autofocus required title={localStorage.getItem('language') == 'uk'? 'Невірний формат ел.пошти': 'Invalid email format'}
                                       value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                <div className="help-block">{localStorage.getItem('language') == 'uk'? 'Ел.пошта необхідна': 'Email is required'}</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label htmlFor="password">{localStorage.getItem('language') == 'uk'? 'Пароль': 'Password'}</label>
                                <br></br>
                                <input type="password" className="form-control" name="password"
                                       pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                       autofocus required title={localStorage.getItem('language') == 'uk'? 'Невірний формат паролю': 'Invalid password format'}
                                       value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password &&
                                <div className="help-block">{localStorage.getItem('language') == 'uk'? 'Пароль необхідний': 'Password is required'}</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className='option'>{localStorage.getItem('language') == 'uk'? 'Зареєструватися': 'Register'}</button>
                                <Link to="/login" className='option'><span className="text">{localStorage.getItem('language') == 'uk'? 'Відміна': 'Cancel'}</span></Link>
                            </div>
                        </form>
                    </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };