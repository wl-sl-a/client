import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { OwnerPage } from '../OwnerPage';
import { CreateOwner } from '../OwnerPage';
import {EditOwner} from "../OwnerPage";
import {DetailsOwnerPage} from "../OwnerPage";
import {EditAnimal} from "../AnimalPage";
import {CreateAnimal} from "../AnimalPage";
import {DetailsAnimalPage} from "../AnimalPage";
import {DoctorPage} from "../DoctorPage";
import {CreateDoctor} from "../DoctorPage";
import {EditDoctor} from "../DoctorPage";
import {DetailsDoctorPage} from "../DoctorPage";
import {ServicePage} from "../ServicePage";
import {CreateService} from "../ServicePage";
import {DetailsServicePage} from "../ServicePage";
import {EditService} from "../ServicePage";
import {VisitingPage} from "../VisitingPage";
import {CreateVisiting} from "../VisitingPage";
import {EditVisiting} from "../VisitingPage";
import {DetailsVisitingPage} from "../VisitingPage";
import {CreateDirection} from "../DirectionPage";
import {EditDirection} from "../DirectionPage";
import {CreateSchedule} from "../SchedulePage";
import {EditSchedule} from "../SchedulePage";
import {StepOnePage} from "../AppointmentPage";
import {StepTwoPage} from "../AppointmentPage";
import {StepThreePage} from "../AppointmentPage";

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/owners" component={OwnerPage} />
                                <Route path="/create_owner" component={CreateOwner} />
                                <Route path="/edit_owner/:id" component={EditOwner} />
                                <Route path="/owner/:id" component={DetailsOwnerPage} />
                                <Route path="/edit_animal/:id" component={EditAnimal} />
                                <Route path="/create_animal/:id" component={CreateAnimal} />
                                <Route path="/animal/:id" component={DetailsAnimalPage} />
                                <Route path="/doctors" component={DoctorPage} />
                                <Route path="/create_doctor" component={CreateDoctor} />
                                <Route path="/edit_doctor/:id" component={EditDoctor} />
                                <Route path="/doctor/:id" component={DetailsDoctorPage} />
                                <Route path="/services" component={ServicePage} />
                                <Route path="/create_service" component={CreateService} />
                                <Route path="/service/:id" component={DetailsServicePage} />
                                <Route path="/edit_service/:id" component={EditService} />
                                <Route path="/create_appointment/:id" component={EditService} />
                                <Route path="/visitings/:id" component={VisitingPage} />
                                <Route path="/create_visiting/doctor/:id" component={CreateVisiting} />
                                <Route path="/edit_visiting/:id" component={EditVisiting} />
                                <Route path="/visiting/:id" component={DetailsVisitingPage} />
                                <Route path="/create_direction/:id" component={CreateDirection} />
                                <Route path="/edit_direction/:id" component={EditDirection} />
                                <Route path="/create_schedule/:id" component={CreateSchedule} />
                                <Route path="/edit_schedule/:id" component={EditSchedule} />
                                <Route path="/step_one/:aid" component={StepOnePage} />
                                <Route path="/step_two/:aid/:did" component={StepTwoPage} />
                                <Route path="/step_three/:aid/:did/:sid" component={StepThreePage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 